import { validator } from "../utils/validator"
const required = 'Field is required'

export const postValidators = [
    validator.validateObjectId('orderId').notEmpty()
        .withMessage(`orderId ${required}`),
    
    validator.validateName('processor').notEmpty()
        .withMessage(`Processor ${required}`),

    validator.validateReceiptNumber('receipt_number').notEmpty()
        .withMessage(`Receipt number ${required}`),

    validator.validateNumber('amount').notEmpty().withMessage(
        `Amount ${`${required}`}`),

    validator.validateName('currency').notEmpty().withMessage(
        `Currency ${required}`),

    validator.validateNumber('transaction_date').notEmpty()
        .withMessage(`Transaction Date ${required}`),

    validator.validateNumber('account_number').notEmpty()
        .withMessage(`Account Number ${required}`)
]

export const referenceIdValidator = [
    validator.validateReferencId('orderId')
]

export const patchValidators = [
    validator.validateObjectId('orderId').optional(),
    validator.validateName('processor').optional(),
    validator.validateReceiptNumber('receipt_number').optional(),
    validator.validateNumber('amount').optional(),
    validator.validateName('currency').optional(),
    validator.validateNumber('transaction_date').optional(),
    validator.validateNumber('account_number').optional()
]