import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";

/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 */
export const BootstrapInputGroup = (
    { layoutSize="regular", labelIconClassName, name, type, placeholder, value, helpText, onChange, error = null, disabled=false }
) => {
    const ariaID = shortid.generate + "-help";
    if (layoutSize === "small") {
        return (
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id={ariaID}>
                        <i className={labelIconClassName}></i>
                    </span>
                </div>
                <input
                    id={shortid.generate}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    className={classnames('form-control', { 'is-invalid': error })}
                    aria-label="Sizing example input"
                    aria-describedby={ariaID}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        );

    } else if (layoutSize === "regular") {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id={ariaID}>
                        <i className={labelIconClassName}></i>
                    </span>
                </div>
                <input
                    id={shortid.generate}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    className={classnames('form-control', { 'is-invalid': error })}
                    aria-label="Sizing example input"
                    aria-describedby={ariaID}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        );

    } else if (layoutSize === "large") {
        return (
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                    <span className="input-group-text" id={ariaID}>
                        <i className={labelIconClassName}></i>
                    </span>
                </div>
                <input
                    id={shortid.generate}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    className={classnames('form-control', { 'is-invalid': error })}
                    aria-label="Sizing example input"
                    aria-describedby={ariaID}
                    onChange={onChange}
                    disabled={disabled}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        );
    }
    return null;
}


BootstrapInputGroup.propTypes = {
    layoutSize:  PropTypes.string,
    labelIconClassName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    // checkUserExists: PropTypes.func
    disabled: PropTypes.boolean
}


BootstrapInputGroup.defaultProps = {
    type: 'text'
}
