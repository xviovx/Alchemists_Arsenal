import { prop, Ref } from '@typegoose/typegoose'
import { Inventory } from './inventory'

//map what our ingredient object needs 
export class Ingredient {
    @prop({ ref: Inventory, required: true})
    public inventoryId?: Ref<Inventory> //links as a reference to our inventory data by id

    @prop({required: true})
    public amountNeeded?: number
}