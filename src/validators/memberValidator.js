import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    ASSOCIATE_ROLE_ID
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

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
        if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
            errors.isOkToEmail = 'This field is required';
        }
        if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
            errors.isOkToText = 'This field is required';
        }

    } else if (data.typeOf === BUSINESS_TYPE_OF) {

        if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
            errors.organizationName = 'This field is required';
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
        if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
            errors.isOkToEmail = 'This field is required';
        }
        if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
            errors.isOkToText = 'This field is required';
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
        if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
            errors.isOkToEmail = 'This field is required';
        }
        if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
            errors.isOkToText = 'This field is required';
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
    if (data.postalCode === undefined || data.postalCode === null || validator.isEmpty(data.postalCode) || data.postalCode === "") {
        errors.postalCode = 'This field is required';
    }

    // --- EXTRA --- //

    if (data.yearOfBirth === undefined || data.yearOfBirth === null || data.yearOfBirth === "") {
        errors.yearOfBirth = 'This field is required';
    } else {
        try {
            if (parseInt(data.yearOfBirth) < 1900) {
                errors.yearOfBirth = 'Needs to be greater then 1900.';
            }
        } catch(err) {
            errors.yearOfBirth = 'This field needs to be a number';
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
    if (data.expectation === undefined || data.expectation === null || data.expectation === "") {
        errors.expectation = 'This field is required';
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
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationEmployeeCount === undefined || data.organizationEmployeeCount === null || data.organizationEmployeeCount === "" || isNaN(data.organizationEmployeeCount) ) {
            errors.organizationEmployeeCount = 'This field is required';
        }
        if (data.organizationYearsInOperation === undefined || data.organizationYearsInOperation === null || data.organizationYearsInOperation === "" || isNaN(data.organizationYearsInOperation) ) {
            errors.organizationYearsInOperation = 'This field is required';
        }
        if (data.organizationType === undefined || data.organizationType === null || data.organizationType === "") {
            errors.organizationType = 'This field is required';
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
    if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
        errors.isOkToEmail = 'This field is required';
    }
    if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
        errors.isOkToText = 'This field is required';
    }
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
            errors.organizationName = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || isNaN(data.organizationTypeOf) || data.organizationTypeOf === "") {
            errors.organizationTypeOf = 'This field is required';
        }
    }

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
    if (data.postalCode === undefined || data.postalCode === null || validator.isEmpty(data.postalCode) || data.postalCode === "") {
        errors.postalCode = 'This field is required';
    }
    if (data.country === undefined || data.country === null || validator.isEmpty(data.country) || data.country === "") {
        errors.country = 'This field is required';
    }
    if (data.region === undefined || data.region === null || validator.isEmpty(data.region) || data.region === "") {
        errors.region = 'This field is required';
    }
    if (data.locality === undefined || data.locality === null || validator.isEmpty(data.locality) || data.locality === "") {
        errors.locality = 'This field is required';
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

    // Do nothing.

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 7 in the member creation form.
 */
export function validateStep7CreateInput(data) {
    let errors = {};

    if (data.yearOfBirth === undefined || data.yearOfBirth === null || data.yearOfBirth === "") {
        errors.yearOfBirth = 'This field is required';
    } else {
        try {
            if (parseInt(data.yearOfBirth) < 1900) {
                errors.yearOfBirth = 'Needs to be greater then 1900.';
            }
        } catch(err) {
            errors.yearOfBirth = 'This field needs to be a number';
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
    if (data.expectation === undefined || data.expectation === null || data.expectation === "") {
        errors.expectation = 'This field is required';
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
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationEmployeeCount === undefined || data.organizationEmployeeCount === null || data.organizationEmployeeCount === "" || isNaN(data.organizationEmployeeCount) ) {
            errors.organizationEmployeeCount = 'This field is required';
        }
        if (data.organizationYearsInOperation === undefined || data.organizationYearsInOperation === null || data.organizationYearsInOperation === "" || isNaN(data.organizationYearsInOperation) ) {
            errors.organizationYearsInOperation = 'This field is required';
        }
        if (data.organizationType === undefined || data.organizationType === null || data.organizationType === "") {
            errors.organizationType = 'This field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}



/**
 *  Validator will validate step 8 in the member creation form.
 */
export function validateStep8CreateInput(data) {
    let errors = {};

    // --- CONTACT --- //

    if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
        errors.organizationName = 'This field is required';
    }
    if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || isNaN(data.organizationTypeOf) || data.organizationTypeOf === "") {
        errors.organizationTypeOf = 'This field is required';
    }
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
    if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
        errors.isOkToEmail = 'This field is required';
    }
    if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
        errors.isOkToText = 'This field is required';
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
    if (data.postalCode === undefined || data.postalCode === null || validator.isEmpty(data.postalCode) || data.postalCode === "") {
        errors.postalCode = 'This field is required';
    }

    // --- EXTRA --- //

    if (data.yearOfBirth === undefined || data.yearOfBirth === null || data.yearOfBirth === "") {
        errors.yearOfBirth = 'This field is required';
    } else {
        try {
            if (parseInt(data.yearOfBirth) < 1900) {
                errors.yearOfBirth = 'Needs to be greater then 1900.';
            }
        } catch(err) {
            errors.yearOfBirth = 'This field needs to be a number';
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
    if (data.expectation === undefined || data.expectation === null || data.expectation === "") {
        errors.expectation = 'This field is required';
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
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationEmployeeCount === undefined || data.organizationEmployeeCount === null || data.organizationEmployeeCount === "" || isNaN(data.organizationEmployeeCount) ) {
            errors.organizationEmployeeCount = 'This field is required';
        }
        if (data.organizationYearsInOperation === undefined || data.organizationYearsInOperation === null || data.organizationYearsInOperation === "" || isNaN(data.organizationYearsInOperation) ) {
            errors.organizationYearsInOperation = 'This field is required';
        }
        if (data.organizationType === undefined || data.organizationType === null || data.organizationType === "") {
            errors.organizationType = 'This field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validatePromotionInput(data) {
    let errors = {};

    if (data.roleId === undefined || data.roleId === null || data.roleId === "") {
        errors.roleId = 'This field is required';
    } else {
        if (data.areaCoordinatorAgreement === undefined || data.areaCoordinatorAgreement === null || data.areaCoordinatorAgreement === "" || data.areaCoordinatorAgreement === false) {
            errors.areaCoordinatorAgreement = 'This field is required.';
        }
        if (data.conflictOfInterestAgreement === undefined || data.conflictOfInterestAgreement === null || data.conflictOfInterestAgreement === "" || data.conflictOfInterestAgreement === false) {
            errors.conflictOfInterestAgreement = 'This field is required';
        }
        if (data.codeOfConductAgreement === undefined || data.codeOfConductAgreement === null || data.codeOfConductAgreement === "" || data.codeOfConductAgreement === false) {
            errors.codeOfConductAgreement = 'This field is required';
        }
        if (data.confidentialityAgreement === undefined || data.confidentialityAgreement === null || data.confidentialityAgreement === "" || data.confidentialityAgreement === false) {
            errors.confidentialityAgreement = 'This field is required';
        }
        if (data.roleId === ASSOCIATE_ROLE_ID) {
            if (data.associateAgreement === undefined || data.associateAgreement === null || data.associateAgreement === "" || data.associateAgreement === false) {
                errors.associateAgreement = 'This field is required';
            }
        }
        if (data.policeCheckDate === undefined || data.policeCheckDate === null || data.policeCheckDate === "" || isNaN(data.policeCheckDate)) {
            errors.policeCheckDate = 'This field is required.';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
