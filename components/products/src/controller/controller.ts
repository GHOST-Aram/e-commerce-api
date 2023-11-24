import { NextFunction, Request, Response } from "express"
import { Paginator, ProductsDAL } from "../data-access/data-access"
import { HydratedProductDoc, IProduct } from "../data-access/model"
import { validationResult } from "express-validator"
import { PriceRange, formatter } from "../utils/formatter"
import { validator } from "../utils/validator"

export class ProductsController{
    private dal

    constructor(dataAccessLayer: ProductsDAL){
        this.dal = dataAccessLayer
    }

    public AddNewProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            this.handleValidationErrors(req, res)

            const productData: IProduct = req.body
            try {
                const productId = await this.dal.createNewProduct(
                    productData)
                this.respondWithCreatedResource(res, productId)
            } catch (error) {
                next(error)
            }
        }

    private handleValidationErrors = (
        req: Request,
        res: Response 
        ) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({
                    message: 'Invalid input',
                    errors: errors.array()
                })
            } 
        }

    private respondWithCreatedResource = (
        res: Response, 
        productId: string
        ) =>{
            res.location(`/products/${productId}`)
            res.status(201).json({ message: 'Created'})
        }

    public deleteAll = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed' })
    }

    public deleteOneProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const productId = req.params.id
            this.handleInvalidId(productId, res)

            try {
                const deletedProduct = await this.dal.findProductByIdAndDelete(
                    productId)
                
                if(deletedProduct)
                    this.respondWithDeletedResource(deletedProduct, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
        }

    private handleInvalidId = (productId: string, res: Response) =>{
        if(!validator.isValidId(productId)){
            res.status(400).json({ message: 'Invalid id'})
        }
    }

    private respondWithDeletedResource = (
        deletedProduct: HydratedProductDoc, res: Response
        ) =>{
            res.status(200).json({
                message: 'Deleted',
                product: deletedProduct
            })
        }

    private respondWith404Error = (res: Response) =>{
        res.status(404).json(
            { message: 'Product not found' })
    }
    
    public getOneProduct =async (
        req:Request, res: Response, next: NextFunction
        ) => {
            const productId  = req.params.id
            this.handleInvalidId(productId, res)

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

    private respondWithFoundResource = (
        resource: HydratedProductDoc[] | HydratedProductDoc, 
        res: Response
        ) =>{
            if(Array.isArray(resource)){
                res.status(200).json({ products: resource })
            }
            else{
                res.status(200).json({ product: resource })
            }
        }

    public getProductsByBrand = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const brandName = req.params.brandName
            this.handleInvalidName('brand', brandName, res)

            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsByBrand(
                    brandName, paginator)
                
                if(products.length > 0)
                    this.respondWithFoundResource(products, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            } 
        }
    
    private handleInvalidName = (
        property: string, value: string, res: Response
        ) =>{
            if(!validator.isValidNameFormat(value)){
                res.status(400).json(
                    { message: `Invalid ${property} name`})
            }
        }

    public getProductsByManufacturer = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const manufName = req.params.manufacturerName
            this.handleInvalidName('manufacturer', 
                manufName, res)

            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsBymanufacturer(
                    manufName, paginator)
                
                if(products.length > 0)
                    this.respondWithFoundResource(products, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            } 
        }

    public getProductsByModel = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const modelName = req.params.modelName
            this.handleInvalidModel(modelName, res)
            
            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsByModel(
                    modelName, paginator)
                
                if(products.length > 0)
                    this.respondWithFoundResource(products, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            } 
        }

    private handleInvalidModel = (
        model: string, res: Response) =>{
        if(!validator.isValidModelName(model)){
            res.status(400).json({ message: 'Invalid model name'})
        }
    }

    public getProductsByPriceRange = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const rangeString = req.params.range
            const priceRange: PriceRange = formatter
                .extractPriceRange(rangeString)
            this.handleInvalidPriceRange(priceRange, res)    
                
            const pagination = this.paginate()
            try {
                const products = await this.dal
                    .findProductsByPriceRange(priceRange, 
                        pagination)
        
                if(products.length > 0)
                    this.respondWithFoundResource(products, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
        }
    
    private handleInvalidPriceRange = (
        priceRange: PriceRange, res: Response
        ) =>{
        if(priceRange.start === null || priceRange.start === null){
            res.status(400).json({ message: 'Invalid range'})
        }
    }
    public getProductsByCategory = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const category = req.params.categoryName
            this.handleInvalidName('category', category, res)        
            
            const paginator = this.paginate(req)
            try {
                const products = await this.dal.findProductsByCategory(
                    category, paginator)

                if(products.length > 0)
                    this.respondWithFoundResource(products, res)
                
                this.respondWith404Error(res)
            } catch (error) {
                next(error)
            }
        }

    public modifyAllProducts = (req: Request, res: Response) =>{
        this.handleValidationErrors(req, res)
        res.status(405).json({ message: 'Method not allowed'})
    }

    public modifyOneProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            this.handleValidationErrors(req, res)

            const productId = req.params.id
            this.handleInvalidId(productId, res)
            
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

    public updateAllProducts = (req: Request, res: Response) =>{
        this.handleValidationErrors(req, res)
        res.status(405).json({message: 'Method not allowed'})
    }

    public updateOneProduct = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            this.handleValidationErrors(req, res)

            const productId = req.params.id
            this.handleInvalidId(productId, res)
            
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
}