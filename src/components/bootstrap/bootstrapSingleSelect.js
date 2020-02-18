// import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import shortid from "shortid";
import DOMPurify from "dompurify";


/**
 *  Utility function used to find the "option" for the inputted parameter "value".
 */
export function getSelectedOption(options, value) {
    if (options !== null && options !== undefined) {
        const optionsLength = options.length;
        for (let i = 0; i < optionsLength; i++ ) {
            let option = options[i];
            if (option.value === value) {
                return option
            }
        }
    }
    return null;
}


/**
 *  Primitive boostrap select element.
 */
export const BootstrapSingleSelect = ({
    label,
    name,
    options,
    defaultOptionLabel=null,
    value = null,
    helpText = null,
    error,
    onSelectChange,
    borderColour="border-primary",
    isLoading = false
}) => {
    const id = shortid.generate();

    // // Generate our help ID variable used for ``aria``..
    // const helpID = id + "-help";

    const selectedOption = getSelectedOption(options, value)

    // Set the border color based on text.
    const borderColourHex = borderColour === "border-primary" ? "#007bff"  : "#28a745";

    // Generate our custom style.
    const customStyles = {
        container: (base) => ({
            ...base,
            fontSize: '1.25rem',
		    lineHeight: '1.72'
        }),
        control: (base, state) => ({
            ...base,
            borderColor: error ? 'red': borderColourHex,
            boxShadow: error ? state.isFocused ? '0 0 0 2px rgba(255,0,0,0.3)' : null : state.isFocused ? '0 0 0 2px rgba(0,123,255,0.3)' : null,
            "&:hover": {
                borderColor: error ? 'red': borderColourHex
            }
        })
    }
    // console.log("error: ", error);
    // console.log(helpText);

    // Render our output for this component.
    return (
        <div className={classnames("form-group", { 'has-error': error } )}>
            <label className="control-label">{label}</label>

            <Select
                key={id}
                className={classnames('react-select', { 'is-invalid': error })}
                name={name}
                value={selectedOption}
                onChange={onSelectChange}
                options={options}
                styles={customStyles}
                isLoading={isLoading}
            />
            {helpText && <small id={shortid.generate()} className="form-text text-muted" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(helpText) }}></small>}
            {error && <div className="invalid-feedback" style={{display: 'block'}}>{error}</div>}
        </div>
    )
}
