import { Model, Schema, HydratedDocument, model } from "mongoose";

export interface ICart{
    customer: string,
    items: string[],
    createdAt?: Date
}

interface CartVirtuals{
    count: number
}

type CartModel = Model<ICart, {}, {}>

const cartSchema: Schema = new Schema
<ICart,CartModel,{},{}>({
    customer: {
        type: String,
        required: true
    },
    items: {
        type:[String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

cartSchema.virtual('count').get(function():number{
    return this.items.length
})

export type HydratedCartDoc = HydratedDocument<ICart>

export const Cart = model<ICart, CartModel>('Cart', cartSchema)