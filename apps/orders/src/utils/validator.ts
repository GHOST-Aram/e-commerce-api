import { Validator } from "../z-library/validation/validator";
import { body, ValidationChain } from "express-validator";

class OrderValidator extends Validator{
    public validateItems = (field: string): ValidationChain =>{
        return body(field).notEmpty()
        .withMessage('Items field is required.')
        .isArray({ min: 1})
        .withMessage('Items must be an array.')
        .custom(items =>{
            if(Array.isArray(items)){
                return items.every((item: object)=>{
                    return item.hasOwnProperty('productId') &&
                        item.hasOwnProperty('name') && 
                        item.hasOwnProperty('price') &&
                        item.hasOwnProperty('quantity')
                })
            }
        })
    }
}

export const validator = new OrderValidator()