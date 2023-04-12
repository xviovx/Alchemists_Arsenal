import { prop, getModelForClass } from '@typegoose/typegoose';
import { Ingredient } from './ingredients';

export class Recipe {
    @prop({required: true})
    public name?: string

    @prop({required: true})
    public image?: string

    @prop({required: true})
    public description?: string

    @prop({required: true})
    public amount?: number

    //array of all the ingredients needed from my inventory
    @prop({type: () => [Ingredient], required: true})
    public ingredients?: Ingredient[]
}

export const RecipeModel = getModelForClass(Recipe);