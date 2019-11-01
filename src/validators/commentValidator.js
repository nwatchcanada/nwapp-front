import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    ASSOCIATE_GROUP_ID
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    if (data.text === undefined || data.text === null || data.text === "") {
        errors.text = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
