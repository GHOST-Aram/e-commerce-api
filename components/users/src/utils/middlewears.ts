import { validator } from "./validator";

export const userValidators = [
    validator.validateRequiredField('first_name'),
    validator.validateRequiredField('last_name'),
    validator.validateRequiredField('password'),
    validator.validateRequiredField('email')
]