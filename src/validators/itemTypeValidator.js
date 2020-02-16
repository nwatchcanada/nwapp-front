import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};

    if (data.category === undefined || data.category === null || validator.isEmpty(data.category) || data.category === "") {
        errors.category = 'This field is required';
    }
    if (data.text === undefined || data.text === null || validator.isEmpty(data.text) || data.text === "") {
        errors.text = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
