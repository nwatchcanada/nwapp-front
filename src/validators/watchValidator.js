import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

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


function validateModalSaveInput(data) {
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
            isEqual &= data.streetNumberFinish === address.streetNumberFinish;
            isEqual &= data.streetNumberStart === address.streetNumberStart;
            if (isEqual) {
                return true;
            }
        }
    }
    return false;
}
