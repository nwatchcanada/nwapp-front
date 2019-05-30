// import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";


/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 *
 * boarderColour - Value sets whether to render the input field as having either
 *                 a blue boarder if required or a green boarder if successful
 *                 validation or optional field. Note that if validation failed
 *                 then the border colour will be red.
 */
export const BootstrapCheckbox = ({
    name,
    label,
    value,
    helpText,
    onChange,
    error,
    inputClassName = "form-check-input",
    divClassName = "form-group form-check",
    borderColour = '',
    disabled = false
}) => {
    const id = shortid.generate();
    const helpID = id + "-help";
    return (
        <div className={classnames(divClassName, { 'has-error': error })}>
            <input type="checkbox" id={id} name={name} onChange={onChange} checked={value} className={classnames(inputClassName, { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )} />
            <label className="form-check-label" htmlFor={id}>{label}</label>
            <small id={helpID} className="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
