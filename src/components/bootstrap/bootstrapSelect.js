import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';


export const BootstrapSelectOption = ({ label, value, selectedValues }) => {
    const selectedValuesLength = selectedValues.length;
    for (let i = 0; i < selectedValuesLength; i++) {
        let selectedValue = selectedValues[i];
        if (selectedValue === value) {
            return (
                <option key={value} value={value} selected={true}>
                    {label}
                </option>
            )
        }
    }
    return (
        <option key={value} value={value} selected={false}>{label}</option>
    )
}


export const BootstrapSelect = ({
    id, field, label, allowMultipleSelect, defaultOptionLabel=null, selectedValues = null, options, helpText, error, onChange
}) => {

    // Go through all our options to (1) generate the HTML options for the
    // HTML select and (2) pick the options which were selected.
    let elements = [];
    const optionsLength = options.length;
    for (let i = 0; i < optionsLength; i++) {
        let option = options[i];
        elements.push(
            <BootstrapSelectOption
                label={option.label}
                value={option.value}
                selectedValues={selectedValues}
            />
        );
    }

    // Generate our help ID variable used for ``aria``..
    const helpID = id + "-help";

    // Render our output for this component.
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select multiple={allowMultipleSelect} className="form-control" id={id} name={field} onChange={onChange}>
                {defaultOptionLabel&&<option>{defaultOptionLabel}</option>}
                {elements}
            </select>
            <small id={helpID} className="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
