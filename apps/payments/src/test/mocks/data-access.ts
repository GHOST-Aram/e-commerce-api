import { Paginator } from "../../z-library/HTTP/http-response"
import { HydratedPaymentDoc, Payment, PaymentModel } from "../../data-access/model"
import { jest } from "@jest/globals"
import { paymentInput } from "./raw-data"

const ORDER_ID_OF_AVAILABLE_PAYMENT = '64c9e4f2df7cc072af2ac9e8'

export class DataAccess{
    public Model: PaymentModel

    constructor(model: PaymentModel){
        this.Model = model
    }

    public createNew = jest.fn(

        async(): Promise<HydratedPaymentDoc> =>{
            const mockPayment =  new this.Model(paymentInput)
            return mockPayment
        }
    )

    public findByReferenceId = jest.fn(

        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{

            if(orderId === ORDER_ID_OF_AVAILABLE_PAYMENT){

                const mockFoundPayment =  new this.Model(paymentInput)
                return mockFoundPayment

            } else return null
        }
    )

    public findWithPagination = jest.fn(

        async(paginator: Paginator): Promise<HydratedPaymentDoc[]> =>{
            const mockPayments =  this.createDocsArray(paginator.limit)
            return mockPayments
        }    
    )

    private createDocsArray = async(length: number): Promise<HydratedPaymentDoc[]> =>{
        const mockPayments: HydratedPaymentDoc[] = []

        let count = 0
        while(count < length){
            mockPayments.push(new this.Model(paymentInput))
            count ++
        }
        
        return mockPayments
    }

    public findByIdAndUpdate = jest.fn(

        async(orderId: string, updateDoc: Payment): Promise<HydratedPaymentDoc | null> =>{
            
            if(orderId === ORDER_ID_OF_AVAILABLE_PAYMENT){

                const mockUpdatedPayment =  new this.Model(paymentInput)
                return mockUpdatedPayment

            } else  return null
        }
    )

    public findByIdAndDelete = jest.fn(

        async(orderId: string): Promise<HydratedPaymentDoc | null> =>{

            if(orderId === ORDER_ID_OF_AVAILABLE_PAYMENT){

                const mockDeletedPayment =  new this.Model(paymentInput)
                return mockDeletedPayment

            } else return null
        }
    )
}
