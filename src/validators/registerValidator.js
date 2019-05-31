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
    if (data.password === undefined || data.password === null || validator.isEmpty(data.password) || data.password === "") {
        errors.password = 'This field is required';
    }
    if (data.passwordRepeat === undefined || data.passwordRepeat === null || validator.isEmpty(data.passwordRepeat) || data.passwordRepeat === "") {
        errors.passwordRepeat = 'This field is required';
    }
    if (!validator.equals(data.password, data.passwordRepeat)) {
        errors.passwordRepeat = 'Passwords must match';
    }
    if (data.firstName === undefined || data.firstName === null || validator.isEmpty(data.firstName) || data.firstName === "") {
        errors.firstName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.hasSignedTos === undefined || data.hasSignedTos === null || data.hasSignedTos === false) {
        errors.hasSignedTos = 'Please agree to our terms of service';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
