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


/**
 *  Validator will validate the `concern` item.
 */
export function validateConcernInput(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.title = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
