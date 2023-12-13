import { validator } from "./validator";

export const validateLoginInput = [
    validator.validateEmail('email'),
    validator.validatePassword('password')
]