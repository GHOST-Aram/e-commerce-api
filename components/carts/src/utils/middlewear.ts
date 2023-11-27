import { validator } from "./validator";

export const initialInputValidators = [
    validator.validateObjectId('customer'),
    validator.validateObjectIDArray('items')
]

export const validateUpdateData = [
    validator.validateObjectIDArray('items')
]