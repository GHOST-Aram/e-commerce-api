import { Validator } from "../z-library/validation/validator";
import { body, param, ValidationChain } from "express-validator";
import { formatter } from "../z-library/formatting/formatter";

export class ProductValidator extends Validator{
    public validatePriceRangeParam = (paramName: string) =>{
        return param(paramName).custom((value) =>{
            const { start, end } = formatter.convertToNumbers(value)
    
            if(typeof start === 'number' && typeof end === 'number'){
                if(start < end)
                    return true
                else if( end < start)
                    return true
            }
            return false
        })
    }

    public validateFileField(fieldName: string): ValidationChain{
        return body(fieldName).optional()
    }

    public validateSpecificationsField(fieldName: string): ValidationChain{
        return  body(fieldName)
            .isArray()
            .withMessage('Specifications field must be an array')
            .escape()
    }

    public validateImageUrl(fieldName: string): ValidationChain{
        return  body(fieldName)
    }

}

export const validator = new ProductValidator()