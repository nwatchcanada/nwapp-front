import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "") {
        errors.name = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
