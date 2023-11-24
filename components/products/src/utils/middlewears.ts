import { validator } from "./validator"

export const productValidators = [
    validator.validateName('name')
        .notEmpty()
        .withMessage(`Name field is required`),

    validator.validateUrl('image_url')
        .notEmpty()
        .withMessage('Image url is required'),

    validator.validateFileField('image_file'),

    validator.validateName('brand')
        .notEmpty()
        .withMessage(`Brand field is required`),

    validator.validateName('manufacturer')
        .notEmpty()
        .withMessage(`Manufacturer field is required`),

    validator.validateName('model')
        .notEmpty()
        .withMessage(`Model field is required`),

    validator.validateName('category')
        .notEmpty()
        .withMessage(`Category field is required`),

    validator.validateNumberField('selling_price')
        .notEmpty()
        .withMessage(`Selling price field is required`),

    validator.validateNumberField('marked_price')
        .notEmpty()
        .withMessage(`Marked price field is required`),

    validator.validateNumberField('available_units')
        .notEmpty()
        .withMessage(`Available units field is required`),

    validator.validateSpecifications('specifications')
        .notEmpty()
        .withMessage('Specifications field is required'),
]

export const patchValidators = [
    validator.validateName('name')
        .optional(),

    validator.validateUrl('image_url')
        .optional(),

    validator.validateFileField('image_file'),
    validator.validateName('brand')
        .optional(),

    validator.validateName('manufacturer')
        .optional(),

    validator.validateName('model')
        .optional(),

    validator.validateName('category')
        .optional(),

    validator.validateNumberField('selling_price')
        .optional(),

    validator.validateNumberField('marked_price')
        .optional(),

    validator.validateNumberField('available_units')
        .optional(),

    validator.validateSpecifications('specifications')
        .optional(),

]