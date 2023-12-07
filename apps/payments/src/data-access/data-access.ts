import { Paginator } from "../z-library/HTTP/http-response"
import { Accessible } from "../z-library/bases/accessible"
import { HydratedPaymentDoc, Payment } from "./model"

export class DataAccess implements Accessible{

    public createNew = async(data: Payment): Promise<HydratedPaymentDoc> =>{
        const payment = new Payment(data)
        return await payment.save()
    }

    public findByReferenceId = async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
        return Payment.findOne({ orderId })
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedPaymentDoc[]> =>{
            return await Payment.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }

    public findByIdAndUpdate = async(orderId: string, updateDoc: Payment
        ): Promise<HydratedPaymentDoc | null > =>{
            return await Payment.findOneAndUpdate({ orderId }, updateDoc)
    }

    public findByIdAndDelete = async(orderId: string
        ): Promise<HydratedPaymentDoc | null> =>{
            return await Payment.findOneAndDelete({ orderId })
    }
}

export const dataAccess  = new DataAccess()