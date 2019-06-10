import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
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
    if (data.cityRoleNumber === undefined || data.cityRoleNumber === null || validator.isEmpty(data.cityRoleNumber) || data.cityRoleNumber === "" || data.cityRoleNumber === "null") {
        errors.cityRoleNumber = 'This field is required';
    }
    if (data.legalDescription === undefined || data.legalDescription === null || validator.isEmpty(data.legalDescription) || data.legalDescription === "" || data.legalDescription === "null") {
        errors.legalDescription = 'This field is required';
    }
    if (data.linkToCityWebsite === undefined || data.linkToCityWebsite === null || validator.isEmpty(data.linkToCityWebsite) || data.linkToCityWebsite === "" || data.linkToCityWebsite === "null") {
        errors.linkToCityWebsite = 'This field is required';
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
    console.log(data);

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
