import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-input',
  template: `
    <div class="input-group">
      <div class="input-group-prepend">
        <button id="decrease" class="value-button" (click)="decrement()">-</button>
      </div>
      <div id="input-wrap">
        <input type="number" id="number" [ngModel]="quantity" (ngModelChange)="onQuantityChange($event)">
      </div>
      <div class="input-group-append">
        <button id="increase" class="value-button" (click)="increment()">+</button>
      </div>
    </div>
  `,
  styleUrls: ['./quantity-input.component.css']
})
export class QuantityInputComponent {
  @Input() quantity: number = 1;
  @Output() quantityChange = new EventEmitter<number>();

  increment() {
    this.quantity++;
    this.emitQuantityChange();
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.emitQuantityChange();
    }
  }

  onQuantityChange(event: any) {
    if (event.target.value >= 1) {
      this.quantity = event.target.value;
      this.emitQuantityChange();
    }
  }

  emitQuantityChange() {
    this.quantityChange.emit(this.quantity);
  }
}
