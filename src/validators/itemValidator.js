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
   OTHER_COMMUNITY_NEWS_TYPE_OF,
} from "../constants/api";


/**
 *  Validator will validate item.
 */
export function validateInput(data) {
    if (data.typeOf === INCIDENT_ITEM_TYPE_OF) {
        return validateIncidentInput(data);
    } else if (data.typeOf === CONCERN_ITEM_TYPE_OF) {
        return validateConcernStep4Input(data);
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



export function validateConcernStep3Input(data) {
    let errors = {};

    if (data.category === undefined || data.category === null || data.category === "" ) {
        errors.category = 'This field is required';
    } else {
        if (data.category === OTHER_CONCERN_TYPE_OF) {
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



/**
 *  Validator will validate the `concern` item.
 */
export function validateConcernStep4Input(data) {
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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateEventStep2Input(data) {
    let errors = {};

    // STEP 2
    if (data.category === undefined || data.category === null || data.category === "" ) {
        errors.category = 'This field is required';
    } else {
        if (data.category === OTHER_EVENT_TYPE_OF) {
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

export function validateEventStep3Input(data) {
    let errors = {};

    if (data.startDateTime === undefined || data.startDateTime === null || data.startDateTime === "") {
        errors.startDateTime = 'This field is required';
    }

    if (data.isAllDayEvent === false) {
        if (data.finishDateTime === undefined || data.finishDateTime === null || data.finishDateTime === "") {
            errors.finishDateTime = 'This field is required';
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
export function validateEventStep4Input(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
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
 *  Validator will validate the `event` item.
 */
export function validateEventInput(data) {
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
    if (data.category === undefined || data.category === null || data.category === "" ) {
        errors.category = 'This field is required';
    } else {
        if (data.category === OTHER_INCIDENT_TYPE_OF) {
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

    if (data.category === undefined || data.category === null || data.category === "" ) {
        errors.category = 'This field is required';
    } else {
        if (data.category === OTHER_INCIDENT_TYPE_OF) {
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


export function validateInformationStep2Input(data) {
    let errors = {};

    // STEP 2
    if (data.category === undefined || data.category === null || data.category === "" ) {
        errors.category = 'This field is required';
    } else {
        if (data.category === OTHER_EVENT_TYPE_OF) {
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


export function validateCommunityNewsStep2Input(data) {
    let errors = {};

    if (data.category === undefined || data.category === null || data.category === "" ) {
        errors.category = 'This field is required';
    } else {
        if (data.category === OTHER_COMMUNITY_NEWS_TYPE_OF) {
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

export function validateCommunityNewsStep3Input(data) {
    let errors = {};

    if (data.whoNewsFor === undefined || data.whoNewsFor === null || data.whoNewsFor === "" || isNaN(data.whoNewsFor) ) {
        errors.whoNewsFor = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateCommunityNewsStep4Input(data) {
    let errors = {};

    if (data.description === undefined || data.description === null || data.description === "" ) {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateCommunityNewsStep5Input(data) {
    let errors = {};

    if (data.description === undefined || data.description === null || data.description === "" ) {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
