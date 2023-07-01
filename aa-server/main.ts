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
      const { name, image, description, amount, ingredients, location } = req.body;

      const recipe = await RecipeModel.create({ name, image, description, amount, ingredients, location });

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
      const { name, image, description, amount, ingredients, location } = req.body;
      const { id } = req.params;

      const recipe = await RecipeModel.findByIdAndUpdate(
        id,
        { name, image, description, amount, ingredients, location },
        { new: true }
      );

      res.status(200).json(recipe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//listener for the port
app.listen(port, () => {
    console.log("[server]: server running at http://localhost:" + port);
})
