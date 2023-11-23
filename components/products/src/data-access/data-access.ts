import { PriceRange } from "../utils/formatter"
import { HydratedProductDoc, IProduct, Product } from "./model"

export interface Paginator{
    skipDocs: number, 
    limit: number
}

export class ProductsDAL{
    
    public createNewProduct = async( productData: IProduct): Promise<string> =>{
        const product =  new Product({
            name: productData.name,
            image_file: productData.image_file ? productData.image_file : null,
            image_url: productData.image_url ? productData.image_url : undefined,
            description: productData.description,
            brand: productData.brand,
            manufacturer: productData.manufacturer,
            model: productData.model,
            category: productData.category,
            selling_price: productData.selling_price,
            marked_price: productData.marked_price,
            available_units: productData.available_units,
            specifications: productData.specifications,
        })

        return (await product.save()).id
    }

    public findProducts = async(
        {skipDocs, limit}: Paginator
    ): Promise<HydratedProductDoc[]> =>{
        const products = await Product.find().skip(skipDocs).limit(limit)
        
        return products
    }

    findProductsByBrandName = async (
        brandName: string, 
        paginator: Paginator
    ): Promise<HydratedProductDoc[]> => {
        const products = await Product.find({ brand: brandName})
            .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findProductById = async(
        productId: string
    ): Promise<HydratedProductDoc | null > =>{
        return await Product.findById(productId)
    }
    
    public findProductsBymanufacturerName = async (
        manufacturerName: string, 
        paginator:Paginator
    ): Promise<HydratedProductDoc[]> => {
        const products = await Product.find({ brand: manufacturerName})
            .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findProductsByModelName = async (
        modelName: string, 
        paginator: Paginator
    ): Promise<HydratedProductDoc[]> => {
        const products = await Product.find({ brand: modelName})
            .skip(paginator.skipDocs).limit(paginator.limit)

        return products
    }

    public findProductsByPriceRange = async(
        priceRange: PriceRange, 
        paginator: Paginator
    ): Promise<HydratedProductDoc[]> =>{
        const products = Product.find({
            'selling_price': {
                $gte: priceRange.start, 
                $lte: priceRange.end
            }
        })
        .skip(paginator.skipDocs)
        .limit(paginator.limit)

        return products
    }
}