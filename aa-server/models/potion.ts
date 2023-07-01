import {prop, getModelForClass } from '@typegoose/typegoose';

export class Potion {
    @prop({required: true})
    public name?: string;

    @prop({required: true})
    public location?: string;

    @prop({required: true})
    public quantity?: number;

    @prop({required: true})
    public image?: string;

    @prop({required: true})
    public description?: string;
}

export const PotionModel = getModelForClass(Potion);
