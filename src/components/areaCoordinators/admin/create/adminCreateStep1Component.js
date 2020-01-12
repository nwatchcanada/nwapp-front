import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapTelephoneInput } from "../../../bootstrap/bootstrapTelephoneInput";


class AdminAreaCoordinatorCreateStep1Component extends Component {

    render() {
        const { onSearchClick, handleKeyDown, onAdvancedSearchClick, advancedSearchActive, onAdvancedSearchPanelToggle, onTextChange } = this.props;
        const { keyword, firstName, lastName, telephone, email, errors, isLoading } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/area-coordinators`}><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add Area Coordinator
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add Area Coordinator</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Search</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Results</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Agreement</span>
                        </div>
                    </div>
                </div>

                <div id="m-search" className="col-sm-5 mx-auto pt-4">

                    <div className="jumbotron">
                        <h1 className="display-4"><i className="fas fa-search"></i>&nbsp;Search Members</h1>
                        <p className="lead">To create an <strong>area coordinator</strong>, you will need to promote a <strong>member</strong> from our members list.</p>
                    </div>

                    <BootstrapErrorsProcessingAlert errors={errors} />

                    <form id="searchForm" className="needs-validation" noValidate>
                        <div className="input-group mb-2">

                            <input
                                type="text"
                                className="form-control form-control-lg border border-primary"
                                id="keyword"
                                name="keyword"
                                placeholder="Search..."
                                minLength="3"
                                required=""
                                value={keyword}
                                onChange={onTextChange}
								onKeyDown={handleKeyDown}
                            />

                            <div className="input-group-append">
                                <button className="btn btn-primary btn-lg" type="button" onClick={onSearchClick} >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <div id="search-error" className="invalid-feedback"></div>
                        </div>
                    </form>

                    <div className="col-md-12 text-center">
                        <h3 className="p-2">- or -</h3>
                        <button id="advance_search_btn"
                            className="btn btn-primary btn-lg"
                            type="button"
                            data-toggle="button"
                            style={{ display: advancedSearchActive ? "none" : "inline-block" }}
                            onClick = { onAdvancedSearchPanelToggle }>
                            Advanced Search
                        </button>
                        <button id="advance_search_btn_x"
                            className="btn btn-dark btn-lg"
                            type="button"
                            data-toggle="button"
                            style={{ display: advancedSearchActive ? "inline-block" : "none" }}
                            onClick = { onAdvancedSearchPanelToggle }>
                            <i className="fas fa-times"></i> Advanced Search
                        </button>
                        <div className="col-md-12 text-center">
                            <Link to="/admin/area-coordinators" className="btn btn-orange btn-lg mt-4 pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>
                    </div>
                </div>
                <div id="adv-search"
                    className="col-sm-5 mx-auto border-top mt-4"
                    style={{ display: advancedSearchActive ? "block" : "none" }}>
                    <p className="my-4"><strong>Please fill in atleast one field and hit search</strong></p>

                    <form id="advanced-searchForm" method="get" className="needs-validation" action="" noValidate>
                        <div className="form-row">
                            <div className="form-group col-md-12 mb-4">
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.firstName}
                                    label="First Name"
                                    onChange={onTextChange}
                                    value={firstName}
                                    name="firstName"
                                    type="text"
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
								<BootstrapTelephoneInput
									inputClassName="form-control form-control-lg"
									borderColour="border-primary"
									error={errors.telephone}
									label="Phone #"
									onChange={onTextChange}
									value={telephone}
									name="telephone"
									type="text"
									placeholder="+1 (xxx) xxx-xxxx"
									disabled={isLoading}
								/>
								<BootstrapInput
									inputClassName="form-control form-control-lg"
									borderColour="border-primary"
									error={errors.email}
									label="Email"
									onChange={onTextChange}
									value={email}
									name="email"
									type="text"
									disabled={isLoading}
								/>
                            </div>
                        </div>

                        <div className="form-group col-md-12 mb-3 mx-auto text-center">
                            <button className="btn btn-primary btn-lg btn-fxw mt-3" type="button" onClick={onAdvancedSearchClick}>
                                <i className="fas fa-search"></i>&nbsp;Search
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        );
    }
}

export default AdminAreaCoordinatorCreateStep1Component;
