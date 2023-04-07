export interface Recipe {
  _id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  ingredients: {
    inventoryId: {
      _id: string;
      name: string;
      location: string;
      quantity: number;
      image: string;
    },
    amountNeeded: number;
  }[];
}


