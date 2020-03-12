import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate step 2 of `Assign Watch Associate` (#1) task.
 */
export function validateTask1Step2Input(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || validator.isEmpty(data.associate) || data.associate === "") {
        errors.associate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 2 of `Action Concern Item` (#3) task.
 */
export function validateTask3Step2Input(data) {
    let errors = {};

    if (data.willAction === undefined || data.willAction === null || data.willAction === "" || isNaN(data.willAction)) {
        errors.willAction = 'This field is required';
    } else {
        if (data.willAction === 0) {
            if (data.reason === undefined || data.reason === null || data.reason === "" || isNaN(data.reason)) {
                errors.reason = 'This field is required';
            } else {
                if (data.reason === 1) { // If "Other" selected.
                    if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                        errors.reasonOther = 'This field is required';
                    }
                }
            }
        }
        else if (data.willAction === 1) {
            if (data.comment === undefined || data.comment === null || data.comment === "") {
                errors.comment = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 2 of `Action Incident Item` (#3) task.
 */
export function validateTask4Step2Input(data) {
    let errors = {};

    if (data.willAction === undefined || data.willAction === null || data.willAction === "" || isNaN(data.willAction)) {
        errors.willAction = 'This field is required';
    } else {
        if (data.willAction === 0) {
            if (data.reason === undefined || data.reason === null || data.reason === "" || isNaN(data.reason)) {
                errors.reason = 'This field is required';
            } else {
                if (data.reason === 1) { // If "Other" selected.
                    if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                        errors.reasonOther = 'This field is required';
                    }
                }
            }
        }
        else if (data.willAction === 1) {
            if (data.comment === undefined || data.comment === null || data.comment === "") {
                errors.comment = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


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
