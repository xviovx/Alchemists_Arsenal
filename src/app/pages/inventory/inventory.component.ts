import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { Item } from "../../item";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('scaleUpAndFadeIn', [
      state('void', style({ transform: 'scale(0)', opacity: 0 })),
      transition('void => *', [
        animate('0.5s ease-in-out', keyframes([
          style({ transform: 'scale(0)', opacity: 0, offset: 0 }),
          style({ transform: 'scale(1.2)', offset: 0.3 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1.0 }),
        ]))
      ])
    ])
  ]
})

export class InventoryComponent implements OnInit{
  isLoaded = false;
  buttonState = 'hidden';
  ingredients: Item[] = [];
  filteredIngredients: Item[] = [];
  locationOptions = ['Whiterun', 'Solitude', 'Dawnstar'];
  showModal = false;
  showSuccessModal = false;
  selectedIngredient: { _id?: string, name: string, location: string, quantity: number, image: string, cardHovered: boolean } = { _id: '', name: '', location: '', quantity: 0, image: '', cardHovered: false};
  selectedQuantity = 0;
  selectedLocation = '';
  newAmountPlaceholder: number = 0;
  searchText: string = '';

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

  ngAfterViewInit() {
    this.isLoaded = true;
    this.buttonState = 'visible';
  }

  detectAmountChange(e: any) {
    this.newAmountPlaceholder = +e.target.value;
  }

  updateDetails() {
    if (!this.selectedIngredient._id) {
      // handle error: _id is undefined
      return;
    }

    const securityQuestionAnswer = (<HTMLInputElement>document.getElementById("security-question")).value;
    if (securityQuestionAnswer.toLowerCase() !== "alduin") {
      alert("Incorrect answer. Please try again");
      return;
    }

    this.inventoryService.updateItem(this.selectedIngredient._id, this.selectedQuantity, this.selectedLocation)
      .subscribe(updatedIngredient => {
        const index = this.ingredients.findIndex(ingredient => ingredient._id === updatedIngredient._id);
        this.ingredients[index].quantity = updatedIngredient.quantity;
        this.ingredients[index].location = updatedIngredient.location;
        this.showModal = false;
        this.showSuccessModal = true;
      });
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  editItem(ingredient: Item) {
    if (ingredient._id) { // check if _id is defined
      this.showModal = true;
      this.selectedIngredient = ingredient;
      this.selectedQuantity = ingredient.quantity;
      this.selectedLocation = ingredient.location;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  updateQuantity(quantity: number) {
    this.selectedQuantity = quantity;
  }

  filterIngredients() {
    return this.ingredients.filter((ingredient) => {
      return ingredient.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
}
