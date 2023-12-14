import { body, param } from "express-validator"
import { isValidObjectId } from "mongoose"
import { validationResult, ValidationChain } from "express-validator"
import { Response, Request, NextFunction } from "express"

export class Validator{

    public validateRequiredField = (field: string) =>{
        return body(field).trim()
            .notEmpty()
            .withMessage(`${field} field is required.`)
            .escape()
    }

    public validateOptionalField = (field: string) =>{
        return body(field).optional().escape()
    }

    public validateOptionalBooleanField = (field: string) =>{
        return body(field).isBoolean()
            .withMessage(`${field} field must be boolean`)
            .optional()
    }
    
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
