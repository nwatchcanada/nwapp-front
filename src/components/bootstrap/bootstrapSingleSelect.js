// import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import shortid from "shortid";
import PropTypes from 'prop-types';


/**
 *  Utility function used to find the "option" for the inputted parameter "value".
 */
function getSelectedOption(options, value) {
    const optionsLength = options.length;
    for (let i = 0; i < optionsLength; i++ ) {
        let option = options[i];
        if (option.value === value) {
            return option
        }
    }
    return null;
}


export const BootstrapSingleSelect = ({
    label,
    name,
    options,
    defaultOptionLabel=null,
    value = null,
    helpText,
    error,
    onSelectChange,
}) => {
    const id = shortid.generate();

    // // Generate our help ID variable used for ``aria``..
    // const helpID = id + "-help";

    const selectedOption = getSelectedOption(options, value)

    const customStyles = {
        container: (base) => ({
            ...base,
            fontSize: '1rem'
        }),
        control: (base, state) => ({
            ...base,
            borderColor: error ? 'red': '#007bff',
            boxShadow: error ? state.isFocused ? '0 0 0 2px rgba(255,0,0,0.3)' : null : state.isFocused ? '0 0 0 2px rgba(0,123,255,0.3)' : null,
            "&:hover": {
                borderColor: error ? 'red': '#007bff'
            }
        })
    }
    // console.log("error: ", error);

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
            />
            {error && <div className="invalid-feedback" style={{display: 'block'}}>{error}</div>}
        </div>
    )
}
