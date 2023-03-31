import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../services/inventory.service';
import { Item } from "../../item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit{

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
        this.ingredients = items;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  newAmountPlaceholder: number = 0

  detectAmountChange(e: any) {
    this.newAmountPlaceholder = +e.target.value;
  }

  updateDetails() {
    if (!this.selectedIngredient._id) {
      // handle error: _id is undefined
      return;
    }

    const securityQuestionAnswer = (<HTMLInputElement>document.getElementById("security-question")).value;
    if (securityQuestionAnswer.toLowerCase() !== "cornwall") {
      alert("Incorrect answer. Please try again");
      return;
    }

    // Call InventoryService to update ingredient quantity
    this.inventoryService.updateItem(this.selectedIngredient._id, this.selectedQuantity)
      .subscribe(updatedIngredient => {
        // Update ingredient quantity in frontend
        const index = this.ingredients.findIndex(ingredient => ingredient._id === updatedIngredient._id);
        this.ingredients[index].quantity = updatedIngredient.quantity;

        // Close modal
        this.showModal = false;
      });
  }




  editItem(ingredient: Item) {
    if (ingredient._id) { // check if _id is defined
      this.showModal = true;
      this.selectedIngredient = ingredient;
      this.selectedQuantity = ingredient.quantity;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  updateQuantity(quantity: number) {
    this.selectedQuantity = quantity;
  }

}
