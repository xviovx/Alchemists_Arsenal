import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { Item } from "../../item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
  //static features

  locationOptions = [
    'Whiterun', 'Solitude', 'Dawnstar'
  ]

  ingredients: Item[] = [];

  // ingredients = [
  //   { name: 'Skeever_Hide', location: 'Whiterun', quantity: 22, image: '../../../assets/ingredients/SkeeverHide.webp', cardHovered: false},
  //   { name: 'Mudcrab_Chitin', location: 'Whiterun', quantity: 12, image: '../../../assets/ingredients/MudcrabChitin.webp', cardHovered: false},
  //   { name: 'Vampire_Dust', location: 'Dawnstar', quantity: 2, image: '../../../assets/ingredients/VampireDust.webp', cardHovered: false},
  //   { name: 'Grass_Pod', location: 'Solitude', quantity: 7, image: '../../../assets/ingredients/GrassPod.webp', cardHovered: false},
  //   { name: 'River_Betty', location: 'Whiterun', quantity: 3, image: '../../../assets/ingredients/RiverBetty.webp', cardHovered: false},
  //   { name: 'Spriggan_Sap', location: 'Dawnstar', quantity: 11, image: '../../../assets/ingredients/SprigganSap.webp', cardHovered: false},
  //   { name: 'Garlic', location: 'Whiterun', quantity: 51, image: '../../../assets/ingredients/Garlic.webp', cardHovered: false}
  // ]

  showModal = false;
  selectedIngredient: { name: string, location: string, quantity: number, image: string, cardHovered: boolean, securityQuestion: string } = { name: '', location: '', quantity: 0, image: '', cardHovered: false, securityQuestion: '' };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getAllItems()
    .subscribe(
      (items: Item[]) => {
        this.ingredients = items;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  editItem(ingredient: { name: string, location: string, quantity: number, image: string, cardHovered: boolean, securityQuestion: string }) {
    this.showModal = true;
    this.selectedIngredient = ingredient;
  }

  closeModal() {
    this.showModal = false;
  }

  updateDetails() {
    // handle the update action here
    this.showModal = false;
  }

  updateQuantity(quantity: number) {
    this.selectedIngredient.quantity = quantity;
  }

  //fetch from actual database


}
