import { body } from "express-validator"

class Validator{
    private idValidationMessage = 'must be a hexadecimal string '+
        'of length 24'
    
    private nameLengthValidationMsg = 
        'must be string btw 2 to 100 characters long'
    
    private numberValiditionMessage = 'must be numeric'

    public validateObjectId = (fieldName: string) =>{
        return body(fieldName).trim().escape()
            .matches(/^[a-fA-F0-9]{24}$/)
            .withMessage(`${fieldName} ${this.idValidationMessage}`)
    }

    public validateName = (fieldName: string) =>{
        return body(fieldName).trim()
            .isLength({ min: 2, max: 100})
            .withMessage(
                `${fieldName} ${this.nameLengthValidationMsg}`)
            .escape()
    }

    public validateNumber = (fieldName: string) =>{
        return body(fieldName).isNumeric()
            .withMessage(
                `${fieldName} ${this.numberValiditionMessage}`)
    }

    public validateAlphanumeric = (fieldName: string) =>{
        return body(fieldName).isAlphanumeric()
            .withMessage(`${fieldName} must be alphanumeric`)
    }

}

export const validator = new Validator()