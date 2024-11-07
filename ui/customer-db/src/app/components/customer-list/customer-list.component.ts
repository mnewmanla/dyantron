import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';
import { ColDef, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, ValueFormatterParams } from 'ag-grid-community'; // Column Definition Type Interface
import { SelectableCustomer } from '../../models/ui/customer';
import moment from 'moment';
import { ActionCellComponent } from './action-cell-component';
import { Router } from '@angular/router';


function dateTimeFormatter(params: ValueFormatterParams) {
  return params.value == null ? '' : moment(params.value).format('MM/DD/YYYY HH:mm')
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  selectableCustomers$!: Observable<SelectableCustomer[]>;
  private readonly router = inject(Router);

  colDefs: ColDef[] = [
    {
      cellRenderer: ActionCellComponent,
      cellRendererParams: {
        action: this.onEditClick.bind(this),
        label: 'Edit'
      },
      width: 80
    },
    { 
      headerName: 'Last Viewed',
      field: 'lastViewed',
      width: 150
    },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email', sort: 'asc' },
    { 
      field: 'createdDateTimeUTC',
      valueFormatter: dateTimeFormatter
    },
    { 
      field: 'lastUpdatedDateTimeUTC',
      valueFormatter: dateTimeFormatter
    },
    {
      cellRenderer: ActionCellComponent,
      cellRendererParams: {
        action: this.onDeleteClick.bind(this),
        label: 'Delete'
      },
      width: 80
    }
  ];
  
  defaultColDef = {
    sortable: true,
    resizable: true,
  };

  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [5, 10, 20];

  autoSizeStrategy:
  | SizeColumnsToFitGridStrategy
  | SizeColumnsToFitProvidedWidthStrategy
  | SizeColumnsToContentStrategy = {
      type: 'fitGridWidth',
      defaultMinWidth: 100
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.selectableCustomers$ = this.customerService.getSelectableCustomersAsObservable();
    this.customerService.loadCustomers();
  }

  onDeleteClick($event: any) {
    if(confirm('Are you sure to delete ' + $event.data.firstName + ' ' + $event.data.lastName)) {
      this.customerService.deleteCustomer($event.data.id);
    }
  }

  onEditClick($event: any) {
    this.router.navigate([`/customer/${$event.data.id}`]);
  }

  onAddClick() {
    this.router.navigate(['/customer/00000000-0000-0000-0000-000000000000']);
  }
}
