import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../recipe';
import { RecipeService } from '../../../services/recipe.service';
import { Item } from '../../../item';
import { InventoryService } from 'src/app/services/inventory.service';
import { PotionService } from 'src/app/services/potion.service';
import { Potion } from '../../../potion';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { map } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-crafting',
  templateUrl: './solitude-crafting.component.html',
  styleUrls: ['./solitude-crafting.component.css'],
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

export class SolitudeCraftingComponent implements OnInit {
  recipes: Recipe[] = [];
  items: Item[] = [];
  showInsufficientIngredientsModal = false;
  showSuccessModal = false;

  constructor(private recipeService: RecipeService, private inventoryService: InventoryService, private potionService: PotionService) {}

  ngOnInit() {
    forkJoin({
      recipes: this.recipeService.getAllRecipes(),
      items: this.inventoryService.getAllItems().pipe(
        map(items => items.filter(item => item.location === 'Solitude'))
      ),
      potions: this.potionService.getAllPotions().pipe(
        map(potions => potions.filter(potion => potion.location === 'Solitude'))
      )
    }).subscribe(({recipes, items, potions}) => {
      this.items = items;
  
      this.recipes = recipes;
      this.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          const matchedItem = this.items.find(i => i._id === ingredient.inventoryId._id);
          if(matchedItem) {
            ingredient.inventoryId = matchedItem;
            ingredient.displayQuantity = matchedItem.quantity;
          } else {
            ingredient.displayQuantity = 0;
          }
        });

        recipe.amountInSolitude = potions
          .filter(potion => potion.name === recipe.name)
          .reduce((total, potion) => total + potion.quantity, 0);
      });
    },
    (error) => {
      console.log(error)
    });
  }  
  

  craft(recipe: Recipe) {
    const ingredients = recipe.ingredients;
    if (ingredients.every(ingredient => {
      const item = this.items.find(i => i._id === ingredient.inventoryId._id && i.location === 'Solitude');
      return item && item.quantity >= ingredient.amountNeeded;
    })) {
      ingredients.forEach(ingredient => {
        const item = this.items.find(i => i._id === ingredient.inventoryId._id && i.location === 'Solitude');
        if (item && item._id) {  // Check if item and item._id is defined
          const newQuantity = item.quantity - ingredient.amountNeeded;
          item.quantity = newQuantity;
          this.inventoryService.updateInventory(item._id, newQuantity).subscribe(
            (updatedItem: Item) => {
              console.log('Inventory item updated:', updatedItem);
            },
            (error) => {
              console.log('Error updating inventory item:', error);
            }
          );
        }
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
            location: "Solitude",
            cardHovered: false
          };
          this.potionService.addPotion(newPotion).subscribe(
            (createdOrUpdatedPotion: Potion) => {
              console.log('Potion created/updated:', createdOrUpdatedPotion);
              this.showSuccessModal = true;
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
      this.showInsufficientIngredientsModal = true;
    }
}


  closeInsufficientIngredientsModal() {
    this.showInsufficientIngredientsModal = false;
  }

  closeSuccessModal(){
    this.showSuccessModal = false;
  }
}
