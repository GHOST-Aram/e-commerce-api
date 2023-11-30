import { NextFunction, Request, Response } from "express"
import { Paginator, ProductsDAL } from "../data-access/data-access"
import { HydratedProductDoc, IProduct } from "../data-access/model"
import { PriceRange, formatter } from "../utils/formatter"

export class ProductsController{
    private dal

    constructor(dataAccessLayer: ProductsDAL){
        this.dal = dataAccessLayer
    }

    public AddNew = async(
        req: Request, res: Response, next: NextFunction
        ) =>{

            const productData: IProduct = req.body
            try {
                const productId = await this.dal.createNew(
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
    
    public getOne =async (
        req:Request, res: Response, next: NextFunction
        ) => {
            const productId  = req.params.id

            try {
                const product = await this.dal.findById(
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

    public getMany= async(
        req: Request, res: Response, next: NextFunction
        )=>{
            try {
                const paginator = this.paginate(req)
                const products = await this.dal.findMany(
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

    public getByPriceRange = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const rangeString = req.params.range
            const priceRange: PriceRange = formatter
                .extractPriceRange(rangeString)
               
                
            const pagination = this.paginate(req)
            try {
                const products = await this.dal
                    .findByPriceRange(priceRange, 
                        pagination)

                this.respondWithFoundResource(products, res)                
            } catch (error) {
                next(error)
            }
    }

    public getByCategory = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const category = req.params.categoryName        
            
            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findByCategory(
                    category, paginator)

                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            }
    }

    public getByBrand = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const brandName = req.params.brandName

            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findByBrand(
                    brandName, paginator)
                
                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
        }
    
    public getByManufacturer = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const manufName = req.params.manufacturerName

            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findBymanufacturer(
                    manufName, paginator)
                
                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
        }

    public getByModelName = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const modelName = req.params.modelName
            const paginator = this.paginate(req)

            try {
                const products = await this.dal.findByModelName(
                    modelName, paginator)
                
                this.respondWithFoundResource(products, res)
            } catch (error) {
                next(error)
            } 
    }

    public updateOne = async(
        req: Request, res: Response, next: NextFunction
        ) =>{

            const productId = req.params.id
            
            const productData: IProduct = req.body
            try { 
                const id = await this.dal.findByIdAndUpdate(
                    productId, productData)

                if(id){
                    this.respondWithUpdatedResource(id, res)
                } else {
                    const newProductId = await this.dal.createNew(
                        productData)
                    this.respondWithCreatedResource(res, newProductId)
                }                 
            } catch (error) {
                next(error)
            }   
    }

    private respondWithUpdatedResource = (id: string, res: Response) =>{
        res.location(`/products/${id}`)
        res.status(200).json({ message: 'Updated' })
    }


    public modifyOne = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const productId = req.params.id
            
            const patchData = req.body
            try {
                const id = await this.dal.findByIdAndUpdate(
                    productId, patchData)

                if(id)
                    this.respondWithModifiedResource(id, res)
                
            this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
        }

    private respondWithModifiedResource = (
        productId: string, res: Response
        ) =>{
            res.location(`/products/${productId}`)
            res.status(200).json({ message: 'Modified' })
    }

    public deleteOne = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const productId = req.params.id

            try {
                const deletedProduct = await this.dal.findByIdAndDelete(
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