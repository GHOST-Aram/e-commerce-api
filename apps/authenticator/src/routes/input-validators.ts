import { validator } from "../z-library/validation/validator";

export const validateLoginInput = [
    validator.validateEmail('email'),
    validator.validatePassword('password')
]