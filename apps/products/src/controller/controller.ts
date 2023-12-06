import { BaseController } from "../z-library/bases/controller"
import { Controllable } from "../z-library/bases/controllable"
import { NextFunction, Request, Response } from "express"
import { ProductsDAL } from "../data-access/data-access"
import { Product } from "../data-access/model"
import { PriceRange, formatter } from "../z-library/formatting/formatter"

export class ProductsController extends BaseController implements Controllable{

    private dataAccess: ProductsDAL

    constructor(dataAccessLayer: ProductsDAL){
        super()
        this.dataAccess = dataAccessLayer
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const productData: Product = req.body

        try {
            const productId = await this.dataAccess.createNew(productData)
            this.respondWithCreatedResource(productId, res)
        } catch (error) {
            next(error)
        }
    }
    
    public getOne =async (req:Request, res: Response, next: NextFunction) => {

        const productId  = req.params.id

        try {
            const product = await this.dataAccess.findByReferenceId(productId)

            if(product)
                this.respondWithFoundResource(product, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }

    public getMany= async(req: Request, res: Response, next: NextFunction)=>{

        const paginator = this.paginate(req)
        
        try {
            const products = await this.dataAccess.findWithPagination(paginator)
            this.respondWithFoundResource(products, res)
        } catch (error) {
            next(error)
        } 
    } 

    public getByPriceRange = async(req: Request, res: Response, next: NextFunction
        ) =>{

        const rangeString = req.params.range
        const priceRange: PriceRange = formatter.extractPriceRange(rangeString)
        const pagination = this.paginate(req)

        try {
            const products = await this.dataAccess.findByPriceRange(priceRange, 
                pagination)
            this.respondWithFoundResource(products, res)                
        } catch (error) {
            next(error)
        }
    }

    public getByCategory = async(req: Request, res: Response, next: NextFunction
        ) =>{

        const category = req.params.categoryName        
        const paginator = this.paginate(req)

        try {
            const products = await this.dataAccess.findByCategory(
                category, paginator)

            this.respondWithFoundResource(products, res)
        } catch (error) {
            next(error)
        }
    }

    public getByBrand = async(req: Request, res: Response, next: NextFunction) =>{

        const brandName = req.params.brandName
        const paginator = this.paginate(req)

        try {
            const products = await this.dataAccess.findByBrand(brandName, paginator)
            this.respondWithFoundResource(products, res)
        } catch (error) {
            next(error)
        } 
    }
    
    public getByManufacturer = async(req: Request, res: Response, next: NextFunction
        ) =>{

        const manufName = req.params.manufacturerName
        const paginator = this.paginate(req)

        try {
            const products = await this.dataAccess.findBymanufacturer(manufName, 
                paginator)
            this.respondWithFoundResource(products, res)
        } catch (error) {
            next(error)
        } 
    }

    public getByModelName = async(req: Request, res: Response, next: NextFunction
        ) =>{

        const modelName = req.params.modelName
        const paginator = this.paginate(req)

        try {
            const products = await this.dataAccess.findByModelName(modelName, 
                paginator)
            
            this.respondWithFoundResource(products, res)
        } catch (error) {
            next(error)
        } 
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const productId = req.params.id
        const productData: Product = req.body
        
        try { 
            const id = await this.dataAccess.findByIdAndUpdate(productId, 
                productData)

            if(id){
                this.respondWithUpdatedResource(id, res)
            } else {
                const newProductId = await this.dataAccess.createNew(productData)
                this.respondWithCreatedResource(newProductId, res)
            }                 
        } catch (error) {
            next(error)
        }   
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const productId = req.params.id
        const patchData = req.body

        try {
            const id = await this.dataAccess.findByIdAndUpdate(productId, 
                patchData)

            if(id)
                this.respondWithModifiedResource(id, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) =>{

        const productId = req.params.id

        try {
            const deletedProduct = await this.dataAccess.findByIdAndDelete(
                productId)
            
            if(deletedProduct)
                this.respondWithDeletedResource(deletedProduct.id, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }
}