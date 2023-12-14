import { Validator } from "../z-library/validators/validator";
import { body } from "express-validator";

class PaymentValidator extends Validator{
    public validateReceiptNumber = (fieldName: string) =>{
        return body(fieldName).isAlphanumeric()
            .withMessage(`${fieldName} must be alphanumeric`)
    }
}

export const validator = new PaymentValidator()