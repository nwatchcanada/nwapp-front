import PropTypes from 'prop-types';
import React from 'react';

import { BootstrapAlert } from "./bootstrap/bootstrapAlert";


export const FlashMessageComponent = ({ object }) => {

    // The following code will check to see if we have a flash message and
    // if we do then render it here else return nothing.
    if (object !== undefined && object !== null) {
        const keys = Object.keys(object);
        const count = keys.length;
        if (count > 0) {
            return (
                <BootstrapAlert type={object.typeOf} value={object.text} />
            )
        }
    }
    return null
}

FlashMessageComponent.propTypes = {
    object: PropTypes.object,
}

FlashMessageComponent.defaultProps = {
    object: null
}
