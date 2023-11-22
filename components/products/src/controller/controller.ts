import { NextFunction, Request, Response } from "express"
import { ProductsDAL } from "../data-access/data-access"
import { IProduct } from "../data-access/model"
import { body, validationResult } from "express-validator"

export class ProductsController{
    private dal

    constructor(dataAccessLayer: ProductsDAL){
        this.dal = dataAccessLayer
    }

    AddNewProduct = [
        body('name').notEmpty()
            .withMessage('Name field is required')
            .matches(/^.{2,100}$/)
            .withMessage('Name must be a 2-50 characters long')
            .trim()
            .escape(),
        
        body('image_url').notEmpty()
            .withMessage('Image url is required'),

        body('image_file').optional(),

        body('description').notEmpty()
            .withMessage('Description is required')
            .matches(/^.{50,1000}$/ig)
            .withMessage('Description must a string 50-1000 chars long')
            .trim()
            .escape(),
        
        body('brand').notEmpty()
            .withMessage('Brand field is required')
            .matches(/^.{2,100}$/gi)
            .withMessage('Brand must be between 2 - 100 chars long')
            .trim()
            .escape(),
        
        body('manufacturer').notEmpty()
            .withMessage('Manufacturer field is required')
            .matches(/^.{2,100}$/ig)
            .withMessage('Manufacturer name must be 2 - 100 chars long')
            .trim()
            .escape(),
            

        body('model').notEmpty()
            .withMessage('Model field is required')
            .matches(/^.{2,100}$/ig)
            .withMessage('Model field must be 2 -100 chars long')
            .trim()
            .escape(),
        
        body('category').notEmpty()
            .withMessage('Category field is required')
            .matches(/^.{2,100}$/ig)
            .trim()
            .escape(),

        body('selling_price').notEmpty()
            .withMessage('Selling Price field is required')
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage('Selling price must be greater than 1'),

        body('marked_price').notEmpty()
            .withMessage('Marked Price field is required')
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage('Marked price must be greater that 1'),

        body('available_units').notEmpty()
            .withMessage('Availabe units field is required')
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) >= 1
            })
            .withMessage('Availabe units must be greater or equal to one'),

        body('specifications').notEmpty()
            .withMessage('Specifications field is required')
            .isArray()
            .withMessage('Specifications field must be an array')
            .escape(),
        
        async(
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
                errors.array().forEach(element => {
                    console.log(element)
                });
                res.status(403).json({
                    message: 'Invalid input',
                    errors: errors.array()
                })
            }


        }
    ]
}