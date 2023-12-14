import { validator } from '../z-library/validation/validator'

export const validateOrderInput = [
    validator.validateItems('items'),
    validator.validateOptionalField('ETA'),
    validator.validateOptionalBooleanField('delivered'),
    validator.validateOptionalBooleanField('cancelled'),
    validator.validateRequiredField('pickupStation')
]

export const validatePatchInput = [
    validator.validateOptionalField('ETA'),
    validator.validateOptionalBooleanField('delivered'),
    validator.validateOptionalBooleanField('cancelled'),
    validator.validateOptionalField('pickupStation')
]
