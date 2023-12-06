import { validator } from "./validator";

export const orderDataValidators = [
    validator.validateObjectId('placedBy').notEmpty(),
    validator.validateName('item.name').notEmpty(),
    validator.validateNumber('item.quantity').notEmpty(),
    validator.validateNumber('item.price').notEmpty(),
    validator.validateObjectId('item.productId').notEmpty(),
]

export const updateValidators = [
    ...orderDataValidators.map(validator => validator.optional()),
    validator.validateReferenceId('orderId'),
]
