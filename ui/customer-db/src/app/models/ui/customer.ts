import { Customer } from "../domain/customer";

export interface SelectableCustomer extends Customer {
    lastViewed: boolean;
}