// import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import shortid from "shortid";


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
    onSelectChange
}) => {
    const id = shortid.generate();

    // // Generate our help ID variable used for ``aria``..
    // const helpID = id + "-help";

    const selectedOption = getSelectedOption(options, value)

    // Render our output for this component.
    return (
        <div className={classnames("form-group", { 'has-error': error } )}>
            <label className="control-label">{label}</label>

            <Select
                key={id}
                className={classnames('form-control', { 'is-invalid': error })}
                name={name}
                value={selectedOption}
                onChange={onSelectChange}
                options={options}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}
