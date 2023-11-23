import { NextFunction, Request, Response } from "express"
import { ProductsDAL } from "../data-access/data-access"
import { IProduct } from "../data-access/model"
import { validationResult } from "express-validator"
import { isValidObjectId } from "mongoose"
export class ProductsController{
    private dal

    constructor(dataAccessLayer: ProductsDAL){
        this.dal = dataAccessLayer
    }

    public AddNewProduct = async(
            req: Request, res: Response, next: NextFunction
    ) =>{
        const productData: IProduct = req.body
        const errors = validationResult(req)

        if(errors.isEmpty()){

            try {
            
                const productId = await this.dal.createNewProduct(productData)

                res.location(`/products/${productId}`)
                res.status(201).json({ message: 'Created'})

            } catch (error) {
                console.log(error)
                next(error)
            }
        } else {
            res.status(400).json({
                message: 'Invalid input',
                errors: errors.array()
            })
        }
    }

    public getOneProduct =async (
        req:Request, res: Response, next: NextFunction
    ) => {
        const productId  = req.params.id

        if(!isValidObjectId(productId)){
            res.status(400).json({ message: 'Invalid Product ID'})
        }

        try {
            const product = await this.dal.findProductById(productId)

            if(product === null){
                res.status(404).json({ 
                        message : 'not found'
                    })
            } else {
                res.status(200).json({ product })
            }
        } catch (error) {
            next(error)
        }
    }

    public getProducts= async(
        req: Request, res: Response, next: NextFunction
    )=>{
        try {
            const paginator = this.paginate(req)
           

            const products = await this.dal.findProducts(paginator)

            res.status(200).json({ products })
        } catch (error) {
            next(error)
        }
        
    } 
    
    private paginate = (req: Request) =>{
        let page:number = 1
        let limit: number = 10

        if(typeof req.query.page === 'string'){
            page = Math.abs(parseInt(req.query.page))
        }

        if(typeof req.query.limit === 'string'){
            limit = Math.abs(parseInt(req.query.limit))
        }

        const skipDocs = (page - 1) * limit
        return ({
            skipDocs, limit
        })
    }

    public getProductsByBrandName = async(
        req: Request, res: Response, next: NextFunction
    ) =>{
        const brandName = req.params.brandName
       
        const paginator = this.paginate(req)
           
        if(!this.isValidBrandName(brandName)){
            res.status(400).json({ message: 'Invalid brand name'})
        }

        try {
            const products = await this.dal.findProductsByBrandName(
                brandName, paginator
            )
            
            if(products.length < 1){
                res.status(404).json({
                    message: 'Brand products not found'
                })
            }

            res.status(200).json({ products })
        } catch (error) {
            next(error)
        } 
    }

    private isValidBrandName = (brandName: string) =>{
        return /^[a-zA-Z\s]{2,100}$/.test(brandName)
    }
}