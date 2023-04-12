import express, { Express } from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import cors from 'cors';

//import models
import { InventoryModel } from './models/inventory';
import { PotionModel } from './models/potion';
import { RecipeModel } from './models/recipe';

import { Recipe } from './models/recipe';
dotenv.config();

const app: Express = express();

//middleware 
app.use(cors()); // avoid cors error
app.use(express.json()); // get our params from body 

//declare my variables 
const port = process.env.PORT || 3000;
const clusterUrl = process.env.CLUSTER;

mongoose.set('strictQuery', false);

mongoose.connect(clusterUrl!).then(() => {
    console.log("mongodb connected successfully!")
}).catch((error) => {
    console.log(error.message)
})

//endpoints for INVENTORY
app.get("/", (req, res) => {
    res.send("Working server");
})

app.get("/inventory", async (req, res) => {
    const inventory = await InventoryModel.find({});
    res.send(inventory);
})

app.post("/inventory", async (req, res) => {
    const {name, location, quantity, image} = req.body;
    const inventory = await InventoryModel.create({name, location, quantity, image});
    res.send(inventory);
})

app.put("/inventory/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity, location } = req.body;
  
    const inventory = await InventoryModel.findByIdAndUpdate(id, {quantity, location}, {new: true});
  
    res.send(inventory);
  })  

//not sure if I'll need the delete functionality but lets add it anyway incase
app.delete("/inventory/:id", async (req, res) => {
    const { id } = req.params;

    const inventory = await InventoryModel.findByIdAndDelete(id);

    res.send(inventory);
})

//endpoints for POTIONS
app.get("/potion", async (req, res) => {
    const potion = await PotionModel.find({});
    res.send(potion);
})

app.post("/potion", async (req, res) => {
    const {name, location, quantity, image, description} = req.body;
    const potion = await PotionModel.create({name, location, quantity, image, description});
    res.send(potion);
})

app.delete("/potion/:id", async (req, res) => {
    const { id } = req.params;

    const potion = await PotionModel.findByIdAndDelete(id);

    res.send(potion);
})

app.put("/potion/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const potion = await PotionModel.findByIdAndUpdate(id, {quantity}, {new: true});

  res.send(potion);
})  

//delete a recipe 
app.delete("/recipes/:id", async (req, res) => {
    const { id } = req.params;

    const recipe = await RecipeModel.findByIdAndDelete(id);

    res.send(recipe);
})


//USE THESE ONES
app.post('/recipes', async (req, res) => {
    try {
      const { name, image, description, amount, ingredients } = req.body;
  
      const recipe = await RecipeModel.create({ name, image, description, amount, ingredients });
  
      res.status(201).json(recipe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

app.get('/recipes', async (req, res) => {
    try {
      const recipes = await RecipeModel.find().populate('ingredients.inventoryId').exec();
      res.status(200).json(recipes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/recipes/:id', async (req, res) => {
    try {
      const { name, image, description, amount, ingredients } = req.body;
      const { id } = req.params;
  
      const recipe = await RecipeModel.findByIdAndUpdate(
        id,
        { name, image, description, amount, ingredients },
        { new: true }
      );
  
      res.status(200).json(recipe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Recipe data handling from Armand
// **USED TO POPULATE DATABASE */
// app.post('/recipe/create', async (req, res) => {
//     const recipeData = [
//         {
//             name: "Invisibility",
//             image: "https://i.ibb.co/8xJRDsJ/Potionof-Extended-Invisibility.webp",
//             description: "go invisible",
//             amount: 0,
//             ingredients: [
//                 {inventoryId: "641f543edb4e75408f45e0f9", amountNeeded: 1},
//                 {inventoryId: "641f55c7db4e75408f45e0ff", amountNeeded: 1}
//             ]
//         },
//         {
//             name: "Magicka Increase",
//             image: "https://i.ibb.co/0JtQnSx/Magicka.webp",
//             description: "get magicka",
//             amount: 0,
//             ingredients: [
//                 {inventoryId: "641f57b9db4e75408f45e10a", amountNeeded: 2},
//                 {inventoryId: "641f5775db4e75408f45e107", amountNeeded: 1}
//             ]
//         }
//     ]

//     for(const recipe of recipeData){
//         await RecipeModel.create(recipe)
//     }

//     res.send({success: true})
// })

// get my recipes from Armand
// app.get('/recipes', async (req, res) => {
//     const recipes = await RecipeModel.find().populate('ingredients.inventoryId').exec();

//     //check if there are enough items to craft the recipe
//     const recipesWithAvailability = recipes.map(async (recipe) => {
//         const ingredients = recipe.ingredients;
//         let craftable = true;

//         for (const ingredient of ingredients!) {
//             const inventory = await InventoryModel.findById(ingredient.inventoryId).exec()
//             const amount = inventory!.amount
//         }
//     })

//     res.send(recipes)
// })

//endpoint to craft the recipe


//listener for the port
app.listen(port, () => {
    console.log("[server]: server running at http://localhost:" + port);
})