import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};

    if (data.text === undefined || data.text === null || validator.isEmpty(data.text) || data.text === "") {
        errors.text = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
