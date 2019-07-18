import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInputGroup } from '../../bootstrap/bootstrapInputGroup';


class ResetPasswordComponent extends React.Component {
    render() {
        const { password, passwordConfirmation, onChange, onSubmit, errors = {}, isLoading } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <BootstrapErrorsProcessingAlert errors={errors} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 text-center">
                    <img className="img-fluid" src="/img/nwl-logo.png" alt="Logo" width="180px" /></div>
                </div>

                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <h2 className="text-center mb-3">Reset Password</h2>
                        <form id="sign-in" className="form-signin needs-validation" onSubmit={onSubmit}>
                            {errors.nonFieldErrors && <div className="alert alert-danger" role="alert">{errors.nonFieldErrors}</div>}

                            <BootstrapInputGroup
                                layoutSize="large"
                                labelIconClassName="fa fa-lock color-blue"
                                name="password"
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={onChange}
                                disabled={isLoading}
                                error={errors.password}
                            />

                            <BootstrapInputGroup
                                layoutSize="large"
                                labelIconClassName="fa fa-lock color-blue"
                                name="passwordConfirmation"
                                type="password"
                                placeholder="Repeat New Password"
                                value={passwordConfirmation}
                                onChange={onChange}
                                disabled={isLoading}
                                error={errors.password}
                            />

                            <div className="custom-control custom-checkbox mb-1 mt-1"></div>

                            <input
                                type="submit"
                                value="Save Password and Continue"
                                className="btn btn-lg btn-primary btn-block"
                                disabled={isLoading}
                            />
                            <h5 className="text-center mt-3 mb-3">
                                <Link to="/" className="text-primary plain-link">Cancel</Link>
                            </h5>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPasswordComponent
