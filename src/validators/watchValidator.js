import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    AREA_COORDINATOR_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
    MANAGEMENT_ROLE_ID
} from '../constants/api';


export function validateStep2CreateInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "" || data.description === "null") {
        errors.description = 'This field is required';
    }
    if (data.district === undefined || data.district === null || validator.isEmpty(data.district) || data.district === "" || data.district === "null") {
        errors.district = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

////////////////////////////////////////////////////////////////////////////////
//                                 RESIDENTIAL                                //
////////////////////////////////////////////////////////////////////////////////

/**
 *  Validator will validate the residential district create / update page form.
 */
export function validateResidentialStep2Input(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "" || data.description === "null") {
        errors.description = 'This field is required';
    }
    if (data.district === undefined || data.district === null || validator.isEmpty(data.district) || data.district === "" || data.district === "null") {
        errors.district = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/**
 *  Validator will validate the residential district create / update page form.
 */
export function validateResidentialStep3Input(data) {
    let errors = {};

    if (data.streetMembership.length === 0) {
        errors.streetMembership = 'Please add at minimum one entry';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate the residential district create / update page form.
 */
export function validateResidentialUpdateInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.associate === undefined || data.associate === null || validator.isEmpty(data.associate) || data.associate === "" || data.associate === "null") {
        errors.associate = 'This field is required';
    }
    if (data.district === undefined || data.district === null || validator.isEmpty(data.district) || data.district === "" || data.district === "null") {
        errors.district = 'This field is required';
    }
    if (data.streetMembership.length === 0) {
        errors.streetMembership = 'Please add at minimum one entry';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}



/**
 *  Validator will validate the residential district create / update modal form.
 */
export function validateResidentialModalSaveInput(data) {
    return validateModalSaveInput(data);
}


////////////////////////////////////////////////////////////////////////////////
//                                 BUSINESS                                   //
////////////////////////////////////////////////////////////////////////////////

/**
 *  Validator will validate the business district create / update form.
 */
export function validateBusinessInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.associate === undefined || data.associate === null || validator.isEmpty(data.associate) || data.associate === "" || data.associate === "null") {
        errors.associate = 'This field is required';
    }
    if (data.district === undefined || data.district === null || validator.isEmpty(data.district) || data.district === "" || data.district === "null") {
        errors.district = 'This field is required';
    }
    if (data.primaryAreaCoordinator === undefined || data.primaryAreaCoordinator === null || validator.isEmpty(data.primaryAreaCoordinator) || data.primaryAreaCoordinator === "" || data.primaryAreaCoordinator === "null") {
        errors.primaryAreaCoordinator = 'This field is required';
    }
    if (data.secondaryAreaCoordinator === undefined || data.secondaryAreaCoordinator === null || validator.isEmpty(data.secondaryAreaCoordinator) || data.secondaryAreaCoordinator === "" || data.secondaryAreaCoordinator === "null") {
        errors.secondaryAreaCoordinator = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


////////////////////////////////////////////////////////////////////////////////
//                               COMMUNITY CARES                              //
////////////////////////////////////////////////////////////////////////////////


/**
 *  Validator will validate the community cares district create / update form.
 */
export function validateCommunityCaresInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "" || data.description === "null") {
        errors.description = 'This field is required';
    }
    if (data.associate === undefined || data.associate === null || validator.isEmpty(data.associate) || data.associate === "" || data.associate === "null") {
        errors.associate = 'This field is required';
    }
    if (data.district === undefined || data.district === null || validator.isEmpty(data.district) || data.district === "" || data.district === "null") {
        errors.district = 'This field is required';
    }
    if (data.primaryAreaCoordinator === undefined || data.primaryAreaCoordinator === null || validator.isEmpty(data.primaryAreaCoordinator) || data.primaryAreaCoordinator === "" || data.primaryAreaCoordinator === "null") {
        errors.primaryAreaCoordinator = 'This field is required';
    }
    if (data.secondaryAreaCoordinator === undefined || data.secondaryAreaCoordinator === null || validator.isEmpty(data.secondaryAreaCoordinator) || data.secondaryAreaCoordinator === "" || data.secondaryAreaCoordinator === "null") {
        errors.secondaryAreaCoordinator = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate the business district create / update form.
 */
export function validateCommunityCaresModalSaveInput(data) {
    return validateModalSaveInput(data)
}


////////////////////////////////////////////////////////////////////////////////
//                              COMMON FUNCTIONS                              //
////////////////////////////////////////////////////////////////////////////////


export function validateModalSaveInput(data) {
    let errors = {};

    if (data.streetNumberStart === undefined || data.streetNumberStart === null || validator.isEmpty(data.streetNumberStart) || data.streetNumberStart === "" || data.streetNumberStart === "null") {
        errors.streetNumberStart = 'This field is required';
    }
    if (data.streetNumberEnd === undefined || data.streetNumberEnd === null || validator.isEmpty(data.streetNumberEnd) || data.streetNumberEnd === "" || data.streetNumberEnd === "null") {
        errors.streetNumberEnd = 'This field is required';
    }
    if (data.streetName === undefined || data.streetName === null || validator.isEmpty(data.streetName) || data.streetName === "" || data.streetName === "null") {
        errors.streetName = 'This field is required';
    }
    if (data.streetType === undefined || data.streetType === null || isNaN(data.streetType) || data.streetType === "" || data.streetType === "null") {
        errors.streetType = 'This field is required';
    } else {
        if (data.streetType === "Other") {
            if (data.streetTypeOther === undefined || data.streetTypeOther === null || validator.isEmpty(data.streetTypeOther) || data.streetTypeOther === "" || data.streetTypeOther === "null") {
                errors.streetTypeOther = 'This field is required';
            }
        }
    }
    if (hasDuplicateStreetAddress(data)) {
        errors.nonFieldError = "You already entered this street address!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Function will iterate through the existing `streetMembership` array and see
 *  if the inputted fields from the modal already exist in the array. If so then
 *  return error, else return true.
 */
function hasDuplicateStreetAddress(data) {
    if (data.streetMembership !== undefined && data.streetMembership !== null) {
        for (let i = 0; i < data.streetMembership.length; i++) {
            let address = data.streetMembership[i];
            let isEqual = data.streetDirection === address.streetDirection;
            isEqual &= data.streetType === address.streetType;
            isEqual &= data.streetName === address.streetName;
            isEqual &= data.streetNumberEnd === address.streetNumberEnd;
            isEqual &= data.streetNumberStart === address.streetNumberStart;
            if (isEqual) {
                return true;
            }
        }
    }
    return false;
}




export function validateSearchInput(data) {
    let errors = {};

    if (data.advancedSearchActive === false) {
        if (data.keyword === undefined || data.keyword === null || data.keyword === "") {
            errors.keyword = 'This field is required.';
        }
    } else {
        let hasEmptyField = 0;
        if (data.firstName === undefined || data.firstName === null || data.firstName === "") {
            hasEmptyField += 1;
        }
        if (data.lastName === undefined || data.lastName === null || data.lastName === "") {
            hasEmptyField += 1;
        }
        if (data.email === undefined || data.email === null || data.email === "") {
            hasEmptyField += 1;
        }
        if (data.telephone === undefined || data.telephone === null || data.telephone === "") {
            hasEmptyField += 1;
        }

        if (hasEmptyField === 4) {
            // errors.firstName = '';
            // errors.lastName = '';
            // errors.phone = '';
            errors.MinimumOneFieldRequired = "Please input at leaset one field from the advanced section before submitting.";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


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
    if (data.gender === undefined || data.gender === null || data.gender === "") {
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
    if (data.meaning === undefined || data.meaning === null || data.meaning === "" || isNaN(data.meaning) ) {
        errors.meaning = 'This field is required';
    }
    if (data.expectation === undefined || data.expectation === null || data.expectation === "" || isNaN(data.expectation) ) {
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
            if (data.over18YearsHouseholdCount === undefined || data.over18YearsHouseholdCount === null || data.over18YearsHouseholdCount === "" || isNaN(data.over18YearsHouseholdCount) ) {
                errors.over18YearsHouseholdCount = 'This field is required';
            }
        }
    }
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationEmployeeCount === undefined || data.organizationEmployeeCount === null || data.organizationEmployeeCount === "" || isNaN(data.organizationEmployeeCount) ) {
            errors.organizationEmployeeCount = 'This field is required';
        }
        if (data.organizationFoundingYear === undefined || data.organizationFoundingYear === null || data.organizationFoundingYear === "" || isNaN(data.organizationFoundingYear) ) {
            errors.organizationFoundingYear = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "") {
            errors.organizationTypeOf = 'This field is required';
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
export function validateStep1CreateInput(data) {
    let errors = {};

    let hasChosen = false;
    if (data.firstName !== undefined && data.firstName !== null && data.firstName !== "") {
        hasChosen = true;
    } else {
        if (data.firstName.length > 0) {
            hasChosen = true;
        }
    }

    if (data.lastName !== undefined && data.lastName !== null && data.lastName !== "") {
        hasChosen = true;
    } else {
        if (data.lastName.length > 0) {
            hasChosen = true;
        }
    }
    if (data.phone !== undefined && data.phone !== null && data.phone !== "") {
        hasChosen = true;
    } else {
        if (data.phone.length > 0) {
            hasChosen = true;
        }
    }
    if (data.email !== undefined && data.email !== null && data.email !== "") {
        hasChosen = true;
    } else {
        if (data.email.length > 0) {
            hasChosen = true;
        }
    }

    if (hasChosen === false) {
        errors.nonFieldField = 'Please input a field before submitting.';
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
    if (data.streetType === undefined || data.streetType === null || isNaN(data.streetType) || data.streetType === "") {
        errors.streetType = 'This field is required';
    } else {
        if (data.streetType === 1) { // Note: 1 = "Other"
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
    if (data.gender === undefined || data.gender === null || data.gender === "") {
        errors.gender = 'This field is required';
    }
    if (data.howDidYouHear === undefined || data.howDidYouHear === null || isNaN(data.howDidYouHear) || data.howDidYouHear === "") {
        errors.howDidYouHear = 'This field is required';
    } else {
        if (data.howDidYouHear === 'Other' || data.howDidYouHear === '1' || data.howDidYouHear === 1) {
            if (data.howDidYouHearOther === undefined || data.howDidYouHearOther === null || validator.isEmpty(data.howDidYouHearOther) || data.howDidYouHearOther === "") {
                errors.howDidYouHearOther = 'This field is required';
            }
        }
    }
    if (data.meaning === undefined || data.meaning === null || data.meaning === "" || isNaN(data.meaning) ) {
        errors.meaning = 'This field is required';
    } else {
        if (data.meaning === 'Other' || data.meaning === '1' || data.meaning === 1) {
            if (data.meaningOther === undefined || data.meaningOther === null || validator.isEmpty(data.meaningOther) || data.meaningOther === "") {
                errors.meaningOther = 'This field is required';
            }
        }
    }
    if (data.expectation === undefined || data.expectation === null || data.expectation === "" || isNaN(data.expectation) ) {
        errors.expectation = 'This field is required';
    } else {
        if (data.expectation === 'Other' || data.expectation === '1' || data.expectation === 1) {
            if (data.expectationOther === undefined || data.expectationOther === null || validator.isEmpty(data.expectationOther) || data.expectationOther === "") {
                errors.expectationOther = 'This field is required';
            }
        }
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
            if (data.over18YearsHouseholdCount === undefined || data.over18YearsHouseholdCount === null || data.over18YearsHouseholdCount === "" || isNaN(data.over18YearsHouseholdCount) ) {
                errors.over18YearsHouseholdCount = 'This field is required';
            }
        }
    }
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationEmployeeCount === undefined || data.organizationEmployeeCount === null || data.organizationEmployeeCount === "" || isNaN(data.organizationEmployeeCount) ) {
            errors.organizationEmployeeCount = 'This field is required';
        }
        if (data.organizationFoundingYear === undefined || data.organizationFoundingYear === null || data.organizationFoundingYear === "" || isNaN(data.organizationFoundingYear) ) {
            errors.organizationFoundingYear = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "") {
            errors.organizationTypeOf = 'This field is required';
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
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
            errors.organizationName = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || isNaN(data.organizationTypeOf) || data.organizationTypeOf === "") {
            errors.organizationTypeOf = 'This field is required';
        }
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
    if (data.streetType === undefined || data.streetType === null || isNaN(data.streetType) || data.streetType === "") {
        errors.streetType = 'This field is required';
    } else {
        if (data.streetType === 1) { // 1 = Other
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
    if (data.gender === undefined || data.gender === null || data.gender === "") {
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
    if (data.meaning === undefined || data.meaning === null || data.meaning === "" || isNaN(data.meaning) ) {
        errors.meaning = 'This field is required';
    }
    if (data.expectation === undefined || data.expectation === null || data.expectation === "" || isNaN(data.expectation) ) {
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
            if (data.over18YearsHouseholdCount === undefined || data.over18YearsHouseholdCount === null || data.over18YearsHouseholdCount === "" || isNaN(data.over18YearsHouseholdCount) ) {
                errors.over18YearsHouseholdCount = 'This field is required';
            }
        }
    }
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.organizationEmployeeCount === undefined || data.organizationEmployeeCount === null || data.organizationEmployeeCount === "" || isNaN(data.organizationEmployeeCount) ) {
            errors.organizationEmployeeCount = 'This field is required';
        }
        if (data.organizationFoundingYear === undefined || data.organizationFoundingYear === null || data.organizationFoundingYear === "" || isNaN(data.organizationFoundingYear) ) {
            errors.organizationFoundingYear = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "") {
            errors.organizationTypeOf = 'This field is required';
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
        if (data.roleId === AREA_COORDINATOR_ROLE_ID) {
            if (data.areaCoordinatorAgreement === undefined || data.areaCoordinatorAgreement === null || data.areaCoordinatorAgreement === "" || data.areaCoordinatorAgreement === false) {
                errors.areaCoordinatorAgreement = 'This field is required.';
            }
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
        if (data.roleId === FRONTLINE_STAFF_ROLE_ID || data.roleId === MANAGEMENT_ROLE_ID) {
            if (data.staffAgreement === undefined || data.staffAgreement === null || data.staffAgreement === "" || data.staffAgreement === false) {
                errors.staffAgreement = 'This field is required';
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


/**
 *  Validator will validate member contact.
 */
export function validateContactInput(data) {
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


export function validateActivationInput(data) {
    let errors = {};

    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateDeactivationInput(data) {
    let errors = {};

    if (data.reason === undefined || data.reason === null || data.reason === "" || isNaN(data.reason) ) {
        errors.reason = 'This field is required';
    } else {
        if (data.reason === 1) {
            if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                errors.reasonOther = 'This field is required.';
            }
        }
    }
    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateScorePointInput(data) {
    let errors = {};

    if (data.typeOf === undefined || data.typeOf === null || data.typeOf === "" || isNaN(data.typeOf) || data.typeOf === 0) {
        errors.typeOf = 'This field is required';
    } else {
        if (data.typeOf === 1) {
            if (data.typeOfOther === undefined || data.typeOfOther === null || data.typeOfOther === "") {
                errors.typeOfOther = 'This field is required.';
            }
            if (data.descriptionOther === undefined || data.descriptionOther === null || data.descriptionOther === "") {
                errors.descriptionOther = 'This field is required.';
            }
        }
    }
    if (data.amount === undefined || data.amount === null || data.amount === "" || isNaN(data.amount) ) {
        errors.amount = 'This field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateBadgeInput(data) {
    let errors = {};

    if (data.typeOf === undefined || data.typeOf === null || data.typeOf === "" || isNaN(data.typeOf) || data.typeOf === 0) {
        errors.typeOf = 'This field is required';
    } else {
        if (data.typeOf === 1) {
            if (data.typeOfOther === undefined || data.typeOfOther === null || data.typeOfOther === "") {
                errors.typeOfOther = 'This field is required.';
            }
            if (data.descriptionOther === undefined || data.descriptionOther === null || data.descriptionOther === "") {
                errors.descriptionOther = 'This field is required.';
            }
            if (data.icon === undefined || data.icon === null || data.icon === "") {
                errors.icon = 'This field is required.';
            }
            if (data.colour === undefined || data.colour === null || data.colour === "") {
                errors.colour = 'This field is required.';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
