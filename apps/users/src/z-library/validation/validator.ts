import { 
    ValidationChain, body, param, validationResult 
} from 'express-validator'
import { Response, Request, NextFunction } from 'express'

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

    public validateReferenceId = (paramName: string): ValidationChain =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }

    public handleValidationErrors = (req: Request, res: Response, next: NextFunction) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                message: 'Invalid input',
                errors: errors.array()
            })
        } else{
            next()
        }
    }
}
