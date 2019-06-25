// import PropTypes from 'prop-types';
import React from 'react';
// import classnames from 'classnames';
import shortid from "shortid";


/**
 * Primitive bootstrap radio button integrated with the bootstrap theme.
 *
 * Option: [
 *   { id: 'ok-text', name: 'ok-text', value: 'Yes', label: 'Yes', defaultChecked: false, },
 *   { id: 'ok-text2', name: 'ok-text', value: 'No', label: 'No', defaultChecked: false, }
 * ];
 */
export const BootstrapRadio = ({
    selectedValue,
    onChange,
    options,
    name,
    label = "Please select either option.",
}) => {
    const id = shortid.generate();
    return (
        <div className="form-group mt-2 mb-4" id={id} onChange={ (event)=>{ onChange(event) }  }>
            <p className="mb-1">{label}</p>
            {options && options.map(
                (optionDatum, i) => <RadioChoiceOption name={name} selectedValue={selectedValue} choiceOption={optionDatum} key={i} />)
            }
        </div>
    );
}

export const RadioChoiceOption = ({
    name, selectedValue, choiceOption
}) => {

    // Select the selected value.
    let defaultChecked = false;
    if (selectedValue !== null && selectedValue !== undefined) {
        defaultChecked = selectedValue.toString() === choiceOption.value.toString();
    }

    // DEVELOPERS NOTE:
    // - We can use the 'data-' attribute for our custom attributes in our JSX code.
    // - We can call these custom attributes in our container using `dataset`,
    //   for more details see this link via // Note: https://stackoverflow.com/a/20383295.
    return (
        <div className="form-radio custom-control custom-radio custom-control-inline">
            <input data-label={choiceOption.label} defaultChecked={defaultChecked} type="radio" id={choiceOption.id} name={name} value={choiceOption.value} className="custom-control-input form-check-input" required />
            <label className="custom-control-label form-check-label" htmlFor={choiceOption.id}>
                {choiceOption.label}
            </label>
        </div>
    );
}
