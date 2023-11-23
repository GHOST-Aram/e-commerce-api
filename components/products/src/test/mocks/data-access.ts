import { jest } from "@jest/globals";
import { HydratedProductDoc, IProduct, Product } from "../../data-access/model";

export class ProductsDAL {
    createNewProduct = jest.fn(async(productData : IProduct) =>{
        const product = new Product(productData)

        return product.id
    })

    findProductsByBrandName =jest.fn(async (
        brandName: string, paginator:{skipDocs: number, limit: number}
    ): Promise<HydratedProductDoc[]> => {
        let products: HydratedProductDoc[] = []

        if(brandName === 'samsung'){
            let productCount = 0
            while(productCount < paginator.limit){
                products.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                }))

                productCount ++
            }

        }
        return products
    })

    findProductById = jest.fn(
        async(productId: string): Promise<HydratedProductDoc|null> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4'){
                return new Product({
                    name: 'New Product',
                    selling_price: 600,
                    available_units: 18
                })
            } else {
                return null
            }
                
    })

    findProducts = jest.fn(async( 
        {skipDocs, limit}:{skipDocs: number, limit: number}
        ): Promise<HydratedProductDoc[]> =>{
        
            let products:HydratedProductDoc[] = []
            const product = new Product({
                name: 'Product Name'
            })

            let count = 0
            while(count < limit){
                products.push(product)
                count++
            }
            
            return products
    })
}