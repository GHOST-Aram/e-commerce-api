import { NextFunction, Request, Response } from "express"
import { Paginator, ProductsDAL } from "../data-access/data-access"
import { HydratedProductDoc, IProduct } from "../data-access/model"
import { PriceRange, formatter } from "../utils/formatter"

export class ProductsController{
    private dal

    constructor(dataAccessLayer: ProductsDAL){
        this.dal = dataAccessLayer
    }

    public AddNewProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{

            const productData: IProduct = req.body
            try {
                const productId = await this.dal.createNewProduct(
                    productData)
                this.respondWithCreatedResource(res, productId)
            } catch (error) {
                next(error)
            }
        }

    private respondWithCreatedResource = (
        res: Response, 
        productId: string
        ) =>{
            res.location(`/products/${productId}`)
            res.status(201).json({ message: 'Created'})
    }
    
    private respondWith404Error = (res: Response) =>{
        res.status(404).json(
            { message: 'Product not found' })
    }
    
    public getOneProduct =async (
        req:Request, res: Response, next: NextFunction
        ) => {
            const productId  = req.params.id

            try {
                const product = await this.dal.findProductById(
                    productId)

                if(product)
                    this.respondWithFoundResource(product, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
    
    }

    private respondWithFoundResource = (
        resource: HydratedProductDoc[] | HydratedProductDoc, 
        res: Response
        ) =>{
           res.status(200).json({ resource })
    }

    public getProducts= async(
        req: Request, res: Response, next: NextFunction
        )=>{
            try {
                const paginator = this.paginate(req)
                const products = await this.dal.findProducts(
                    paginator)

                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
        } 
    
    private paginate = (req?: Request): Paginator =>{
        const pagestr = req?.query.page
        const limitstr = req?.query.limit

        let page:number = 1
        let limit: number = 10

        if(req){
            if(typeof limitstr === 'string'
                && typeof pagestr === 'string'){
                page = Math.abs(parseInt(pagestr))
                limit = Math.abs(parseInt(limitstr))
            }
        }
        const skipDocs = (page - 1) * limit

        return ({ skipDocs, limit })
    }

    public getProductsByBrand = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const brandName = req.params.brandName

            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsByBrand(
                    brandName, paginator)
                
                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
        }
    
    public getProductsByManufacturer = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const manufName = req.params.manufacturerName

            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsBymanufacturer(
                    manufName, paginator)
                
                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
        }

    public getProductsByModel = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const modelName = req.params.modelName
            const paginator = this.paginate(req)

            try {
                const products = await this.dal.findProductsByModel(
                    modelName, paginator)
                
                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
        }


    public getProductsByPriceRange = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const rangeString = req.params.range
            const priceRange: PriceRange = formatter
                .extractPriceRange(rangeString)
               
                
            const pagination = this.paginate(req)
            try {
                const products = await this.dal
                    .findProductsByPriceRange(priceRange, 
                        pagination)

                this.respondWithFoundResource(products, res)                
            } catch (error) {
                next(error)
            }
        }
    
    public getProductsByCategory = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const category = req.params.categoryName        
            
            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsByCategory(
                    category, paginator)

                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            }
        }


    public modifyOneProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const productId = req.params.id
            
            const patchData = req.body
            try {
                const id = await this.dal.findProductByIdAndUpdate(
                    productId, patchData)

                if(id)
                    this.respondWithChangedResource(id, 'Modified', res)
                
            this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
        }

    private respondWithChangedResource = (
        productId: string, change: string, res: Response
        ) =>{
            res.location(`/products/${productId}`)
            res.status(200).json({ message: change })
        }


    public updateOneProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{

            const productId = req.params.id
            
            const productData: IProduct = req.body
            try { 
                const id = await this.dal.findProductByIdAndUpdate(
                    productId, productData)

                if(id){
                    this.respondWithChangedResource(id, 'Updated', res)
                } else {
                    const newProductId = await this.dal.createNewProduct(
                        productData)
                    this.respondWithCreatedResource(res, newProductId)
                }                 
            } catch (error) {
                next(error)
            }   
    }

    public deleteOneProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const productId = req.params.id

            try {
                const deletedProduct = await this.dal.findProductByIdAndDelete(
                    productId)
                
                if(deletedProduct)
                    this.respondWithDeletedResource(
                    deletedProduct.id, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
        }

    private respondWithDeletedResource = (
        id: string, res: Response) =>{
            res.status(200).json({ message: 'Deleted', id })
    }
    
    public respondWithMethodNotAllowed = (
        req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed. ' })
    }
}