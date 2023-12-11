import { Paginator } from "../z-library/HTTP/http-response"
import { Accessible } from "../z-library/bases/accessible"
import { HydratedPaymentDoc, Payment, PaymentModel } from "./model"

export class DataAccess implements Accessible{

    public Model: PaymentModel

    constructor(model: PaymentModel){
        this.Model = model
    }

    public createNew = async(data: Payment): Promise<HydratedPaymentDoc> =>{
        const payment = new this.Model(data)
        return await payment.save()
    }

    public findByReferenceId = async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
        return await this.Model.findOne({ orderId })
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedPaymentDoc[]> =>{
            return await this.Model.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }

    public findByIdAndUpdate = async(orderId: string, updateDoc: Payment
        ): Promise<HydratedPaymentDoc | null > =>{
            return await this.Model.findOneAndUpdate({ orderId }, updateDoc)
    }

    public findByIdAndDelete = async(orderId: string
        ): Promise<HydratedPaymentDoc | null> =>{
            return await this.Model.findOneAndDelete({ orderId })
    }
}