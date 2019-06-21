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
    if (data.city === undefined || data.city === null || validator.isEmpty(data.city) || data.city === "") {
        errors.city = 'This field is required';
    }
    //TODO: COUNTRY + PROVINCE
    if (data.postal === undefined || data.postal === null || validator.isEmpty(data.postal) || data.postal === "") {
        errors.postal = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
