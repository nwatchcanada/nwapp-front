import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};
    let pickedChoice = 2;
    if (data.keyword === undefined || data.keyword === null || isEmpty(data.keyword) || data.keyword === "") {
        pickedChoice -= 1;
    }
    if (data.tags === undefined || data.tags === null || isEmpty(data.tags) || data.tags === "") {
        pickedChoice -= 1;
    }
    // errors.keyword = 'This field is required';
    if (pickedChoice <= 0) {
        errors.nonFieldError = "Please enter at least keyword or tag before searching.";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
