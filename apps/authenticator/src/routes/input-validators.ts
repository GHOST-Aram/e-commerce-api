import { validator } from "../utils/validator";

export const validateLoginInput = [
    validator.validateEmail('email'),
    validator.validatePassword('password')
]