import { jest } from "@jest/globals"
import { Cart, HydratedCartDoc, ICart } from "../../data-access/model"
import { cartData } from "./raw-data"

export class DataAccess{
    public createNewCart = jest.fn(
        async(data: ICart): Promise<HydratedCartDoc> =>{
            return new Cart(data)
    })

    public findCartByCustomerId = jest.fn(async(
        customerId: string): Promise<HydratedCartDoc | null> =>{
            if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                return new Cart(cartData)
            }
            return null
    })
}

export const dataAccess = new DataAccess()