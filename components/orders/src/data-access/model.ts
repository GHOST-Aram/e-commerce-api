import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface Item{
    productId: string,
    name: string,
    price: number,
    quantity: number
}

export interface IOrder{
    placedBy: string,
    items:Item[],
    createdAt: Date
}

interface OrderVirtuals{
    total: number
}

type OrderModel = Model<IOrder,{},{}, OrderVirtuals>

const orderSchema: Schema = new Schema<IOrder,OrderModel, 
{}, {}, OrderVirtuals>({
    items:{
        type: [{
            productId: String,
            name: String,
            price: Number,
            quantity: Number
        }],
        required: true
    },
    placedBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

orderSchema.virtual('total').get(function(): number{
    return this.items.reduce(
        function(total: number, item: Item){
            return total + (item.price * item.quantity)
        }
    )
})

export type HydratedOrderDoc = HydratedDocument<IOrder, 
    OrderVirtuals>

export const Order = model<IOrder, OrderModel> (
    'Order', orderSchema)