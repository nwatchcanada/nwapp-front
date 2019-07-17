// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";


export default class MemberCreateStep6Component extends Component {
    render() {
        const {
            returnURL, agreement, onCheckboxChange, errors, isLoading, onClick
        } = this.props;
        return (
            <main id="main" role="main">
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Register
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/register/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={returnURL}>
                                <span className="num">2.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/register/step-3">
                                <span className="num">3.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/register/step-4">
                                <span className="num">4.</span><span className="">Watch</span>
                            </Link>
                        </div>
                         <div id="step-5" className="st-grey">
                            <Link to="/register/step-5">
                                <span className="num">5.</span><span className="">Metrics</span>
                            </Link>
                        </div>
                         <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num">5.</span><span className="">Legality</span>
                            </strong>
                        </div>
                        <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-balance-scale"></i>&nbsp;Legality
                            </h2>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p>To become a member of Neighbourhood Watch, the following terms must be agreed upon:</p>
                            <p>
                                <ul>
                                    <li>
                                        <a href="/terms" target="_blank" rel="noopener noreferrer">
                                            Terms and Conditions&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/privacy" target="_blank" rel="noopener noreferrer">
                                            Privacy Policy&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </li>
                                </ul>
                            </p>
                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.agreement}
                                label="I agree to the terms"
                                onChange={onCheckboxChange}
                                value={agreement}
                                name="agreement"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Proceed to Review&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/register/step-5" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
