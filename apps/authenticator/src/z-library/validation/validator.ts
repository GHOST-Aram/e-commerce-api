import { body } from "express-validator"
import { validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"

export class Validator{

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
