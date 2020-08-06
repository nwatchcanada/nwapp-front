import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import i18n from "i18next";

/**
 *  Validator will validate the login form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = i18n.t('This field is required');
        errors.nonFieldErrors = i18n.t('Please fill in the email');
    }
    if (data.password === undefined || data.password === null || validator.isEmpty(data.password) || data.password === "") {
        errors.password = i18n.t('This field is required');
        if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
            errors.nonFieldErrors = i18n.t('Email & Password are required.');
        } else {
            errors.nonFieldErrors = i18n.t('Please fill in the password');
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
