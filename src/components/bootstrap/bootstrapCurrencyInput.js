import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";
import NumberFormat from 'react-number-format';
import DOMPurify from "dompurify";


export const BootstrapCurrencyInput = ({
    name,
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
                thousandSeparator={true}
                prefix={'$'}
                className={classnames(inputClassName, { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )}
                key={shortid.generate}
                name={name}
                aria-describedby={helpID}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                fixedDecimalScale={true}
                decimalScale={2}
            />
            <small id={helpID} className="form-text text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(helpText) }}></small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


BootstrapCurrencyInput.propTypes = {
    name: PropTypes.string.isRequired,
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
