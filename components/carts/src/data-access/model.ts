import { ObjectId, Model, Schema, HydratedDocument, model } from "mongoose";

interface ICart{
    customer: ObjectId,
    items: ObjectId[],
    createdAt: Date
}

interface CartVirtuals{
    count: number
}

type CartModel = Model<ICart, {}, {}, CartVirtuals>

const cartSchema: Schema = new Schema
<ICart,CartModel,{},{}, CartVirtuals>({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type:[Schema.Types.ObjectId],
        ref: 'Product',
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