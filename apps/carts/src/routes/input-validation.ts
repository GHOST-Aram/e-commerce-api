import { validator } from "../z-library/validators/validator";

export const initialInputValidators = [
    validator.validateObjectId('customer'),
    validator.validateObjectIDArray('items')
]

export const updateInputValidator = [
    validator.validateObjectIDArray('items')
]

export const patchDataValidator = [
    validator.validateObjectId('item')
]