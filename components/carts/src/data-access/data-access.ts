import { Paginator } from "../controller/controller"
import { Cart, HydratedCartDoc, ICart } from "./model"
export class DataAccess{
    public createNew = async(data:ICart) =>{
        const cart = new Cart({
            items: data.items,
            customer: data.customer
        })
        return await cart.save()
    }

    public findByCustomerId = async(
        customerId : string ): Promise<HydratedCartDoc | null> =>{
            return await Cart.findOne({ customer: customerId })
    }

    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedCartDoc[]> =>{
            return Cart.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }
}

export const dataAccess  = new DataAccess()