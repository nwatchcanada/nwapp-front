// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";


class MemberCreateStep6Component extends Component {
    render() {
        const { returnURL, errors, isLoading, onClick } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/members/active"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Member
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/members/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={returnURL}>
                                <span className="num">2.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/members/add/step-3">
                                <span className="num">3.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/members/add/step-4">
                                <span className="num">4.</span><span className="">Watch</span>
                            </Link>
                        </div>
                         <div id="step-5" className="st-grey">
                            <Link to="/members/add/step-5">
                                <span className="num">5.</span><span className="">Metrics</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey active">
                            <span className="num">6.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-table"></i>&nbsp;Review
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Submit
                                </button>
                                <Link to="/members/add/step-4" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default MemberCreateStep6Component;
