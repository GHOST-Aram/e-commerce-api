import { jest } from "@jest/globals"
import { HydratedOrderDoc, IOrder, Order } from "../../data-access/model"
import { Paginator } from "../../controller/controller"
import { orderInput } from "./raw-data"

export class DataAccess{
    public createNew = jest.fn(
        async(data: IOrder): Promise<HydratedOrderDoc> =>{
            return new Order(data)
    }) 
    
    public findWithPagination = jest.fn(
        async(paginator: Paginator): Promise<HydratedOrderDoc[]> =>{
            return this.createFakeOrdersArray(paginator.limit)
    })

    private createFakeOrdersArray = (length: number) =>{
        const orders: HydratedOrderDoc[] = []
        let count = 0
        while (count < length ){
            orders.push(new Order(orderInput))
            count ++
        }

        return orders
    }

    public findById = jest.fn(
        async(orderId: string): Promise<HydratedOrderDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8')
                return new Order(orderInput)
            else return null
    })

    public findByIdAndUpdate = jest.fn(
        async(orderId: string, updateDoc: IOrder
        ): Promise<HydratedOrderDoc | null>  =>{
            if(orderId === '64c9e4f2df7dd072af2ac9e5'){
                return new Order(updateDoc)
                
            }
            else return null
    })

    public findByIdAndDelete = jest.fn(
        async(orderId: string): Promise<HydratedOrderDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new Order(orderInput)
                
            }
            else return null
    })
}

export const dataAccess = new DataAccess()