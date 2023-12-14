import { Validator } from "../z-library/validation/validator";
import { body } from "express-validator";

class AuthValidator extends Validator{
    public validateEmail = (field: string) =>{
        return body(field).trim().notEmpty().withMessage('Email is required')
            .escape()
    }

    public validatePassword = (field: string) =>{
        return body(field).trim()
            .notEmpty().withMessage('Password is required')
            .isAlphanumeric().withMessage('Password must be alphanumerice')
            .isLength({ min: 8, max: 24 }).withMessage('Password must be 8 - 24 chars long')
    }
}

export const validator = new AuthValidator()