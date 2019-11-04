import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { OTHER_DEMOTION_REASON } from '../constants/api';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
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
 *  Validator will validate demotion form.
 */
export function validateDemotionInput(data) {
    let errors = {};

    if (data.role === undefined || data.role === null || data.role === "") {
        errors.role = 'This field is required';
    }
    if (data.reason === undefined || data.reason === null || data.reason === "") {
        errors.reason = 'This field is required';
    } else {
        if (data.reason === OTHER_DEMOTION_REASON) {
            if (data.reasonOther === undefined || data.reasonOther === null || validator.isEmpty(data.reasonOther) || data.reasonOther === "") {
                errors.reasonOther = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateContactInput(data) {
    let errors = {};

    // --- CONTACT --- //

    if (data.givenName === undefined || data.givenName === null || validator.isEmpty(data.givenName) || data.givenName === "") {
        errors.givenName = 'This field is required';
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

    // if (data.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
    //
    //     if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
    //         errors.organizationName = 'This field is required';
    //     }
    //     if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "" || isNaN(data.organizationTypeOf === "")) {
    //         errors.organizationTypeOf = 'This field is required';
    //     }
    //
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
