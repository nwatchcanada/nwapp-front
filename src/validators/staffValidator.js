import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    // Personal Information
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
    if (data.howHear === undefined || data.howHear === null || data.howHear === "") {
        errors.howHear = 'This field is required';
    }

    // Contact Information.
    if (data.phone === undefined || data.phone === null || validator.isEmpty(data.phone) || data.phone === "") {
        errors.phone = 'This field is required';
    }
    if (data.workEmail === undefined || data.workEmail === null || validator.isEmpty(data.workEmail) || data.workEmail === "") {
        errors.workEmail = 'This field is required';
    }
    if (data.personalEmail === undefined || data.personalEmail === null || validator.isEmpty(data.personalEmail) || data.personalEmail === "") {
        errors.personalEmail = 'This field is required';
    }

    // Street address.
    if (data.streetNumber === undefined || data.streetNumber === null || validator.isEmpty(data.streetNumber) || data.streetNumber === "") {
        errors.streetNumber = 'This field is required';
    }
    if (data.streetName === undefined || data.streetName === null || validator.isEmpty(data.streetName) || data.streetName === "") {
        errors.streetName = 'This field is required';
    }
    if (data.streetType === undefined || data.streetType === null || validator.isEmpty(data.streetType) || data.streetType === "") {
        errors.streetType = 'This field is required';
    } else {
        if (data.streetType === "Other") {
            if (data.streetTypeOther === undefined || data.streetTypeOther === null || validator.isEmpty(data.streetTypeOther) || data.streetTypeOther === "") {
                errors.streetTypeOther = 'This field is required';
            }
        }
    }
    if (data.locality === undefined || data.locality === null || validator.isEmpty(data.locality) || data.locality === "") {
        errors.locality = 'This field is required';
    }
    if (data.region === undefined || data.region === null || validator.isEmpty(data.region) || data.region === "") {
        errors.region = 'This field is required';
    }
    if (data.country === undefined || data.country === null || validator.isEmpty(data.country) || data.country === "") {
        errors.country = 'This field is required';
    }
    if (data.postal === undefined || data.postal === null || validator.isEmpty(data.postal) || data.postal === "") {
        errors.postal = 'This field is required';
    }

    // Account
    if (data.accountType === undefined || data.accountType === null || data.accountType === "") {
        errors.accountType = 'This field is required';
    }
    if (data.password === undefined || data.password === null || data.password === "") {
        errors.password = 'This field is required';
    }
    if (data.repeatPassword === undefined || data.repeatPassword === null || data.repeatPassword === "") {
        errors.repeatPassword = 'This field is required';
    }
    if (data.isActive === undefined || data.isActive === null || data.isActive === "") {
        errors.isActive = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
