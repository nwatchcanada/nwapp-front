import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";


export const BootstrapTextarea = ({ name, label, placeholder, rows=1, value, helpText, onChange, error,  borderColour = '' }) => {
    const id = shortid.generate();
    const helpID = id + "-help";
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label htmlFor={name} className="control-label">{label}</label>
            <textarea
                aria-describedby={helpID}
                placeholder={placeholder}
                className={classnames('form-control', { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )}
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
            />
            <small id={helpID} className="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

BootstrapTextarea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number.isRequired,
    value: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    borderColour: PropTypes.string,
}

BootstrapTextarea.defaultProps = {
    type: 'text'
}
