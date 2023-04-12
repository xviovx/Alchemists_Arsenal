import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';
import { Item } from '../../item';
import { InventoryService } from 'src/app/services/inventory.service';
import { PotionService } from 'src/app/services/potion.service';
import { Potion } from '../../potion';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css'],
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

export class CraftingComponent implements OnInit {
  recipes: Recipe[] = [];
  // selectedLocation: string;
  items: Item[] = [];

  constructor(private recipeService: RecipeService, private inventoryService: InventoryService, private potionService: PotionService) {}

  ngOnInit() {
    this.recipeService.getAllRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
        (error) => {
          console.log(error)
        }
      );

    this.inventoryService.getAllItems()
      .subscribe(
        (items: Item[]) => {
          this.items = items;
        },
        (error) => {
          console.log(error)
        }
      );
  }

  craft(recipe: Recipe) {
    const ingredients = recipe.ingredients;
    if (ingredients.every(ingredient => {
      const item = ingredient.inventoryId;
      return item && item.quantity >= ingredient.amountNeeded;
    })) {
      ingredients.forEach(ingredient => {
        const item = ingredient.inventoryId;
        const newQuantity = item.quantity - ingredient.amountNeeded;
        item.quantity = newQuantity; // Update quantity in the frontend
        this.inventoryService.updateInventory(item._id, newQuantity).subscribe(
          (updatedItem: Item) => {
            console.log('Inventory item updated:', updatedItem);
          },
          (error) => {
            console.log('Error updating inventory item:', error);
          }
        );
      });
      recipe.amount++;
      this.recipeService.updateRecipe(recipe).subscribe(
        (updatedRecipe: Recipe) => {
          console.log('Recipe updated:', updatedRecipe);
          const newPotion: Potion = {
            name: recipe.name,
            description: recipe.description,
            quantity: 1,
            image: recipe.image,
            location: "inventory",
            cardHovered: false
          };
          this.potionService.addPotion(newPotion).subscribe(
            (createdOrUpdatedPotion: Potion) => {
              console.log('Potion created/updated:', createdOrUpdatedPotion);
              alert('Crafted potion successfully!');
            },
            (error) => {
              console.log('Error creating/updating potion:', error);
              alert('Failed to craft potion.');
            }
          );
        },
        (error) => {
          console.log('Error updating recipe:', error);
          alert('Failed to update recipe.');
        }
      );
    } else {
      alert('Insufficient ingredients to craft potion!');
    }
  }






  // onLocationSelect(event: Event): void {
  //   const value = (event.target as HTMLSelectElement).value;
  //   const dropdown = document.getElementById('locationDropdown');
  //   if (dropdown?.classList) {
  //     if (value !== '') {
  //       dropdown.classList.add('selected');
  //     } else {
  //       dropdown.classList.remove('selected');
  //     }
  //   }
  //   this.selectedLocation = value;
  // }
}
