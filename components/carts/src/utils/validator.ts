import { body, param, validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"
import { isValidObjectId } from "mongoose"

class Validator{
    private message = 'must be an hexadecimal of length 24'

    public validateObjectId = (fieldName: string) =>{
        return body(fieldName).notEmpty()
            .withMessage(`${fieldName} is required`)
            .matches(/[a-fA-F0-9]{24}/)
            .withMessage(
                `${fieldName} ${this.message}`)
    }

    public validateObjectIDArray = (fieldName: string) =>{
        return body(fieldName).notEmpty()
            .withMessage(`${fieldName} is required`)
            .custom((values:string[]) =>{
                if(!Array.isArray(values))
                    return false

                return values.every(id =>{
                    return isValidObjectId(id)
                })
            })
            .withMessage(
                `${fieldName} ${this.message} array`)
    }

    public validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json(
                    {
                        message: 'Invalid input',
                        errors: errors.array()
                    }
                )
            } else
                next()
    }
}

export const validator = new Validator()