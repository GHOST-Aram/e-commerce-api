import { Paginator } from "../../z-library/HTTP/http-response"
import { HydratedOrderDoc, Order, OrderModel} from "../../data-access/model"
import { jest } from "@jest/globals"
import { orderInput } from "./raw-data"

export class DataAccess{
    public Model: OrderModel

    constructor(model: OrderModel){
        this.Model = model
    }
    public createNew = jest.fn(
        async(data: Order): Promise<HydratedOrderDoc> =>{
            return new this.Model(data)
    }) 

    public findByReferenceId = jest.fn(
        async(orderId: string): Promise<HydratedOrderDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8')
                return new this.Model(orderInput)
            else return null
    })

    public findWithPagination = jest.fn(
        async(paginator: Paginator): Promise<HydratedOrderDoc[]> =>{
            return this.createFakeOrdersArray(paginator.limit)
    })

    private createFakeOrdersArray = (length: number) =>{
        const orders: HydratedOrderDoc[] = []
        let count = 0
        while (count < length ){
            orders.push(new this.Model(orderInput))
            count ++
        }

        return orders
    }

    public findByIdAndUpdate = jest.fn(
        async(orderId: string, updateDoc: Order
        ): Promise<HydratedOrderDoc | null>  =>{
            if(orderId === '64c9e4f2df7dd072af2ac9e5'){
                return new this.Model(updateDoc)
                
            }
            else return null
    })

    public findByIdAndDelete = jest.fn(
        async(orderId: string): Promise<HydratedOrderDoc | null> =>{
            if(orderId === '64c9e4f2df7cc072af2ac9e8'){
                return new this.Model(orderInput)
                
            }
            else return null
    })
}
