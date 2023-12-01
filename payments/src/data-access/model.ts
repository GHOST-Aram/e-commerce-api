import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface IPayment {
    orderId: string
    processor: string
    amount: number
    receipt_number: string
    transaction_date: number
    account_number: number
    currency: string
    createdAt?:Date
}

type PaymentModel = Model<IPayment>

const paymentSchema = new Schema<IPayment, PaymentModel>({
    orderId:{
        type: String,
        required: true
    },
    processor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    receipt_number: {
        type: String,
        required: true
    },
    transaction_date: {
        type: Number,
        required: true
    },
    account_number: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'Ksh'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export type HydratedPaymentDoc = HydratedDocument<IPayment>

export const Payment = model<IPayment, PaymentModel>('Payment', 
    paymentSchema)