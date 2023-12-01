import { Paginator } from "../../z-library/bases/controller"
import { Cart, HydratedCartDoc, ICart } from "../../data-access/model"
import { jest } from "@jest/globals"
import { cartData } from "./raw-data"

export class DataAccess{

    public createNew = jest.fn(
        async(data: ICart): Promise<HydratedCartDoc> =>{
            return new Cart(data)
    })

    public findByReferenceId = jest.fn(async(
        customerId: string): Promise<HydratedCartDoc | null> =>{
            if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                return new Cart(cartData)
            }
            return null
    })

    public findByIdAndUpdate = jest.fn(
        async(customerId: string, updateDoc: {items:string[]}
            ): Promise<HydratedCartDoc | null> =>{
                if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                    return new Cart({
                        customer: customerId,
                        items: updateDoc.items
                    })
                } else {
                    return  null
                } 
    })

    public findCartAndAddItemId = jest.fn(
        async(customerId: string, itemId: string
            ): Promise<HydratedCartDoc| null> =>{
                if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                    return new Cart({
                        customer: customerId,
                        items: [itemId]
                    })
                } else {
                    return  null
                } 
        }
    )

    public findCartAndRemoveItemId = jest.fn(
        async(customerId: string, itemId: string
            ): Promise<HydratedCartDoc| null> =>{
                if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                    return new Cart({
                        customer: customerId,
                        items: []
                    })
                } else {
                    return  null
                } 
        }
    )
    
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

    public findByIdAndDelete = jest.fn(async(
        customerId: string): Promise<HydratedCartDoc | null> =>{
            if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                return new Cart({
                    customer: customerId,
                })
            }
            return null
    })
}

export const dataAccess = new DataAccess()