import { ValidationChain, body, param } from "express-validator"
import { formatter } from "./formatter"

export class Validator{
    public validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }

    public validateName(fieldName: string): ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName)
            .matches(/^.{2,100}$/)
            .withMessage(`${formattedName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }

    public validateReferenceName = (paramName: string) =>{
        return param(paramName)
            .matches(/^[a-z0-9]{2,100}$/i)
            .withMessage(`${paramName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }

    public validateUrl(fieldName: string): ValidationChain{
        return  body(fieldName)
    }

    public validateFileField(fieldName: string): ValidationChain{
        return body(fieldName).optional()
    }


    public validateNumberField(fieldName: string):ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName)
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage(`${formattedName} must be greater than 1`)
    }

    public validateSpecifications(fieldName: string): ValidationChain{
        return  body(fieldName)
            .isArray()
            .withMessage('Specifications field must be an array')
            .escape()
    }

    public validatePriceRange = (paramName: string) =>{
        return param(paramName).custom((value) =>{
            const { start, end } = formatter.convertToNumbers(value)
    
            if(typeof start === 'number' && typeof end === 'number'){
                if(start < end)
                    return true
                else if( end < start)
                    return true
            }
            return false
        })
    }
}
export const validator = new Validator()
