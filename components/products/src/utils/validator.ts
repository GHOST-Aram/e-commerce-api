import { ValidationChain, body } from "express-validator"
export class Validator{
    public validateName(fieldName: string): ValidationChain{
        return body(fieldName).notEmpty()
            .withMessage('Name field is required')
            .matches(/^.{2,100}$/)
            .withMessage('Name must be a 2-50 characters long')
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

    public validateBrand(fieldName: string): ValidationChain{
        return body(fieldName).notEmpty()
            .withMessage('Brand field is required')
            .matches(/^.{2,100}$/gi)
            .withMessage('Brand must be between 2 - 100 chars long')
            .trim()
            .escape()
    }

    public validateManufacturer(fieldName: string):ValidationChain{
        return  body(fieldName).notEmpty()
            .withMessage('Manufacturer field is required')
            .matches(/^.{2,100}$/ig)
            .withMessage('Manufacturer name must be 2 - 100 chars long')
            .trim()
            .escape()
    }

    public validateModel(fieldName: string): ValidationChain{
        return  body(fieldName).notEmpty()
            .withMessage('Model field is required')
            .matches(/^.{2,100}$/ig)
            .withMessage('Model field must be 2 -100 chars long')
            .trim()
            .escape()
    }

    public validateCategory(fieldName: string):ValidationChain{
        return body(fieldName).notEmpty()
            .withMessage('Category field is required')
            .matches(/^.{2,100}$/ig)
            .trim()
            .escape()
    }

    public validateSellingPrice(fieldName: string):ValidationChain{
        return body(fieldName).notEmpty()
            .withMessage('Selling Price field is required')
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage('Selling price must be greater than 1')
    }

    public validateMarkedPrice(fieldName: string):ValidationChain{
        return body(fieldName).notEmpty()
            .withMessage('Marked Price field is required')
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage('Marked price must be greater that 1')
    }

    public validateAvailabeUnits(fieldName: string):ValidationChain{
        return body(fieldName).notEmpty()
            .withMessage('Availabe units field is required')
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) >= 1
            })
            .withMessage('Availabe units must be greater or equal to one')
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
    validator.validateBrand('brand'),
    validator.validateManufacturer('manufacturer'),
    validator.validateModel('model'),
    validator.validateCategory('category'),
    validator.validateSellingPrice('selling_price'),
    validator.validateMarkedPrice('marked_price'),
    validator.validateAvailabeUnits('available_units'),
    validator.validateSpecifications('specifications'),
]