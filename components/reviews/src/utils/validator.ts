import { body } from "express-validator"
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
}

export const validator = new Validator()