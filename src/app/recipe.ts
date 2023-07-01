import { Item } from "./item";

export interface Recipe {
  _id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  ingredients: {
    inventoryId: Item;
    displayQuantity?: number;
    amountNeeded: number;
  }[];
}
