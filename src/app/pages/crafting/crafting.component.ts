import { Component } from '@angular/core';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css']
})
export class CraftingComponent {
  options = [
    { value: 'ingredients', viewValue: 'Ingredients' },
    { value: 'potions', viewValue: 'Potions' }
  ];
}

