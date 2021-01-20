import React from 'react';
import { Link } from "react-router-dom";


class SendResetPasswordSuccessComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                    <img className="img-fluid" src="/img/nwl-logo.png" alt="Logo" width="180px" /></div>
                </div>

                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <h2 className="text-center mb-3">Password Reset Sent</h2>
                        <form id="sign-in" className="form-signin needs-validation">
                            <p>Your password reset has been sent to your email inbox which will grant you access to change your password. Please wait 24 hours for the email to be sent.</p>

                            <h5 className="text-center mt-3 mb-3">
                                <Link to="/" className="text-primary plain-link">
                                    <i className="fas fa-arrow-left"></i>&nbsp;Back
                                </Link>
                            </h5>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendResetPasswordSuccessComponent
