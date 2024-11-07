import { Injectable } from '@angular/core';
import { CustomerDataService } from './customer-data.service';
import { BehaviorSubject, catchError, map, Observable, of, take, tap, throwError, withLatestFrom } from 'rxjs';
import { Customer } from '../models/domain/customer';
import { SelectableCustomer } from '../models/ui/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers$: BehaviorSubject<Customer[]>;

  constructor(
    private dataService: CustomerDataService) { 
      this.customers$ = new BehaviorSubject<Customer[]>([]);
    }

  getSelectableCustomersAsObservable(): Observable<SelectableCustomer[]> {
    const lastViewedCustomerId = sessionStorage.getItem("lastViewedCustomerId");
    return this.customers$.asObservable().pipe(
      map(customers => {
        return customers.map(customer => ({
          ...customer,
          lastViewed: customer.id === lastViewedCustomerId
        }))
      })
    )
  }

  loadCustomers() {
    this.dataService.getCustomers().pipe(
      take(1),
      tap(customers => this.customers$.next(customers))
    ).subscribe();
  }

  getCustomer(id: string): Observable<Customer> {
    // update session storage
    sessionStorage.setItem("lastViewedCustomerId", id);

    // call data service
    return this.dataService.getCustomer(id);
  }

  deleteCustomer(id: string) {
    // call data service
    this.dataService.deleteCustomer(id).pipe(
      take(1),
      catchError((err) => {
        if (err.status === 404) {
          // In case another user already deleted the user and you are seeing a stale UI
          err.message = "Customer No longer found"
        }
        alert(err.message);

        // pass through so customer is removed form subject
        return of({}); 
      }),
      withLatestFrom(this.customers$.asObservable()),
      tap(([, customers]) => {
        // update the behavior subject
        const index = customers.findIndex(d => d.id === id);
        customers.splice(index, 1);
        this.customers$.next(customers);
      })
    ).subscribe();
  
    // update session storage if needed
    if (sessionStorage.getItem("lastViewedCustomerId") === id) {
      sessionStorage.setItem("lastViewedCustomerId", "");
    }
  }

  saveCustomer(isNew: boolean, id: string, payload: Customer) {
    // call data service
    return this.dataService.saveCustomer(isNew, id,payload);
  }
}
