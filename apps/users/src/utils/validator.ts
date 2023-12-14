import { Validator } from "../z-library/validation/validator";

class UserValidator extends Validator{}

export const validator = new UserValidator()