// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";


export default class AssociateCreateStep1Component extends Component {
    render() {
        const { firstName, lastName, email, phone, errors, onTextChange, isLoading, onClick } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/associates/active"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add Form</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num">1.</span><span className="">Search</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Results</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h3>Search for existing area coordinator:</h3>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.firstName}
                                label="First Name"
                                onChange={onTextChange}
                                value={firstName}
                                name="firstName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.lastName}
                                label="Last Name"
                                onChange={onTextChange}
                                value={lastName}
                                name="lastName"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.phone}
                                label="Phone"
                                onChange={onTextChange}
                                value={phone}
                                name="phone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="E-mail"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="text"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-search"></i>&nbsp;Search
                                </button>
                                <Link to="/associates/active" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <h3 className="p-2">- or -</h3>
                    <a href="/area-coordinators/add/step-1" role="button" target="_blank">
                        Add New Area Coordinator&nbsp;<i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </main>
        );
    }
}
