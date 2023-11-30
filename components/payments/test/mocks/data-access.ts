import { Paginator } from "../../../../library/bases/controller"
import { HydratedPaymentDoc, IPayment, Payment } from "../../data-access/model"
import { jest } from "@jest/globals"
import { paymentInput } from "./raw-data"

export class DataAccess{
    public createNew = jest.fn(
        async(): Promise<HydratedPaymentDoc> =>{
            return new Payment(paymentInput)
    })

    public findByReferenceId = jest.fn(
        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new Payment(paymentInput)
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
                payments.push(new Payment(paymentInput))
                count ++
            }

            return payments
    }

    public findByIdAndUpdate = jest.fn(
        async(orderId: string, updateDoc: IPayment
            ): Promise<HydratedPaymentDoc | null> =>{
                if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                    return new Payment(paymentInput)
                } else {
                    return null
                }
    })

    public findByIdAndDelete = jest.fn(
        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new Payment(paymentInput)
            } else {
                return null
            }
    })
}

export const dataAccess = new DataAccess()