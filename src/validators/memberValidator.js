import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


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
 *  Validator will validate step 2 in the member creation form.
 */
export function validateStep2RezOrComCreateInput(data) {
    let errors = {};

    if (data.firstName === undefined || data.firstName === null || validator.isEmpty(data.firstName) || data.firstName === "") {
        errors.firstName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
        errors.primaryPhone = 'This field is required';
    }
    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 2 in the member creation form.
 */
export function validateStep2BizCreateInput(data) {
    let errors = {};

    if (data.companyName === undefined || data.companyName === null || validator.isEmpty(data.companyName) || data.companyName === "") {
        errors.companyName = 'This field is required';
    }
    if (data.contactFirstName === undefined || data.contactFirstName === null || validator.isEmpty(data.contactFirstName) || data.contactFirstName === "") {
        errors.contactFirstName = 'This field is required';
    }
    if (data.contactLastName === undefined || data.contactLastName === null || validator.isEmpty(data.contactLastName) || data.contactLastName === "") {
        errors.contactLastName = 'This field is required';
    }
    if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
        errors.primaryPhone = 'This field is required';
    }
    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 3 in the member creation form.
 */
export function validateStep3CreateInput(data) {
    let errors = {};

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 4 in the member creation form.
 */
export function validateStep4CreateInput(data) {
    let errors = {};

    // Do nothing.

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 5 in the member creation form.
 */
export function validateStep5CreateInput(data) {
    let errors = {};

    if (data.howDidYouHear === undefined || data.howDidYouHear === null || validator.isEmpty(data.howDidYouHear) || data.howDidYouHear === "") {
        errors.howDidYouHear = 'This field is required';
    } else {
        if (data.howDidYouHear === "Other") {
            if (data.howDidYouHearOther === undefined || data.howDidYouHearOther === null || validator.isEmpty(data.howDidYouHearOther) || data.howDidYouHearOther === "") {
                errors.howDidYouHearOther = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
