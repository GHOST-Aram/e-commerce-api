import { body } from "express-validator"
class Validator{

    validateRequiredField = (fieldName: string) =>{
        return body(fieldName).trim()
            .escape()
            .notEmpty()
            .withMessage(`${fieldName} field is required`)
    }
}

export const validator = new Validator()