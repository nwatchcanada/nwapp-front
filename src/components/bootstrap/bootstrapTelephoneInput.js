import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";
import NumberFormat from 'react-number-format';


/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 *
 * boarderColour - Value sets whether to render the input field as having either
 *                 a blue boarder if required or a green boarder if successful
 *                 validation or optional field. Note that if validation failed
 *                 then the border colour will be red.
 */
export const BootstrapTelephoneInput = ({
    name,
    type,
    label,
    placeholder,
    value,
    helpText,
    onChange,
    error,
    inputClassName = "form-group",
    divClassName = "form-group",
    borderColour = '',
    disabled = false
}) => {
    const helpID = shortid.generate + "-help";
    return (
        <div className={classnames(divClassName, { 'has-error': error })}>
            <label htmlFor={name} className="control-label">{label}</label>
            <NumberFormat
                format="+1 (###) ###-####"
                mask="_"
                className={classnames(inputClassName, { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )}
                key={shortid.generate}
                name={name}
                type={type}
                aria-describedby={helpID}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            { /*
            <input
                className={classnames(inputClassName, { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )}
                key={shortid.generate}
                name={name}
                type={type}
                aria-describedby={helpID}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            */ }
            <small id={helpID} className="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


BootstrapTelephoneInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    // checkUserExists: PropTypes.func
    inputClassName: PropTypes.string.isRequired,
    divClassName: PropTypes.string,
    borderColour: PropTypes.string,
    disabled: PropTypes.bool
}


BootstrapTelephoneInput.defaultProps = {
    type: 'text'
}
