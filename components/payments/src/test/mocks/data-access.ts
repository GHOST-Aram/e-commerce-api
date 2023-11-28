import { jest } from "@jest/globals"
import { HydratedPaymentDoc, Payment } from "../../data-access/model"
import { paymentInput } from "./raw-data"

export class DataAccess{
    public createNewPayment = jest.fn(
        async(): Promise<HydratedPaymentDoc> =>{
            return new Payment(paymentInput)
    })
}

export const dataAccess = new DataAccess()