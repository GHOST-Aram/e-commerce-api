import { body, param } from "express-validator"
import { isValidObjectId } from "mongoose"
import { validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"

class Validator{
    
    public validateEmail = () =>{
        return body('email').trim().notEmpty().withMessage('Email is required')
            .escape()
    }

    public validatePassword = () =>{
        return body('password').trim()
            .notEmpty().withMessage('Password is required')
            .isAlphanumeric().withMessage('Password must be alphanumerice')
            .isLength({ min: 8, max: 24 }).withMessage('Password must be 8 - 24 chars long')
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Invalid Input' 
                })
            } else {
                next()
            }
    }
}

export const validator = new Validator()