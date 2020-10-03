import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }
    if (data.phone === undefined || data.phone === null || validator.isEmpty(data.phone) || data.phone === "") {
        errors.phone = 'This field is required';
    }
    if (data.websiteUrl === undefined || data.websiteUrl === null || validator.isEmpty(data.websiteUrl) || data.websiteUrl === "") {
        errors.websiteUrl = 'This field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
