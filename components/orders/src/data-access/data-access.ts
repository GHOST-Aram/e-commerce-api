import { Paginator } from "../controller/controller"
import { HydratedOrderDoc, IOrder, Order } from "./model"

export class DataAccess{

    public createNew = async(data: IOrder): Promise<HydratedOrderDoc> =>{
        const newOrder = new Order(data)
        return await newOrder.save()
    }

    public findById = async(orderId: string): Promise<HydratedOrderDoc | null> =>{
        return Order.findById(orderId)
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedOrderDoc[]> =>{
        return await Order.find().skip(paginator.skipDocs)
            .limit(paginator.limit)
    }  
    
    public findByIdAndUpdate = (orderId: string, updateDoc: IOrder
        ): Promise<HydratedOrderDoc | null> =>{
            return Order.findByIdAndUpdate(orderId, updateDoc)
    }

    public findByIdAndDelete = async(orderId: string
        ): Promise<HydratedOrderDoc | null> => {
            return await Order.findByIdAndDelete(orderId)
    }
}

export const dataAccess  = new DataAccess()