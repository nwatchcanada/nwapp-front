import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF,
   OTHER_EVENT_TYPE_OF,
   OTHER_INCIDENT_TYPE_OF,
   OTHER_CONCERN_TYPE_OF,
} from "../constants/api";


/**
 *  Validator will validate item.
 */
export function validateInput(data) {
    if (data.typeOf === INCIDENT_ITEM_TYPE_OF) {
        return validateIncidentInput(data);
    } else if (data.typeOf === CONCERN_ITEM_TYPE_OF) {
        return validateConcernInput(data);
    } else if (data.typeOf === EVENT_ITEM_TYPE_OF) {
        return validateEventInput(data);
    } else if (data.typeOf === INFORMATION_ITEM_TYPE_OF) {
        return validateInformationInput(data);
    } else {
        return {
            location: 'This field is required',
            isValid: false
        }
    }
}


/**
 *  Validator will validate the `concern` item.
 */
export function validateConcernInput(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }
    if (data.location === undefined || data.location === null || validator.isEmpty(data.location) || data.location === "") {
        errors.location = 'This field is required';
    }
    if (data.concernTypeOf === undefined || data.concernTypeOf === null || data.concernTypeOf === "" || isNaN(data.concernTypeOf) ) {
        errors.concernTypeOf = 'This field is required';
    } else {
        if (data.concernTypeOf === OTHER_CONCERN_TYPE_OF) {
            if (data.concernTypeOfOther === undefined || data.concernTypeOfOther === null || validator.isEmpty(data.concernTypeOfOther) || data.concernTypeOfOther === "") {
                errors.concernTypeOfOther = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate the `event` item.
 */
export function validateEventInput(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
    }
    if (data.eventTypeOf === undefined || data.eventTypeOf === null || data.eventTypeOf === "" || isNaN(data.eventTypeOf) ) {
        errors.eventTypeOf = 'This field is required';
    } else {
        if (data.eventTypeOf === OTHER_EVENT_TYPE_OF) {
            if (data.eventTypeOfOther === undefined || data.eventTypeOfOther === null || validator.isEmpty(data.eventTypeOfOther) || data.eventTypeOfOther === "") {
                errors.eventTypeOfOther = 'This field is required';
            }
        }
    }
    if (data.date === undefined || data.date === null || data.date === "") {
        errors.date = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }
    if (data.shownToWhom === undefined || data.shownToWhom === null || data.shownToWhom === "" || isNaN(data.shownToWhom) ) {
        errors.shownToWhom = 'This field is required';
    }
    if (data.canBePostedOnSocialMedia === undefined || data.canBePostedOnSocialMedia === null || data.canBePostedOnSocialMedia === "" || isNaN(data.canBePostedOnSocialMedia) ) {
        errors.canBePostedOnSocialMedia = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate the `incident` item.
 */
export function validateIncidentInput(data) {
    let errors = {};

    // STEP 2
    if (data.incidentTypeOf === undefined || data.incidentTypeOf === null || data.incidentTypeOf === "" || isNaN(data.incidentTypeOf) ) {
        errors.incidentTypeOf = 'This field is required';
    } else {
        if (data.incidentTypeOf === OTHER_INCIDENT_TYPE_OF) {
            // if (data.location === undefined || data.location === null || validator.isEmpty(data.location) || data.location === "") {
            //     errors.location = 'This field is required';
            // }
        }
    }

    // STEP 3
    if (data.notifiedAuthorities === undefined || data.notifiedAuthorities === null || data.notifiedAuthorities === "" || isNaN(data.notifiedAuthorities) ) {
        errors.notifiedAuthorities = 'This field is required';
    }
    if (data.acceptAuthorityCooperation === undefined || data.acceptAuthorityCooperation === null || data.acceptAuthorityCooperation === "" || isNaN(data.acceptAuthorityCooperation) ) {
        errors.acceptAuthorityCooperation = 'This field is required';
    }

    // STEP 4
    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
    }
    if (data.date === undefined || data.date === null || data.date === "") {
        errors.date = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }
    if (data.location === undefined || data.location === null || validator.isEmpty(data.location) || data.location === "") {
        errors.location = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateIncidentStep2Input(data) {
    let errors = {};

    if (data.incidentTypeOf === undefined || data.incidentTypeOf === null || data.incidentTypeOf === "" || isNaN(data.incidentTypeOf) ) {
        errors.incidentTypeOf = 'This field is required';
    } else {
        if (data.incidentTypeOf === OTHER_INCIDENT_TYPE_OF) {
            // if (data.location === undefined || data.location === null || validator.isEmpty(data.location) || data.location === "") {
            //     errors.location = 'This field is required';
            // }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateIncidentStep3Input(data) {
    let errors = {};

    if (data.notifiedAuthorities === undefined || data.notifiedAuthorities === null || data.notifiedAuthorities === "" || isNaN(data.notifiedAuthorities) ) {
        errors.notifiedAuthorities = 'This field is required';
    }
    if (data.acceptAuthorityCooperation === undefined || data.acceptAuthorityCooperation === null || data.acceptAuthorityCooperation === "" || isNaN(data.acceptAuthorityCooperation) ) {
        errors.acceptAuthorityCooperation = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateIncidentStep4Input(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
    }
    if (data.date === undefined || data.date === null || data.date === "") {
        errors.date = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }
    if (data.location === undefined || data.location === null || validator.isEmpty(data.location) || data.location === "") {
        errors.location = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}



/**
 *  Validator will validate the `information` item.
 */
export function validateInformationInput(data) {
    let errors = {};

    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
