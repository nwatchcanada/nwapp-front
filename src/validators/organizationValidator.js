import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.schema === undefined || data.schema === null || validator.isEmpty(data.schema) || data.schema === "") {
        errors.schema = 'This field is required';
    }
    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "") {
        errors.name = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }
    if (data.country === undefined || data.country === null || validator.isEmpty(data.country) || data.country === "") {
        errors.country = 'This field is required';
    }
    if (data.province === undefined || data.province === null || validator.isEmpty(data.province) || data.province === "") {
        errors.province = 'This field is required';
    }
    if (data.city === undefined || data.city === null || validator.isEmpty(data.city) || data.city === "") {
        errors.city = 'This field is required';
    }
    if (data.timezone === undefined || data.timezone === null || validator.isEmpty(data.timezone) || data.timezone === "") {
        errors.timezone = 'This field is required';
    }
    if (data.streetNumber === undefined || data.streetNumber === null || validator.isEmpty(data.streetNumber) || data.streetNumber === "") {
        errors.streetNumber = 'This field is required';
    }
    if (data.streetName === undefined || data.streetName === null || validator.isEmpty(data.streetName) || data.streetName === "") {
        errors.streetName = 'This field is required';
    }
    if (data.streetType === undefined || data.streetType === null || isNaN(data.streetType) || data.streetType === "") {
        errors.streetType = 'This field is required';
    } else {
        if (data.streetType === "Other" || data.streetType === 1 || data.streetType === "1") {
            if (data.streetTypeOther === undefined || data.streetTypeOther === null || validator.isEmpty(data.streetTypeOther) || data.streetTypeOther === "") {
                errors.streetTypeOther = 'This field is required';
            }
        }
    }
    if (data.postalCode === undefined || data.postalCode === null || validator.isEmpty(data.postalCode) || data.postalCode === "") {
        errors.postalCode = 'This field is required';
    }
    // if (data.latitude === undefined || data.latitude === null || data.latitude === "") {
    //     errors.latitude = "This field is required"
    // }
    // if (data.longitude === undefined || data.longitude === null || data.longitude === "") {
    //     errors.longitude = "This field is required"
    // }
    // if (data.zoom === undefined || data.zoom === null || data.zoom === "") {
    //     errors.zoom = "This field is required"
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
