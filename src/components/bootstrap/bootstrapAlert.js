import PropTypes from 'prop-types';
import React from 'react';
import { startCase } from 'lodash';

/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 */
export const BootstrapAlert = ({ value, type }) => {
    const theClassName = "alert alert-" + type;
    return (
        <div className={theClassName} role="alert">
            {value}
        </div>
    )
}

BootstrapAlert.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

BootstrapAlert.defaultProps = {
    type: 'text'
}


/**
 *  A bootstrap alert which takes the `errors` dictionary provided by the
 *  mikaponics API web-service and generates a custom alert message for our
 *  applications forms.
 */
export const BootstrapErrorsProcessingAlert = ({ errors }) => {
    // STEP 1: Check to see if we have ANY errors returned from the API
    //         web-service and if no errors were returned then our stateless
    //         component will return nothing.
    if (errors === null || errors === undefined) {
        return null;
    }
    if (Object.keys(errors).length === 0) {
        return null;
    }

    let array = [];

    // STEP 2: Iterate through all the "fields" and "non_field_errors" that
    //         our Django REST application returned.
    Object.keys(errors).forEach(key => {
        // STEP 3: Process a single "field" or "non_field_errors" and
        //         then get our value.
        let startKey = startCase(key);
        let value = errors[key];
        // console.log(key, value); // For debugging purposes only.

        // STEP 4: Generate the error row if the value accomponying it is not blank.
        if (value !== undefined && value !== null) {
            array.push(
                <p>
                    <strong>{startKey}:</strong>&nbsp;{value}
                </p>
            );
        }
    });

    // STEP 5: Render our processed error list.
    return (
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error(s):</h4>
            {array}
            <hr />
            <p>Please make sure the above error(s) have been fixed before submitting again</p>
        </div>
    )
}

BootstrapErrorsProcessingAlert.propTypes = {
    errors: PropTypes.object.isRequired,
}

BootstrapErrorsProcessingAlert.defaultProps = {
    type: 'text'
}
