import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the login form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }
    if (data.password === undefined || data.password === null || validator.isEmpty(data.password) || data.password === "") {
        errors.password = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
