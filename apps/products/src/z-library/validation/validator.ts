import { ValidationChain, body, param, validationResult } from "express-validator"
import { formatter } from "../formatting/formatter"
import { Request, Response, NextFunction } from "express"

export class Validator{
    public validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }

    public validateReferenceName = (paramName: string) =>{
        return param(paramName)
            .matches(/^[a-z0-9]{2,100}$/i)
            .withMessage(`${paramName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }

    
    public validateNameField(fieldName: string): ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName)
            .matches(/^.{2,100}$/)
            .withMessage(`${formattedName} must be a 2-50 characters long`)
            .trim()
            .escape()
    }

    public validateNumberField(fieldName: string):ValidationChain{
        const formattedName = formatter.formatFieldName(fieldName)

        return body(fieldName)
            .trim()
            .escape()
            .custom((value) =>{
                return Number(value) > 1
            })
            .withMessage(`${formattedName} must be greater than 1`)
    }


    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction 
        ) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({
                    message: 'Invalid input or referenceId',
                    errors: errors.array()
                })
            }  else {
                next()
            }
    }
}

