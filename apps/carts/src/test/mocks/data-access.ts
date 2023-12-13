import { Paginator } from "../../z-library/HTTP/http-response"
import { Cart, CartModel, HydratedCartDoc } from "../../data-access/model"
import { jest } from "@jest/globals"
import { cartData } from "./raw-data"

const CUSTOMER_ID_OF_AVAILABLE_CART = '64c9e4f2df7cc072af2ac9e5'

export class DataAccess{

    public Model: CartModel

    constructor(model: CartModel){
        this.Model = model
    }

    public createNew = jest.fn(

        async(data: Cart): Promise<HydratedCartDoc> =>{

            const mockCart = new this.Model(data)
            return mockCart
        }
    )

    public findByReferenceId = jest.fn(

        async(customerId: string): Promise<HydratedCartDoc | null> =>{

            if(customerId === CUSTOMER_ID_OF_AVAILABLE_CART){

                const mockCart =  new this.Model(cartData)
                return mockCart
                
            } else return null
        }
    )

    public findByIdAndUpdate = jest.fn(

        async(customerId: string, updateDoc: {items:string[]}
            ): Promise<HydratedCartDoc | null> =>{

            if(customerId === CUSTOMER_ID_OF_AVAILABLE_CART){

                const mockUpdatedCart =  new this.Model({
                    customer: customerId,
                    items: updateDoc.items
                })

                return mockUpdatedCart

            } else return  null
        }
    )

    public findCartAndAddItemId = jest.fn(

        async(customerId: string, itemId: string): Promise<HydratedCartDoc| null> =>{

            if(customerId === CUSTOMER_ID_OF_AVAILABLE_CART){

                const mockModifiedCart =  new this.Model({
                    customer: customerId,
                    items: [itemId]
                })

                return mockModifiedCart
                
            } else return  null
        }
    )

    public findCartAndRemoveItemId = jest.fn(

        async(customerId: string, itemId: string): Promise<HydratedCartDoc| null> =>{
            
            if(customerId === CUSTOMER_ID_OF_AVAILABLE_CART){
                const mockModifiedCart = new this.Model({
                    customer: customerId,
                    items: []
                })

                return mockModifiedCart
            } else return  null
        }
    )
    
    public findWithPagination = jest.fn(

        async(paginator: Paginator): Promise<HydratedCartDoc[]> =>{

            const mockCarts = this.createFakeCartsArray(paginator.limit)
            return mockCarts
        }
    )

    private createFakeCartsArray = (length: number): HydratedCartDoc[] =>{

        const carts: HydratedCartDoc[] = []

        let count = 0
        while(count < length){
            carts.push(new this.Model(cartData))
            count++
        }

        return carts
    }

    public findByIdAndDelete = jest.fn(
        
        async(customerId: string): Promise<HydratedCartDoc | null> =>{

            if(customerId === CUSTOMER_ID_OF_AVAILABLE_CART){

                const deletedMockCart =  new this.Model({
                    customer: customerId,
                })

                return deletedMockCart
            } else return null
        }
    )
}
