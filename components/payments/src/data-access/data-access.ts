import { HydratedPaymentDoc, IPayment, Payment } from "./model"

export class DataAccess{

    public createNewPayment = async(data: IPayment
        ): Promise<HydratedPaymentDoc> =>{
            const payment = new Payment(data)
            return await payment.save()
    }
}

export const dataAccess  = new DataAccess()