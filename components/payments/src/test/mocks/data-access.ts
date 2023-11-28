import { jest } from "@jest/globals"
import { HydratedPaymentDoc, IPayment, Payment } from "../../data-access/model"
import { paymentInput } from "./raw-data"
import { Paginator } from "../../data-access/data-access"

export class DataAccess{
    public createNewPayment = jest.fn(
        async(): Promise<HydratedPaymentDoc> =>{
            return new Payment(paymentInput)
    })

    public findByOrderId = jest.fn(
        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new Payment(paymentInput)
            } else {
                return null
            }
    })

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedPaymentDoc[]> =>{
            return this.createPaymentsArray(paginator.limit)
    }

    private createPaymentsArray = async(length: number
        ): Promise<HydratedPaymentDoc[]> =>{
            const payments: HydratedPaymentDoc[] = []

            let count = 0
            while(count < length){
                payments.push(new Payment(paymentInput))
                count ++
            }

            return payments
    }

    public findByOrderIdAnUpdate = jest.fn(
        async(orderId: string, updateDoc: IPayment
            ): Promise<HydratedPaymentDoc | null> =>{
                if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                    return new Payment(paymentInput)
                } else {
                    return null
                }
    })
}

export const dataAccess = new DataAccess()