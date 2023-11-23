import { ValidationChain, body } from "express-validator"
import { formatter } from "./formatter"
import { isValidObjectId } from "mongoose"

export class Validator{
    public isValidNameFormat = (name: string) =>{
        return /^[a-zA-Z\s]{2,100}$/.test(name)
    }

    public isValidModelName = (modelName: string) => {
        return /^\w{2,100}/.test(modelName) 
    }

    public isValidId = (id: string): boolean =>{
        return isValidObjectId(id)
    }
    
    public validateName(fieldName: string): ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName).notEmpty()
            .withMessage(`${formattedName} field is required`)
            .matches(/^.{2,100}$/)
            .withMessage(`${formattedName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }

    public validateUrl(fieldName: string): ValidationChain{
        return  body(fieldName).notEmpty()
                .withMessage('Image url is required')
    }

    public validateFileField(fieldName: string): ValidationChain{
        return body(fieldName).optional()
    }


    public validateNumberField(fieldName: string):ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName).notEmpty()
            .withMessage(`${formattedName} field is required`)
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage(`${formattedName} must be greater than 1`)
    }

    public validateSpecifications(fieldName: string): ValidationChain{
        return  body(fieldName).notEmpty()
            .withMessage('Specifications field is required')
            .isArray()
            .withMessage('Specifications field must be an array')
            .escape()
    }
}
export const validator = new Validator()
