import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { OTHER_DEMOTION_REASON } from '../constants/api';


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
 *  Validator will validate demotion form.
 */
export function validateDemotionInput(data) {
    let errors = {};

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
