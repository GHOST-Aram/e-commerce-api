import { body, param } from "express-validator"
import { isValidObjectId } from "mongoose"
import { validationResult, ValidationChain } from "express-validator"
import { Response, Request, NextFunction } from "express"

class Validator{
    
    public validateObjectId = (fieldName: string) =>{
        return body(fieldName).trim().escape()
            .matches(/^[a-fA-F0-9]{24}$/)
            
    }

    public validateName = (fieldName: string) =>{
        return body(fieldName).trim().escape()
            .isLength({min: 2, max: 100 })
    }

    public validateNumber = (fieldName: string) =>{
        return body(fieldName).trim().escape()
            .isNumeric()
    }

    public validateReferenceId = (paramName: string) =>{
        return param(paramName).trim().escape()
            .matches(/^[a-fA-F0-9]{24}$/)
            .custom((value) => isValidObjectId(value))
            .withMessage('Invalid reference Id')
            
    }

    public validateItems = (): ValidationChain =>{
        return body('items').notEmpty()
        .withMessage('Items field is required.')
        .isArray({ min: 1})
        .withMessage('Items must be an array.')
        .custom(items =>{
            if(Array.isArray(items)){
                return items.every((item: object)=>{
                    return item.hasOwnProperty('productId') &&
                        item.hasOwnProperty('name') && 
                        item.hasOwnProperty('price') &&
                        item.hasOwnProperty('quantity')
                })
            }
        })
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Invalid Input' 
                })
            } else {
                next()
            }
    }
}

export const validator = new Validator()