import PropTypes from 'prop-types';
import React from 'react';
import { startCase } from 'lodash';
import shortid from "shortid";


/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 */
export const BootstrapAlert = ({ value, type }) => {
    const id = shortid.generate();
    const theClassName = "alert alert-" + type;
    return (
        <div className={theClassName} role="alert" key={id}>
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
export const BootstrapFiveStarRatingLabel = ({ score }) => {
    // STEP 1: Check to see if we have ANY errors returned from the API
    //         web-service and if no errors were returned then our stateless
    //         component will return nothing.
    if (score === null || score === undefined) {
        return null;
    }

    let elements = []

    if (score <= 0.0) {
        return (
            <div className="star-rating" data-rating="None">-</div>
        );
    }
    if (score <= 0.5 && score > 0) {
        elements.push(<span className="far fa-star-half" data-rating="0.5"></span>);
    }
    if (score <= 1.0 && score > 0.5) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
    }
    if (score <= 1.5 && score > 1.0) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star-half" data-rating="1.5"></span>);
    }
    if (score <= 2.0 && score > 1.5) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
    }
    if (score <= 2.5 && score > 2.0) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
        elements.push(<span className="far fa-star-half" data-rating="2.5"></span>);
    }
    if (score <= 3.0 && score > 2.5) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
        elements.push(<span className="far fa-star" data-rating="3"></span>);
    }
    if (score <= 3.5 && score > 3.0) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
        elements.push(<span className="far fa-star" data-rating="3"></span>);
        elements.push(<span className="far fa-star-half" data-rating="3.5"></span>);
    }
    if (score <= 4.0 && score > 3.5) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
        elements.push(<span className="far fa-star" data-rating="3"></span>);
        elements.push(<span className="far fa-star" data-rating="4"></span>);
    }
    if (score <= 4.5 && score > 4.0) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
        elements.push(<span className="far fa-star" data-rating="3"></span>);
        elements.push(<span className="far fa-star" data-rating="4"></span>);
        elements.push(<span className="far fa-star-half" data-rating="4.5"></span>);
    }
    if (score <= 5.0 && score > 4.5) {
        elements.push(<span className="far fa-star" data-rating="1"></span>);
        elements.push(<span className="far fa-star" data-rating="2"></span>);
        elements.push(<span className="far fa-star" data-rating="3"></span>);
        elements.push(<span className="far fa-star" data-rating="4"></span>);
        elements.push(<span className="far fa-star" data-rating="5"></span>);
    }

    // STEP 5: Render our processed error list.
    return (
        <div className="star-rating" data-rating={score}>
            {elements}
        </div>
    )
}
