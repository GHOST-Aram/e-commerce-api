import { body, param, validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"

export class Validator{

    validateRequiredField = (fieldName: string) =>{
        return body(fieldName).trim().escape().notEmpty()
            .withMessage(`${fieldName} field is required`)
    }

    validateOptionalField = (fieldName: string) =>{
        return body(fieldName).trim().escape()
    }

    validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }

    public handleValidationErrors = (req: Request, res: Response, 
        next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({ 
                    message: 'Invalid input',
                    errors: errors.array()
                })
            } else {
                next()
            }
    }
}