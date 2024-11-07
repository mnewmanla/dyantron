import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/domain/customer';
import { catchError, take, tap, throwError } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  newCustomId: string = '00000000-0000-0000-0000-000000000000';
  customer: Customer | null;
  customerId!: string;
  private readonly router = inject(Router);
  form!: FormGroup;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.customer = this.route.snapshot.params['id'] === this.newCustomId ? <Customer>{} : null;
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [this.customer?.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.customer?.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.customer?.email, [Validators.required, Validators.email]]
    });
  }
  

  ngOnInit() {
    this.customerId = this.route.snapshot.params['id'];
    // if not empty-guid which represents a customer being created, then query for the customer
    if (this.customerId !== this.newCustomId) {
      this.customerService.getCustomer(this.customerId).pipe(
        take(1),
        tap((customer) => {
          this.customer = customer;
          this.initForm();
        })
      ).subscribe()
    } else {
      this.initForm();
    }
  }

  onReturn() {
    this.router.navigate(['/customers'])
  }

  onSave() {
    this.customerService.saveCustomer(this.customerId === this.newCustomId, this.customerId, this.form.value).pipe(
      take(1),
      catchError((err) => {
        // MWN: this would be a place to trap a unique value error on save
        alert(err.message);
        return throwError(() => err);
      }),
      tap(() => {
        this.router.navigate(['/customers']);
      })
    ).subscribe();
  }
}
