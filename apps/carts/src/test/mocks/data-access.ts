import { Paginator } from "../../z-library/HTTP/http-response"
import { Cart, CartModel, HydratedCartDoc } from "../../data-access/model"
import { jest } from "@jest/globals"
import { cartData } from "./raw-data"

export class DataAccess{

    public Model: CartModel

    constructor(model: CartModel){
        this.Model = model
    }

    public createNew = jest.fn(
        async(data: Cart): Promise<HydratedCartDoc> =>{
            return new this.Model(data)
    })

    public findByReferenceId = jest.fn(async(
        customerId: string): Promise<HydratedCartDoc | null> =>{
            if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                return new this.Model(cartData)
            }
            return null
    })

    public findByIdAndUpdate = jest.fn(
        async(customerId: string, updateDoc: {items:string[]}
            ): Promise<HydratedCartDoc | null> =>{
                if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                    return new this.Model({
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
                    return new this.Model({
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
                    return new this.Model({
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
            carts.push(new this.Model(cartData))
            count++
        }

        return carts
    }

    public findByIdAndDelete = jest.fn(async(
        customerId: string): Promise<HydratedCartDoc | null> =>{
            if(customerId === '64c9e4f2df7cc072af2ac9e5'){
                return new this.Model({
                    customer: customerId,
                })
            }
            return null
    })
}
