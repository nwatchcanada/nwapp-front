import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the residential district create / update page form.
 */
export function validateResidentialInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "" || data.name === "null") {
        errors.name = 'This field is required';
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
    let errors = {};

    if (data.streetNumberStart === undefined || data.streetNumberStart === null || validator.isEmpty(data.streetNumberStart) || data.streetNumberStart === "" || data.streetNumberStart === "null") {
        errors.streetNumberStart = 'This field is required';
    }
    if (data.streetNumberFinish === undefined || data.streetNumberFinish === null || validator.isEmpty(data.streetNumberFinish) || data.streetNumberFinish === "" || data.streetNumberFinish === "null") {
        errors.streetNumberFinish = 'This field is required';
    }
    if (data.streetName === undefined || data.streetName === null || validator.isEmpty(data.streetName) || data.streetName === "" || data.streetName === "null") {
        errors.streetName = 'This field is required';
    }
    if (data.streetType === undefined || data.streetType === null || validator.isEmpty(data.streetType) || data.streetType === "" || data.streetType === "null") {
        errors.streetType = 'This field is required';
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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate the business district create / update form.
 */
export function validateCommunityCaresModalSaveInput(data) {
    let errors = {};

    if (data.streetNumber === undefined || data.streetNumber === null || validator.isEmpty(data.streetNumber) || data.streetNumber === "" || data.streetNumber === "null") {
        errors.streetNumber = 'This field is required';
    }
    if (data.streetName === undefined || data.streetName === null || validator.isEmpty(data.streetName) || data.streetName === "" || data.streetName === "null") {
        errors.streetName = 'This field is required';
    }
    if (data.streetType === undefined || data.streetType === null || validator.isEmpty(data.streetType) || data.streetType === "" || data.streetType === "null") {
        errors.streetType = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
