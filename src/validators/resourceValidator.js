import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../constants/api";


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};

    if (data.category === undefined || data.category === null || data.category === "" || isNaN(data.category) ) {
        errors.category = 'This field is required';
    }
    if (data.typeOf === undefined || data.typeOf === null || data.typeOf === "" || isNaN(data.typeOf) ) {
        errors.typeOf = 'This field is required';
    } else {
        if (data.typeOf === LINK_RESOURCE_TYPE_OF) {
            errors = validateLinkInput(data, errors);
        } else if (data.typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
            errors = validateYouTubeVideoInput(data, errors);
        } else if (data.typeOf === IMAGE_RESOURCE_TYPE_OF) {
            errors = validateImageInput(data, errors);
        } else if (data.typeOf === FILE_RESOURCE_TYPE_OF) {
            errors = validateFileInput(data, errors);
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator for the `Link` form in the `resource` objects of the system.
 */
export function validateLinkInput(data, errors) {
    if (data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.externalUrl === undefined || data.externalUrl === null ||  data.externalUrl === "") {
        errors.externalUrl = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return errors
}


/**
 *  Validator for the `YouTube Video` form in the `resource` objects of the system.
 */
export function validateYouTubeVideoInput(data, errors) {
    if (data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.embedCode === undefined || data.embedCode === null || data.embedCode === "") {
        errors.embedCode = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return errors
}


/**
 *  Validator for the `Image` form in the `resource` objects of the system.
 */
export function validateImageInput(data, errors) {
    if (data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.imageFile === undefined || data.imageFile === null || data.imageFile === "") {
        errors.imageFile = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return errors
}


/**
 *  Validator for the `File` form in the `resource` objects of the system.
 */
export function validateFileInput(data, errors) {
    if (data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.file === undefined || data.file === null || data.file === "") {
        errors.file = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return errors
}
