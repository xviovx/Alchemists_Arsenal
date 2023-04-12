import {prop, getModelForClass } from '@typegoose/typegoose';

export class Inventory {
    @prop({required: true})
    public name?: string;

    @prop({required: true})
    public location?: string;

    @prop({required: true})
    public quantity?: number;

    @prop({required: true})
    public image?: string;
}

export const InventoryModel = getModelForClass(Inventory);