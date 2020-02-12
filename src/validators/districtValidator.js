import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from "../constants/api";


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


/**
 *  Validator will validate the residential district create / update form.
 */
export function validateResidentialInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "" || data.description === "null") {
        errors.description = 'This field is required';
    }
    if (data.counselorName === undefined || data.counselorName === null || validator.isEmpty(data.counselorName) || data.counselorName === "" || data.counselorName === "null") {
        errors.counselorName = 'This field is required';
    }
    if (data.counselorEmail === undefined || data.counselorEmail === null || validator.isEmpty(data.counselorEmail) || data.counselorEmail === "" || data.counselorEmail === "null") {
        errors.counselorEmail = 'This field is required';
    }
    if (data.counselorPhone === undefined || data.counselorPhone === null || validator.isEmpty(data.counselorPhone) || data.counselorPhone === "" || data.counselorPhone === "null") {
        errors.counselorPhone = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate the business district create / update form.
 */
export function validateBusinessInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "" || data.description === "null") {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateInput(data) {
    let errors = {};

    if (data.typeOf === RESIDENCE_TYPE_OF) {
        return validateResidentialInput(data);

    } else if (data.typeOf === BUSINESS_TYPE_OF) {
        return validateBusinessInput(data);

    } else if (data.typeOf === COMMUNITY_CARES_TYPE_OF) {
        return validateCommunityCaresInput(data);

    } else {
        errors.typeOf = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
