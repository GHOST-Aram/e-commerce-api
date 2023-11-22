import { ValidationChain, body } from "express-validator"
import { formatter } from "./formatter"
export class Validator{
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

export const productValidators = [
    validator.validateName('name'),
    validator.validateUrl('image_url'),
    validator.validateFileField('image_file'),
    validator.validateName('brand'),
    validator.validateName('manufacturer'),
    validator.validateName('model'),
    validator.validateName('category'),
    validator.validateNumberField('selling_price'),
    validator.validateNumberField('marked_price'),
    validator.validateNumberField('available_units'),
    validator.validateSpecifications('specifications'),
]