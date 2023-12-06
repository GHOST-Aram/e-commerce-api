import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface Item {
    productId: string,
    name: string,
    price: number,
    quantity: number
}

export interface Order {
    items:Item[],
    delivered: boolean
    cancelled: boolean
    pickupStation: string
    ETA: Date
    placedBy: string,
    createdAt?: Date,
}

interface OrderVirtuals {
    total: number
}

type OrderModel = Model<Order,{},{}, OrderVirtuals>

const orderSchema: Schema = new Schema<Order,OrderModel, 
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
    
    pickupStation: {
        type: String,
        required: true,
        default: undefined
    },
    delivered: {
        type: Boolean,
        default: false
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    ETA: {
        type: Date,
        default: undefined
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

orderSchema.virtual('total').get(function(): number{
    return this.items.reduce(
        function(total: number, item: Item){
            return total + (item.price * item.quantity)
        }
    )
})

export type HydratedOrderDoc = HydratedDocument<Order, 
    OrderVirtuals>

export const Order = model<Order, OrderModel> (
    'Order', orderSchema)