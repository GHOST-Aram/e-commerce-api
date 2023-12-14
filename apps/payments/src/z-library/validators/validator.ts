import { body, param, validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"

export class Validator{
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


    public validateReferencId = (paramName: string ) =>{
        return param(paramName).trim().matches(
            /^[a-fA-F0-9]{24}$/)
            .withMessage(`${paramName} ${this.idValidationMessage}`)
    }

    public handleValidationErrors = (req: Request, res: Response, next:NextFunction) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                message: 'Invalid Input or reference Id',
                errors: errors.array()
            })
        } else {
            next()
        }

    }
}