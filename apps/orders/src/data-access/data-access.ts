import { Accessible } from "../z-library/bases/accessible"
import { Paginator } from "../z-library/HTTP/http-response"
import { HydratedOrderDoc, Order, OrderModel } from "./model"

export class DataAccess implements Accessible{
    public Model: OrderModel
    constructor(model: OrderModel){
        this.Model = model
    }

    public createNew = async(data: Order): Promise<HydratedOrderDoc> =>{
        const newOrder = new this.Model(data)
        return await newOrder.save()
    }

    public findByReferenceId = async(orderId: string): Promise<HydratedOrderDoc | null> =>{
        return await this.Model.findById(orderId)
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedOrderDoc[]> =>{
        return await this.Model.find().skip(paginator.skipDocs)
            .limit(paginator.limit)
    }  
    
    public findByIdAndUpdate = (orderId: string, updateDoc: Order
        ): Promise<HydratedOrderDoc | null> =>{
            return this.Model.findByIdAndUpdate(orderId, updateDoc)
    }

    public findByIdAndDelete = async(orderId: string
        ): Promise<HydratedOrderDoc | null> => {
            return await this.Model.findByIdAndDelete(orderId)
    }
}
