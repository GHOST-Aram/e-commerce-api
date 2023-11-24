import { ValidationChain, body } from 'express-validator'

export class Validator {

    public validateRequiredField = (fieldName: string): ValidationChain =>{
        return body(fieldName).trim()
            .escape().notEmpty()
            .withMessage(`${fieldName} field is required`)
    }


}

export const validator = new Validator()