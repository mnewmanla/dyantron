import { Component } from "@angular/core";

@Component({
    selector: 'action-cell',
    template: '<button type="button" (click)="onClick()">{{params.label}}</button>'
  })
  export class ActionCellComponent {
    params: any;
    label!: string;
  
    agInit(params: any): void {
        this.params = params;
        this.label = this.params.label || null;
    }
  
    onClick(): void {
        this.params.action(this.params);
    }
  }