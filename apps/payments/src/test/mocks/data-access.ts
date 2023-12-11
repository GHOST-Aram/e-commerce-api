import { Paginator } from "../../z-library/HTTP/http-response"
import { HydratedPaymentDoc, Payment, PaymentModel } from "../../data-access/model"
import { jest } from "@jest/globals"
import { paymentInput } from "./raw-data"

export class DataAccess{
    public Model: PaymentModel

    constructor(model: PaymentModel){
        this.Model = model
    }
    public createNew = jest.fn(
        async(): Promise<HydratedPaymentDoc> =>{
            return new this.Model(paymentInput)
    })

    public findByReferenceId = jest.fn(
        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new this.Model(paymentInput)
            } else {
                return null
            }
    })

    public findWithPagination = jest.fn(
        async(paginator: Paginator
            ): Promise<HydratedPaymentDoc[]> =>{
                return this.createDocsArray(paginator.limit)
        }    
    )

    private createDocsArray = async(length: number
        ): Promise<HydratedPaymentDoc[]> =>{
            const payments: HydratedPaymentDoc[] = []

            let count = 0
            while(count < length){
                payments.push(new this.Model(paymentInput))
                count ++
            }
            
            return payments
    }

    public findByIdAndUpdate = jest.fn(
        async(orderId: string, updateDoc: Payment
            ): Promise<HydratedPaymentDoc | null> =>{
                if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                    return new this.Model(paymentInput)
                } else {
                    return null
                }
    })

    public findByIdAndDelete = jest.fn(
        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new this.Model(paymentInput)
            } else {
                return null
            }
    })
}
