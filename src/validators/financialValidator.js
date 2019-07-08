import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the financial transaction edit form.
 */
export function validateInput(data) {
    let errors = {};

    if (data.firstName === undefined || data.firstName === null || validator.isEmpty(data.firstName) || data.firstName === "") {
        errors.firstName = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
