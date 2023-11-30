import { PriceRange } from "../utils/formatter"
import { HydratedProductDoc, IProduct, Product } from "./model"
import { Paginator } from "../../../library/bases/controller"

export class ProductsDAL{
    
    public createNew = async( productData: IProduct): Promise<string> =>{
        const product = new Product(productData)
        return (await product.save()).id
    }

    public findById = async(productId: string): Promise<HydratedProductDoc | null > =>{
        return await Product.findById(productId)
    }

    public findMany = async( paginator: Paginator ): Promise<HydratedProductDoc[]> =>{
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
    
    public findByIdAndDelete = async(productId: string
        ): Promise<HydratedProductDoc | null > =>{
        const deleted = await Product.findByIdAndDelete(productId)

        return deleted
    }
    public findByIdAndUpdate = async(productId: string, updateData: IProduct
        ): Promise<string | undefined> =>{
        const product = await Product.findByIdAndUpdate(productId, updateData)

        if(product === null)
            return undefined
        else
            return product.id
    }
}