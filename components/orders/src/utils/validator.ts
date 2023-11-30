import { body, param } from "express-validator"
import { isValidObjectId } from "mongoose"

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
}

export const validator = new Validator()