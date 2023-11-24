import { jest } from "@jest/globals";
import { 
    HydratedProductDoc, 
    IProduct, 
    Product 
} from "../../data-access/model";
import { PriceRange } from "../../utils/formatter";
import { Paginator } from "../../data-access/data-access";

export class ProductsDAL {
    public createNewProduct = jest.fn(async(
        productData : IProduct
    ) =>{
        const product = new Product(productData)
        return product.id
    })

    public findProductsByCategory = jest.fn(async (
        categoryName: string, 
        paginator:{skipDocs: number, limit: number}
    ): Promise<HydratedProductDoc[]> => {
        let products: HydratedProductDoc[] = []

        if(categoryName === 'phones'){
            let productCount = 0
            while(productCount < paginator.limit){
                products.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                    manufacturer: 'Samsung',
                    category: 'phones'
                }))

                productCount ++
            }
        }
        return products
    })

    public findProductsByBrand =jest.fn(async (
        brandName: string, 
        paginator:Paginator
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

    public findProductById = jest.fn(async(
        productId: string
    ): Promise<HydratedProductDoc|null> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4'){
                return new Product({
                    name: 'New Product',
                    selling_price: 600,
                    available_units: 18
                })
            } else {
                return null
            }      
        }
    )

    public findProductByIdAndUpdate = jest.fn(
        async(productId: string) =>{
            return productId
    })

    public findProducts = jest.fn(async( 
        {skipDocs, limit}:Paginator
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

    public findProductsBymanufacturer = jest.fn(async (
        manufacturerName: string, 
        paginator:Paginator
    ): Promise<HydratedProductDoc[]> => {
        let products: HydratedProductDoc[] = []

        if(manufacturerName === 'samsung'){
            let productCount = 0
            while(productCount < paginator.limit){
                products.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                    manufacturer: 'Samsung'
                }))

                productCount ++
            }
        }
        return products
    })

    public findProductsByModel = jest.fn(async (
        modelName: string, 
        paginator: Paginator
    ): Promise<HydratedProductDoc[]> => {
        let products: HydratedProductDoc[] = []

        if(modelName === 'A10S'){
            let productCount = 0
            while(productCount < paginator.limit){
                products.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                    model: 'A10S'
                }))

                productCount ++
            }
        }
        return products
    })

    public findProductsByPriceRange = jest.fn(async( 
        priceRange: PriceRange, 
        paginator: Paginator
    ): Promise<HydratedProductDoc[]> =>{
        let products: HydratedProductDoc[] = []

        if(priceRange.start ===200 && priceRange.end ===800){

            let productCount = 0
            while(productCount < paginator.limit){
                products.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                    selling_price: 600
                }))

                productCount ++
            }
        }

        return products
    })

    public productExists = jest.fn(async(productId: string) =>{
        return productId === '64c9e4f2df7cc072af2ac9e4'
    })
}