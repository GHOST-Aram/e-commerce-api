import { body, param, validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"
import { isValidObjectId } from "mongoose"

export class Validator{
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
            .custom(this.validateIds)
            .withMessage(
                `${fieldName} ${this.message} array`)
    }

    private validateIds = (objectIds:string[]) =>{
        if(!Array.isArray(objectIds))
            return false

        return objectIds.every(id =>{
            return isValidObjectId(id)
        })
    }

    public validateReferenceId = (paramName: string) =>{
        return param(paramName).matches(/^[a-fA-F0-9]{24}$/)
            .withMessage('Invalid reference Id')
    }

    public handleValidationErrors = (req: Request, res: Response, next: NextFunction
        ) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                    message: 'Invalid input or reference Id',
                    errors: errors.array()
                })
        } else
            next()
    }
}
