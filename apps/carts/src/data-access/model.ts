import { Model, Schema, HydratedDocument, model } from "mongoose";

export interface Cart{
    customer: string,
    items: string[],
    createdAt?: Date
}

interface CartVirtuals{
    count: number
}

type CartModel = Model<Cart, {}, {}>

const cartSchema: Schema = new Schema
<Cart,CartModel,{},{}>({
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

export type HydratedCartDoc = HydratedDocument<Cart>

export const Cart = model<Cart, CartModel>('Cart', cartSchema)