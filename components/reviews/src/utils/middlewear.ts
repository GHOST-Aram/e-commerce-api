import { validator } from "./validator";

export const newReviewInputValidators = [
    validator.validateRequiredField('author'),
    validator.validateRequiredField('content'),
    validator.validateRequiredField('product')
]