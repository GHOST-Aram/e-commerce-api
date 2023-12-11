import { body } from 'express-validator' 

export const validateOrderInput = [
    body('items').trim().notEmpty()
        .withMessage('Items field is required.')
        .isArray({ min: 1})
        .withMessage('Items must be an array.')
        .escape(),

    body('ETA').optional().isDate().escape(),

    body('delivered').isBoolean()
        .withMessage('Field must be boolean')
        .optional(),

    body('cancelled').isBoolean()
        .withMessage('Cancelled must be boolean.')
        .optional(),

    body('pickupStation').trim()
        .notEmpty()
        .withMessage('Pick up station is required.')
        .escape()
]

export const validatePatchInput = [
    body('ETA').optional().isDate().escape()
        .withMessage('ETA must be a valid date.'),
    body('delivered').optional().isBoolean()
        .withMessage('Delivery status must be boolean.'),

    body('cancelled').optional().isBoolean()
        .withMessage('Cancellation status must be boolean.'),

    body('pickupStation').trim().optional()
        .escape()
]
