import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    console.log(data);

    // --- CONTACT --- //

    if (data.typeOf === RESIDENCE_TYPE_OF) {

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

    } else if (data.typeOf === BUSINESS_TYPE_OF) {

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

    } else if (data.typeOf === COMMUNITY_CARES_TYPE_OF) {

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

    }

    // --- ADDRESS --- //

    if (data.streetNumber === undefined || data.streetNumber === null || data.streetNumber === "") {
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

    // --- EXTRA --- //

    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
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

    if (data.birthYear === undefined || data.birthYear === null || data.birthYear === "") {
        errors.birthYear = 'This field is required';
    } else {
        try {
            if (parseInt(data.birthYear) < 1900) {
                errors.birthYear = 'Needs to be greater then 1900.';
            }
        } catch(err) {
            errors.birthYear = 'This field needs to be a number';
        }
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" || isNaN(data.gender) ) {
        errors.gender = 'This field is required';
    }
    if (data.howDidYouHear === undefined || data.howDidYouHear === null || validator.isEmpty(data.howDidYouHear) || data.howDidYouHear === "") {
        errors.howDidYouHear = 'This field is required';
    } else {
        if (data.howDidYouHear === "Other") {
            if (data.howDidYouHearOther === undefined || data.howDidYouHearOther === null || validator.isEmpty(data.howDidYouHearOther) || data.howDidYouHearOther === "") {
                errors.howDidYouHearOther = 'This field is required';
            }
        }
    }

    if (data.meaning === undefined || data.meaning === null || data.meaning === "") {
        errors.meaning = 'This field is required';
    }
    if (data.expectations === undefined || data.expectations === null || data.expectations === "") {
        errors.expectations = 'This field is required';
    }
    if (data.willingToVolunteer === undefined || data.willingToVolunteer === null || data.willingToVolunteer === "" || isNaN(data.willingToVolunteer) ) {
        errors.willingToVolunteer = 'This field is required';
    }
    if (data.anotherHouseholdMemberRegistered === undefined || data.anotherHouseholdMemberRegistered === null || data.anotherHouseholdMemberRegistered === "" || isNaN(data.anotherHouseholdMemberRegistered) ) {
        errors.anotherHouseholdMemberRegistered = 'This field is required';
    } else {
        if (data.anotherHouseholdMemberRegistered === 0 || data.anotherHouseholdMemberRegistered === "0") {
            if (data.totalHouseholdCount === undefined || data.totalHouseholdCount === null || data.totalHouseholdCount === "" || isNaN(data.totalHouseholdCount) ) {
                errors.totalHouseholdCount = 'This field is required';
            }
            if (data.under18YearsHouseholdCount === undefined || data.under18YearsHouseholdCount === null || data.under18YearsHouseholdCount === "" || isNaN(data.under18YearsHouseholdCount) ) {
                errors.under18YearsHouseholdCount = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 6 in the member creation form.
 */
export function validateStep6CreateInput(data) {
    let errors = {};

    if (data.agreement === undefined || data.agreement === null || data.agreement === "") {
        errors.agreement = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
