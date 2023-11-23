import { validator } from "./validator"

export const productValidators = [
    validator.validateName('name'),
    validator.validateUrl('image_url'),
    validator.validateFileField('image_file'),
    validator.validateName('brand'),
    validator.validateName('manufacturer'),
    validator.validateName('model'),
    validator.validateName('category'),
    validator.validateNumberField('selling_price'),
    validator.validateNumberField('marked_price'),
    validator.validateNumberField('available_units'),
    validator.validateSpecifications('specifications'),
]