import PropTypes from 'prop-types';
import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../bootstrap/bootstrapInput";


class RegisterComponent extends React.Component {
    render() {
        const { hasSignedTos, errors, email, password, passwordRepeat, firstName, lastName, referralCode, onTextChange, onCheckboxChange, onSubmit, isLoading } = this.props;

        return (
            <main id="main" role="main">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/"><i className="fas fa-home"></i>&nbsp;Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                             <i className="fas fa-user"></i>&nbsp;Register
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form onSubmit={onSubmit}>
                            <h1>Join and grow with us</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="email"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.password}
                                label="Password (*)"
                                onChange={onTextChange}
                                value={password}
                                name="password"
                                type="password"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.passwordRepeat}
                                label="Password Repeat (*)"
                                onChange={onTextChange}
                                value={passwordRepeat}
                                name="passwordRepeat"
                                type="password"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.firstName}
                                label="First Name (*)"
                                onChange={onTextChange}
                                value={firstName}
                                name="firstName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.lastName}
                                label="Last Name (*)"
                                onChange={onTextChange}
                                value={lastName}
                                name="lastName"
                                type="text"
                            />

                            {referralCode && <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.referralCode}
                                label="Referral code"
                                onChange={onTextChange}
                                value={referralCode}
                                name="referralCode"
                                type="text"
                                helpText="Where you referred by anyone? If so, enter their referral code here to get discounts."
                            />}

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.hasSignedTos}
                                label="I agree to the terms of service (*)"
                                onChange={onCheckboxChange}
                                checked={hasSignedTos}
                                name="hasSignedTos"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg" disabled={isLoading}>
                                    Sign up
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        );
    }
}


RegisterComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    // error: PropTypes.string,
    // onTextChange: PropTypes.func.isRequired,
    // onSubmit: PropTypes.func.isRequired,
}

export default RegisterComponent
