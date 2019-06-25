// import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import shortid from "shortid";


/**
 *  Primitive boostrap select element.
 */
export const BootstrapMultipleSelect = ({
    label,
    name,
    options,
    defaultOptionLabel=null,
    selectedOptions = null,
    helpText,
    error,
    onMultiChange,
    borderColour="border-primary"
}) => {
    const id = shortid.generate();

    // // Generate our help ID variable used for ``aria``..
    // const helpID = id + "-help";

    // Set the border color based on text.
    const borderColourHex = borderColour === "border-primary" ? "#007bff"  : "#28a745";

    // Generate our custom style.
    const customStyles = {
        container: (base) => ({
            ...base,
            fontSize: '1rem'
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

    // Render our output for this component.
    return (
        <div className={classnames("form-group", { 'has-error': error } )}>
            <label className="control-label">{label}</label>

            <Select
                isMulti={true}
                key={id}
                className={classnames('react-select', { 'is-invalid': error })}
                name={name}
                value={selectedOptions}
                onChange={(...args) => onMultiChange(...args)}
                options={options}
                styles={customStyles}
            />
            {error && <div className="invalid-feedback" style={{display: 'block'}}>{error}</div>}
        </div>
    )
}
