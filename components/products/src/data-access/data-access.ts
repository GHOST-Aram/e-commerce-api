import { IProduct, Product } from "./model"

export class ProductsDAL{
    createNewProduct = async( productData: IProduct): Promise<string> =>{
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
            availabile_units: productData.availabile_units,
            specifications: productData.specifications,
        })

        return (await product.save()).id
    }
}