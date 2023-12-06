import { Paginator } from "../z-library/bases/controller"
import { Accessible } from "../z-library/bases/accessible"
import { PriceRange } from "../z-library/formatting/formatter"
import { HydratedProductDoc, Product } from "./model"

export class ProductsDAL implements Accessible{
    
    public createNew = async( productData: Product): Promise<string> =>{
        const product = new Product(productData)
        return (await product.save()).id
    }

    public findByReferenceId = async(productId: string): Promise<HydratedProductDoc | null > =>{
        return await Product.findById(productId)
    }

    public findWithPagination = async( paginator: Paginator ): Promise<HydratedProductDoc[]> =>{
        const products = await Product.find()
            .skip(paginator.skipDocs).limit(paginator.limit)
        
        return products
    }

    public findByPriceRange = async(priceRange: PriceRange, paginator: Paginator
        ): Promise<HydratedProductDoc[]> =>{
        const products = Product.find({'selling_price': {
                $gte: priceRange.start, 
                $lte: priceRange.end
            }
        })
        .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findByCategory = async (categoryName: string, paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
        const products = await Product.find({ category: categoryName })
            .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findByBrand = async (brandName: string, paginator: Paginator
        ): Promise<HydratedProductDoc[]> => {
        const products = await Product.find({ brand: brandName})
            .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findBymanufacturer = async (manufacturerName: string, paginator:Paginator
        ): Promise<HydratedProductDoc[]> => {
        const products = await Product.find({ manufacturer: manufacturerName})
            .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findByModelName = async (modelName: string, paginator: Paginator
        ): Promise<HydratedProductDoc[]> => {
            const products = await Product.find({ model: modelName})
                .skip(paginator.skipDocs).limit(paginator.limit)

            return products
    }
    
    public findByIdAndUpdate = async(productId: string, updateData: Product
        ): Promise<string | undefined> =>{
        const product = await Product.findByIdAndUpdate(productId, updateData)

        if(product === null)
            return undefined
        else
            return product.id
    }

    public findByIdAndDelete = async(productId: string
        ): Promise<HydratedProductDoc | null > =>{
        const deleted = await Product.findByIdAndDelete(productId)

        return deleted
    }
}