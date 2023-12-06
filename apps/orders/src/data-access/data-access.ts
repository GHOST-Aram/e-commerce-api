import { Accessible } from "../z-library/bases/accessible"
import { Paginator } from "../z-library/bases/controller"
import { HydratedOrderDoc, Order } from "./model"

export class DataAccess implements Accessible{

    public createNew = async(data: Order): Promise<HydratedOrderDoc> =>{
        const newOrder = new Order(data)
        return await newOrder.save()
    }

    public findByReferenceId = async(orderId: string): Promise<HydratedOrderDoc | null> =>{
        return Order.findById(orderId)
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedOrderDoc[]> =>{
        return await Order.find().skip(paginator.skipDocs)
            .limit(paginator.limit)
    }  
    
    public findByIdAndUpdate = (orderId: string, updateDoc: Order
        ): Promise<HydratedOrderDoc | null> =>{
            return Order.findByIdAndUpdate(orderId, updateDoc)
    }

    public findByIdAndDelete = async(orderId: string
        ): Promise<HydratedOrderDoc | null> => {
            return await Order.findByIdAndDelete(orderId)
    }
}

export const dataAccess  = new DataAccess()