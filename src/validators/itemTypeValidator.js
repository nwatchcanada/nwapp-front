import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};

    if (data.category === undefined || data.category === null || data.category === "" || isNaN(data.category)) {
        errors.category = 'This field is required';
    }
    if (data.text === undefined || data.text === null || data.text === "") {
        errors.text = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
