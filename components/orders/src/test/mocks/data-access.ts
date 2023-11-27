import { jest } from "@jest/globals"
import { HydratedOrderDoc, IOrder, Order } from "../../data-access/model"

export class DataAccess{
    public createNewOrder = jest.fn(
        async(data: IOrder): Promise<HydratedOrderDoc> =>{
            return new Order(data)
    })  
}

export const dataAccess = new DataAccess()