import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  options = [
    { value: 'ingredients', viewValue: 'Ingredients' },
    { value: 'potions', viewValue: 'Potions' }
  ];
}
