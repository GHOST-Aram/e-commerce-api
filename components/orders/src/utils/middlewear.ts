import { validator } from "./validator";

export const validateItem = [
    validator.validateObjectId('placedBy'),
    validator.validateName('item.name'),
    validator.validateNumber('item.quantity'),
    validator.validateNumber('item.price'),
    validator.validateObjectId('item.productId')
]
