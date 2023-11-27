import { body } from "express-validator"

class Validator{
    
    public validateObjectId = (fieldName: string) =>{
        return body(fieldName).trim().notEmpty().escape()
            .matches(/^[a-fA-F0-9]{24}$/)
    }

    public validateName = (fieldName: string) =>{
        return body(fieldName).trim().notEmpty().escape()
            .isLength({min: 2, max: 100 })
    }

    public validateNumber = (fieldName: string) =>{
        return body(fieldName).trim().notEmpty().escape()
            .isNumeric()
    }
}

export const validator = new Validator()