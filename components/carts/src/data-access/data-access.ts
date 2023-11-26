import { Cart, HydratedCartDoc, ICart } from "./model"
export class DataAccess{
    createNewCart = async(data:ICart) =>{
        const cart = new Cart({
            items: data.items,
            customer: data.customer
        })
        return await cart.save()
    }

    findCartByCustomerId = async(
        customerId : string ): Promise<HydratedCartDoc | null> =>{
            return await Cart.findOne({ customer: customerId })
    }
}

export const dataAccess  = new DataAccess()