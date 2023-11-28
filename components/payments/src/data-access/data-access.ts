import { HydratedPaymentDoc, IPayment, Payment } from "./model"

export class DataAccess{

    public createNewPayment = async(data: IPayment
        ): Promise<HydratedPaymentDoc> =>{
            const payment = new Payment(data)
            return await payment.save()
    }

    public findByOrderId = async(orderId: string
        ): Promise<HydratedPaymentDoc | null> =>{
            return Payment.findOne({ orderId })
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedPaymentDoc[]> =>{
            return await Payment.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }
}

export const dataAccess  = new DataAccess()
export interface Paginator{
    skipDocs: number
    limit: number
}