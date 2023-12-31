import { Paginator } from "../../z-library/HTTP/http-response"
import { HydratedOrderDoc, Order, OrderModel} from "../../data-access/model"
import { jest } from "@jest/globals"
import { orderInput } from "./raw-data"

const ID_OF_AVAILABLE_ORDER = '64c9e4f2df7cc072af2ac9e8'

export class DataAccess{
    public Model: OrderModel

    constructor(model: OrderModel){
        this.Model = model
    }
    public createNew = jest.fn(

        async(data: Order): Promise<HydratedOrderDoc> =>{
            
            const mockOrder =  new this.Model(data)
            return mockOrder
        }
    ) 

    public findByReferenceId = jest.fn(

        async(orderId: string): Promise<HydratedOrderDoc | null> =>{

            if(orderId === ID_OF_AVAILABLE_ORDER){

                const mockFoundOrder =  new this.Model(orderInput)
                return mockFoundOrder

            } else return null
        }
    )

    public findWithPagination = jest.fn(

        async(paginator: Paginator): Promise<HydratedOrderDoc[]> =>{

            const mockOrders = this.createFakeOrdersArray(paginator.limit)
            return mockOrders
        }
    )

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

        async(orderId: string, updateDoc: Order): Promise<HydratedOrderDoc | null>=>{

            if(orderId === ID_OF_AVAILABLE_ORDER){
                
                const mockUpdatedOrder =  new this.Model(updateDoc)
                return mockUpdatedOrder  

            } else return null
        }
    )

    public findByIdAndDelete = jest.fn(

        async(orderId: string): Promise<HydratedOrderDoc | null> =>{

            if(orderId === ID_OF_AVAILABLE_ORDER){

                const mockDeletedOrder =  new this.Model(orderInput)
                return mockDeletedOrder

            } else return null
        }
    )
}
