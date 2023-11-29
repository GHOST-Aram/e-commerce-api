import { body, param } from "express-validator"
class Validator{

    validateRequiredField = (fieldName: string) =>{
        return body(fieldName).trim()
            .escape()
            .notEmpty()
            .withMessage(`${fieldName} field is required`)
    }

    validateOptionalField = (fieldName: string) =>{
        return body(fieldName).trim()
            .escape()
    }

    validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }
}

export const validator = new Validator()