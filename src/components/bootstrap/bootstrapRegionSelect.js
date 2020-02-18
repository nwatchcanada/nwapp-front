import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";
import { RegionDropdown } from 'react-country-region-selector';
import DOMPurify from "dompurify";


export const BootstrapProvinceSelect = ({
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
                className={classnames('custom-select', 'form-control-lg', { 'is-invalid': error }, { 'border-success': !error && borderColour === 'border-success' }, { 'border-primary': !error && borderColour === 'border-primary' } )}
                placeholder={placeholder}
                country={country}
            />
            <small id={helpID} className="form-text text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(helpText) }}></small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

BootstrapProvinceSelect.propTypes = {
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

// BootstrapProvinceSelect.defaultProps = {
//     type: 'text'
// }
