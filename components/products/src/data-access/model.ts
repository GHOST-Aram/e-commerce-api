import { HydratedDocument, Model, ObjectId, Schema, model } from "mongoose"

export interface IProduct{
    name: string
    image_url?: string
    image_file?: Buffer
    description: string
    brand: string
    manufacturer: string
    model: string
    category: string
    selling_price: number
    marked_price: number
    availabile_units: number 
    specifications: string[]
    ratings?: number[]
    createdAt?: Date
}

interface ProductVirtuals{
    rating:number,
    percentage_discount: number
}



export type ProductModel = Model<IProduct,{},{}, ProductVirtuals>

const productSchema: Schema = new Schema<
IProduct, ProductModel,{}, {}, ProductVirtuals>({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2
    },
    image_url: {
        type: String,
        required: false,
        default: undefined
    },
    description: {
        type: String,
        maxlength: 1000,
        minlength: 50,
        required: true
    },
    brand: {
        type: String,
        maxlength: 100,
        minlength: 2,
        default: 'Generic'
    },
    manufacturer: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        default: 'Generic'
    },
    model:{
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    category: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    selling_price:{
        type: Number,
        min: 1,
        required: true
    },
    marked_price: {
        type: Number,
        min: 1,
    },
    availabile_units: {
        type: Number,
        min: 0,
        required: true
    },
    specifications: {
        type: [String],
        required: true
    },
    ratings: {
        type: [Number],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

productSchema.virtual('rating').get(function():number{
    const totalRatings = this.ratings.reduce(
        (cummulative: number, current: number) => {
        return cummulative + current
    }, 0)

    const meanRating = totalRatings / this.ratings.length

    return meanRating
})

productSchema.virtual('percentage_discount').get(function():number{
    const marked_price = this.marked_price
    const selling_price = this.selling_price
    
    if(marked_price > selling_price){
        const discount = marked_price - selling_price
        const percentage_discount = (discount / marked_price) * 100

        return percentage_discount
    } else{
        return 0
    }
})

export type HydratedProductDoc = HydratedDocument<IProduct>

export const Product = model<IProduct, ProductModel>(
    'Product', productSchema)