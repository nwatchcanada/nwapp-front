import React from 'react';
import { Link } from "react-router-dom";


class ResetPasswordSuccessComponent extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                    <img className="img-fluid" src="/img/nwl-logo.png" alt="Logo" width="180px" /></div>
                </div>

                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <h2 className="text-center mb-3">Succesfull Password Reset</h2>
                        <form id="sign-in" className="form-signin needs-validation">
                            <p>Your password has been reset, please go to the dashboard to begin using the system.</p>

                            <h5 className="text-center mt-3 mb-3">
                                <Link to="/dashboard" className="text-primary plain-link">
                                    <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                                </Link>
                            </h5>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPasswordSuccessComponent
