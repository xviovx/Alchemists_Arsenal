import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../../services/inventory.service';
import { Item } from "../../../item";

@Component({
  selector: 'app-dawnstar-items',
  templateUrl: './dawnstar-items.component.html',
  styleUrls: ['./dawnstar-items.component.css']
})

export class DawnstarItemsComponent {

  ingredients: Item[] = [];

  locationOptions = ['Whiterun', 'Solitude', 'Dawnstar'];

  showModal = false;
  selectedIngredient: { _id?: string, name: string, location: string, quantity: number, image: string, cardHovered: boolean } = { _id: '', name: '', location: '', quantity: 0, image: '', cardHovered: false};
  selectedQuantity = 0;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getAllItems()
      .subscribe(
        (items: Item[]) => {
          this.ingredients = items.filter(item => item.location === 'Dawnstar');
        },
        (error) => {
          console.log(error)
        }
      );
  }

  getDawnstarItemCount(): number {
    return this.ingredients.length;
  }

  onCardClick() {
    alert('**Change ingredient info in the inventory!**');
  }
}

