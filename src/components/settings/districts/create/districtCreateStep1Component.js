// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";


class DistrictCreateStep1Component extends Component {
    render() {
        const { name, errors, onTextChange, isLoading, onClick } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/districts"><i className="fas fa-map"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>Create District - Select Type</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num">1.</span><span className="">Select Type</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Details</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                        { /* <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Skills Required</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                        */ }
                    </div>
                </div>

                <div className="card-group row">
                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-home fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Residential</h3>
                                <p className="card-text">Add a residential district</p>
                                <Link to="/settings/district/step-2-create-rez" className="btn btn-success btn-lg">
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-building fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Business</h3>
                                <p className="card-text">Add a business district</p>
                                <Link to="#" className="btn btn-success btn-lg">
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-university fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Community Cares</h3>
                                <p className="card-text">Add a community cares district</p>
                                <Link to="#" className="btn btn-success btn-lg">
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">

                    <Link to="/settings/districts" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                        <i className="fas fa-arrow-left"></i> Back
                    </Link>
                </div>

            </main>
        );
    }
}

export default DistrictCreateStep1Component;
