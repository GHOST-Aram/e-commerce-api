import { jest } from "@jest/globals"
import { Cart, HydratedCartDoc, ICart } from "../../data-access/model"
import { cartData } from "./raw-data"
import { Paginator } from "../../controller/controller"

export class DataAccess{
    public createNew = jest.fn(
        async(data: ICart): Promise<HydratedCartDoc> =>{
            return new Cart(data)
    })

    public findByCustomerId = jest.fn(async(
        customerId: string): Promise<HydratedCartDoc | null> =>{
            if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                return new Cart(cartData)
            }
            return null
    })

    public findWithPagination = jest.fn(
        async(paginator: Paginator) =>{
            return this.createFakeCartsArray(paginator.limit)
    })

    private createFakeCartsArray = (length: number): HydratedCartDoc[] =>{
        const carts: HydratedCartDoc[] = []

        let count = 0
        while(count < length){
            carts.push(new Cart(cartData))
            count++
        }

        return carts
    }
}

export const dataAccess = new DataAccess()