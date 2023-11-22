import { NextFunction, Request, Response } from "express"
import { ProductsDAL } from "../data-access/data-access"
import { IProduct } from "../data-access/model"
import { validationResult } from "express-validator"
import { productValidators, validator } from "../utils/validator"
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
                res.status(403).json({
                    message: 'Invalid input',
                    errors: errors.array()
                })
            }
        }
}