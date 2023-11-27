import { HydratedOrderDoc, IOrder, Order } from "./model"

export class DataAccess{

    public createNewOrder = async(data: IOrder
        ): Promise<HydratedOrderDoc> =>{
            const newOrder = new Order(data)
            return await newOrder.save()
    }
}

export const dataAccess  = new DataAccess()