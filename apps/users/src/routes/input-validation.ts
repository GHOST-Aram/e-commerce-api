import { validator } from "../utils/validator";

export const userValidators = [
    validator.validateRequiredField('first_name'),
    validator.validateRequiredField('last_name'),
    validator.validateRequiredField('password'),
    validator.validateRequiredField('email')
]

export const patchValidators = [
    validator.validateOptionalField('first_name'),
    validator.validateOptionalField('last_name'),
    validator.validateOptionalField('email'),
    validator.validateRequiredField('password')
]