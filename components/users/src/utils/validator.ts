import { ValidationChain, body, param } from 'express-validator'

export class Validator {

    public validateRequiredField = (fieldName: string): ValidationChain =>{
        return body(fieldName).trim()
            .escape().notEmpty()
            .withMessage(`${fieldName} field is required`)
    }

    public validateOptionalField = (fieldName: string): ValidationChain =>{
        return body(fieldName).trim()
            .escape().optional()
    }

    public validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }
}

export const validator = new Validator()