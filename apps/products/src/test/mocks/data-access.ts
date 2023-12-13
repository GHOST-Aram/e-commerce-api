import { Paginator } from "../../z-library/HTTP/http-response";
import { jest } from "@jest/globals";
import mongoose from "mongoose";
import { ProductModel, productSchema } from "../../data-access/model";

import { 
    HydratedProductDoc, 
    Product 
} from "../../data-access/model";
import { PriceRange } from "../../z-library/formatting/formatter";

export class ProductsDAL {

    public Model: ProductModel

    constructor(model: ProductModel){
        this.Model = model
        
    }

    public createNew = jest.fn(
        async(productData : Product) =>{
            const mockProduct = new Product(productData)
            return mockProduct.id
    })

    public findByReferenceId = jest.fn(
        async(productId: string
        ): Promise<HydratedProductDoc|null> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4'){
                const mockFoundProduct =  new Product({
                    name: 'New Product',
                    selling_price: 600,
                    available_units: 18
                })

                return mockFoundProduct
            } else return null         
    })

    public findWithPagination = jest.fn(async( paginator:Paginator
        ): Promise<HydratedProductDoc[]> =>{
            const mockProducts  = this.createFakeProductsArray(paginator.limit)
            return mockProducts
    })

    public findByPriceRange = jest.fn(async( 
        priceRange: PriceRange, paginator: Paginator
        ): Promise<HydratedProductDoc[]> =>{
            let mockFoundProducts: HydratedProductDoc[] = []

            if(priceRange.start === 200 && priceRange.end === 800)
                mockFoundProducts = this.createFakeProductsArray(paginator.limit)

            return mockFoundProducts
    })

    public findByCategory = jest.fn(async (
        categoryName: string, 
        paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
            let mockFoundProducts: HydratedProductDoc[] = []

            if(categoryName === 'phones'){
                mockFoundProducts = this.createFakeProductsArray(
                    paginator.limit)
            }
            return mockFoundProducts
        })

    private createFakeProductsArray = (paginationLimit: number
        ): HydratedProductDoc[] =>{
            let mockProducts: HydratedProductDoc[] = []
            let productCount = 0

            while(productCount < paginationLimit){
                mockProducts.push(new Product({
                    name: 'Product 10',
                    brand: 'Samsung',
                    manufacturer: 'Samsung',
                    category: 'phones'
                }))
                productCount ++
            }
            return mockProducts
    }

    public findByBrand =jest.fn(async (brandName: string, paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
            let mockFoundProducts: HydratedProductDoc[] = []

            if(brandName === 'samsung')
                mockFoundProducts = this.createFakeProductsArray(
                    paginator.limit)

            return mockFoundProducts
    })

    public findBymanufacturer = jest.fn(
        async (manufacturerName: string, paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
            let mockFoundProducts: HydratedProductDoc[] = []

            if(manufacturerName === 'samsung')
                mockFoundProducts = this.createFakeProductsArray(
                    paginator.limit)

            return mockFoundProducts
        }
    )

    public findByModelName = jest.fn(
        async ( modelName: string, paginator: Paginator
        ): Promise<HydratedProductDoc[]> => {
            let mockFoundProducts: HydratedProductDoc[] = []

            if(modelName === 'A10S')
                mockFoundProducts = this.createFakeProductsArray(
                    paginator.limit)
            
            return mockFoundProducts
        }
    )

    public findByIdAndUpdate = jest.fn(
        async(productId: string, updateData: Product): Promise<string | undefined> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4'){
                const mockUpdatedProductId = productId
                return mockUpdatedProductId
            }
            
            return undefined
    })

    public findByIdAndDelete = jest.fn(async(
        productId: string
        ): Promise<HydratedProductDoc | null> =>{
            if(productId === '64c9e4f2df7cc072af2ac9e4'){
                const mockDeletedProduct = new Product({
                    name: 'Deleted product'
                })

                return mockDeletedProduct
            }

            return null
    })
}