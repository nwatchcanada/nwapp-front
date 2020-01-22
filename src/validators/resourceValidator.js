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

    if (data.category === undefined || data.category === null || data.category === "") {
        errors.category = 'This field is required';
    }
    if (data.typeOf === undefined || data.typeOf === null || data.typeOf === "") {
        errors.typeOf = 'This field is required';
    } else {
        if (data.typeOf === LINK_RESOURCE_TYPE_OF) {
            errors = validateLinkInput(data);
        } else if (data.typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
            errors = validateYouTubeVideoInput(data);
        } else if (data.typeOf === IMAGE_RESOURCE_TYPE_OF) {
            errors = validateImageInput(data);
        } else if (data.typeOf === FILE_RESOURCE_TYPE_OF) {
            errors = validateFileInput(data);
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
export function validateLinkInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.url === undefined || data.url === null ||  data.url === "") {
        errors.url = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return errors
}


/**
 *  Validator for the `YouTube Video` form in the `resource` objects of the system.
 */
export function validateYouTubeVideoInput(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.youTubeEmbedCode === undefined || data.youTubeEmbedCode === null || data.youTubeEmbedCode === "") {
        errors.youTubeEmbedCode = 'This field is required';
    }
    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }

    return errors
}


/**
 *  Validator for the `Image` form in the `resource` objects of the system.
 */
export function validateImageInput(data) {
    let errors = {};

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
export function validateFileInput(data) {
    let errors = {};

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
