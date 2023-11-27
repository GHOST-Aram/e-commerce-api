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

    public validateBooleanField = (fieldName: string) =>{
        return body(fieldName).escape()
            .withMessage(`${fieldName} is required`)
            .isBoolean()
            .withMessage(`${fieldName} can only be true or false`)
    }

    public validateDateField = (fieldName: string) =>{
        return body(fieldName).escape()
            .withMessage(`${fieldName} is required`)
            .isDate()
            .withMessage(`${fieldName} must be a valid Date`)
    }

    public validateBooleanField = (fieldName: string) =>{
        return body(fieldName).escape()
            .notEmpty().withMessage(`${fieldName} is required`)
            .isBoolean()
            .withMessage(`${fieldName} can only be true or false`)
    }

    public validateDateField = (fieldName: string) =>{
        return body(fieldName).escape()
            .notEmpty().withMessage(`${fieldName} is required`)
            .isDate()
            .withMessage(`${fieldName} must be a valid Date`)
    }
}


export const validator = new Validator()