// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { OTHER_DEMOTION_REASON } from "../../../constants/api";


export default class AreaCoordinatorDemoteComponent extends Component {
    render() {
        const {
            slug, onClick, isLoading, errors, onTextChange,
            reason, reasonOptions, reasonOther, onSelectChange
        } = this.props;
        const isOtherReason = reason === OTHER_DEMOTION_REASON;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/area-coordinators`}><i className="fas fa-horse-head"></i>&nbsp;Area Coordinator</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/area-coordinators/${slug}`}><i className="fas fa-horse-head"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star-half"></i>&nbsp;Demote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star-half"></i>&nbsp;Demote Area Coordinator</h1>
                <h5>Please confirm before submitting the demote.</h5>

                <div className="col-md-5 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center">Details</h3>
                    <form id="business-form" method="post" className="needs-validation" action="" noValidate>
                        <div className="form-group">
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                label="Reason (*)"
                                name="reason"
                                defaultOptionLabel="Please select the reason for the demotion."
                                options={reasonOptions}
                                value={reason}
                                error={errors.reason}
                                onSelectChange={onSelectChange}
                            />

                            {isOtherReason &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.reasonOther}
                                    label="Other (*)"
                                    onChange={onTextChange}
                                    value={reasonOther}
                                    name="reasonOther"
                                    type="text"
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Confirm & Submit
                                </button>
                                <Link to={`/area-coordinators/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </div>
                    </form>
                </div>

            </main>
        );
    }
}
