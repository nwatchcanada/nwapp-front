import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";
import { RegionDropdown } from 'react-country-region-selector';


export const BootstrapRegionSelect = ({
    name, label, placeholder, value, helpText, onChange, error,  borderColour = '', priorityOptions = [], country
}) => {
    const id = shortid.generate();
    const helpID = id + "-help";
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label htmlFor={name} className="control-label">{label}</label>
            <RegionDropdown
                key={id}
                name={name}
                value={value}
                onChange={onChange}
                priorityOptions={priorityOptions}
                className={classnames('form-control', { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )}
                placeholder={placeholder}
                country={country}
            />
            <small id={helpID} className="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

BootstrapRegionSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    borderColour: PropTypes.string,
    priorityOptions: PropTypes.array,
    country: PropTypes.string,
}

// BootstrapRegionSelect.defaultProps = {
//     type: 'text'
// }
