import { Model, Schema, HydratedDocument, model } from "mongoose";

export interface ICart{
    customer: string,
    items: string[],
    createdAt?: Date
}

interface CartVirtuals{
    count: number
}

type CartModel = Model<ICart, {}, {}, CartVirtuals>

const cartSchema: Schema = new Schema
<ICart,CartModel,{},{}, CartVirtuals>({
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

cartSchema.virtual('count').get(function(){
    return this.items.length
})

export type HydratedCartDoc = HydratedDocument<ICart, CartVirtuals>

export const Cart = model<ICart, CartModel>('Cart', cartSchema)