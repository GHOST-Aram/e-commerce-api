import { Paginator } from "../controller/controller"
import { Cart, HydratedCartDoc, ICart } from "./model"
export class DataAccess{

    public findCartAndAddItemId = async(
        customerId: string, itemId: string
        ): Promise<HydratedCartDoc | null > =>{
            const modifiedCart = await Cart.findOneAndUpdate(
                { customer: customerId },
                { $push: {items: itemId} }
            )

            return modifiedCart
    }
    public findCartAndRemoveItemId = async(
        customerId: string, itemId: string
        ): Promise<HydratedCartDoc | null > =>{
            const modifiedCart = await Cart.findOneAndUpdate(
                { customer: customerId },
                { $pull: {items: itemId} }
            )

            return modifiedCart
    }
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

    public findByCustomerIDAndDelete = async(customerId: string
        ): Promise<HydratedCartDoc | null> =>{
            return await Cart.findOneAndDelete({ customer: customerId })
    }
    
    public findWithPagination = async(paginator: Paginator
        ): Promise<HydratedCartDoc[]> =>{
            return Cart.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }

    public findByCustomerIdAndUpdate = async(
        customerId: string, updateDoc: { items: string []}
        ): Promise<HydratedCartDoc | null > =>{
            const updatedDoc = await Cart.findOneAndUpdate(
                { customer: customerId}, updateDoc)
            
            return updatedDoc 

    }
}

export const dataAccess  = new DataAccess()