import { HydratedPaymentDoc, IPayment, Payment } from "./model"

export class DataAccess{

    public createNew = async(data: IPayment): Promise<HydratedPaymentDoc> =>{
        const payment = new Payment(data)
        return await payment.save()
    }

    public findByOrderId = async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
        return Payment.findOne({ orderId })
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedPaymentDoc[]> =>{
            return await Payment.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }

    public findByOrderIdAndUpdate = async(orderId: string, updateDoc: IPayment
        ): Promise<HydratedPaymentDoc | null > =>{
            return await Payment.findOneAndUpdate({ orderId }, updateDoc)
    }

    public findByOrderIdAndDelete = async(orderId: string
        ): Promise<HydratedPaymentDoc | null> =>{
            return await Payment.findOneAndDelete({ orderId })
    }
}

export const dataAccess  = new DataAccess()
export interface Paginator{
    skipDocs: number
    limit: number
}