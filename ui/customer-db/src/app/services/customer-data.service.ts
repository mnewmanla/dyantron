import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/domain/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private urlPrefix = 'https://localhost:5001/api/Customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    // call http client
    return this.http.get<Customer[]>(this.urlPrefix);
  }

  getCustomer(id: string): Observable<Customer> {
    // call http client
    return this.http.get<Customer>(`${this.urlPrefix}/${id}`);
  }

  deleteCustomer(id: string) {
    // call http client
    return this.http.delete(`${this.urlPrefix}/${id}`);
  }

  saveCustomer(isNew: boolean, id: string, payload: Partial<Customer>): Observable<Customer> {
    // MWN: I am using a partial model for customer to match the DTO object aka no id or datetime fields

    // call http client
    if (isNew) {
      return this.http.post<Customer>(this.urlPrefix, payload);
    } else {
      return this.http.put<Customer>(`${this.urlPrefix}/${id}`, payload);
    }
  }
}
