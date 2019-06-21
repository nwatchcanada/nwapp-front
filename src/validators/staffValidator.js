import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.firstName === undefined || data.firstName === null || validator.isEmpty(data.firstName) || data.firstName === "") {
        errors.firstName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.dateOfBirth === undefined || data.dateOfBirth === null || validator.isEmpty(data.dateOfBirth) || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "") {
        errors.gender = 'This field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
