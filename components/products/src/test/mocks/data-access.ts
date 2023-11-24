import { jest } from "@jest/globals";
import { 
    HydratedProductDoc, 
    IProduct, 
    Product 
} from "../../data-access/model";
import { PriceRange } from "../../utils/formatter";
import { Paginator } from "../../data-access/data-access";

export class ProductsDAL {

    public createNewProduct = jest.fn(
        async(productData : IProduct) =>{
            const product = new Product(productData)
            return product.id
        })

    public findProductsByCategory = jest.fn(async (
        categoryName: string, 
        paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
            let products: HydratedProductDoc[] = []

            if(categoryName === 'phones'){
                products = this.createFakeProductsArray(
                    paginator.limit)
            }
            return products
        })

    private createFakeProductsArray = (
        paginationLimit: number): HydratedProductDoc[] =>{
            let products: HydratedProductDoc[] = []
            let productCount = 0

            while(productCount < paginationLimit){
                products.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                    manufacturer: 'Samsung',
                    category: 'phones'
                }))
                productCount ++
            }
            return products
        }

    public findProductsByBrand =jest.fn(async (
        brandName: string, 
        paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
            let products: HydratedProductDoc[] = []

            if(brandName === 'samsung')
                products = this.createFakeProductsArray(
                    paginator.limit)

            return products
        })

    public findProductById = jest.fn(
        async(productId: string
        ): Promise<HydratedProductDoc|null> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4')
                return new Product({
                    name: 'New Product',
                    selling_price: 600,
                    available_units: 18
                })
            
            return null         
        })

    public findProductByIdAndDelete = jest.fn(async(
        productId: string
        ): Promise<HydratedProductDoc | null> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4'){
                const product = new Product({
                    name: 'Deleted product'
                })

                return product
            }

            return null
        })

    public findProductByIdAndUpdate = jest.fn(
        async(productId: string, updateData: IProduct) =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4')
                return productId
            
            return undefined
        })

    public findProducts = jest.fn(async( paginator:Paginator
        ): Promise<HydratedProductDoc[]> =>{
            return this.createFakeProductsArray(paginator.limit)
        })

    public findProductsBymanufacturer = jest.fn(async (
        manufacturerName: string, 
        paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
            let products: HydratedProductDoc[] = []

            if(manufacturerName === 'samsung')
                products = this.createFakeProductsArray(
                    paginator.limit)

            return products
        })

    public findProductsByModel = jest.fn(async (
        modelName: string, 
        paginator: Paginator
        ): Promise<HydratedProductDoc[]> => {
            let products: HydratedProductDoc[] = []

            if(modelName === 'A10S')
                products = this.createFakeProductsArray(
                    paginator.limit)
            
            return products
        })

    public findProductsByPriceRange = jest.fn(async( 
        priceRange: PriceRange, 
        paginator: Paginator
        ): Promise<HydratedProductDoc[]> =>{
            let products: HydratedProductDoc[] = []

            if(priceRange.start ===200 && priceRange.end ===800)
                products = this.createFakeProductsArray(
                    paginator.limit)

            return products
        })
}