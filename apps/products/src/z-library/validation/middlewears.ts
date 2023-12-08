import { validator } from "./validator"

export const productValidators = [
    validator.validateNameField('name')
        .notEmpty()
        .withMessage(`Name field is required`),

    validator.validateUrlField('image_url')
        .notEmpty()
        .withMessage('Image url is required'),

    validator.validateFileField('image_file'),

    validator.validateNameField('brand')
        .notEmpty()
        .withMessage(`Brand field is required`),

    validator.validateNameField('manufacturer')
        .notEmpty()
        .withMessage(`Manufacturer field is required`),

    validator.validateNameField('model')
        .optional(),

    validator.validateNameField('category')
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

    validator.validateSpecificationsField('specifications')
        .trim().optional().escape(),
]

export const patchValidators = [
    validator.validateNameField('name')
        .optional(),

    validator.validateUrlField('image_url')
        .optional(),

    validator.validateFileField('image_file'),
    validator.validateNameField('brand')
        .optional(),

    validator.validateNameField('manufacturer')
        .optional(),

    validator.validateNameField('model')
        .optional(),

    validator.validateNameField('category')
        .optional(),

    validator.validateNumberField('selling_price')
        .optional(),

    validator.validateNumberField('marked_price')
        .optional(),

    validator.validateNumberField('available_units')
        .optional(),

    validator.validateSpecificationsField('specifications')
        .optional(),

]

export const validateReferenceId = [
    validator.validateReferenceId('id')
]