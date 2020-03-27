// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FRONTLINE_STAFF_ROLE_ID, MANAGEMENT_ROLE_ID } from "../../../../constants/api";
import { BootstrapCheckbox } from "../../../bootstrap/bootstrapCheckbox";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { UserTypeOfIconHelper } from "../../../../constants/helper";


export default class AdminAssociatePromoteOperationStep2Component extends Component {
    render() {
        const {
            slug, associate, onClick, isLoading, errors, onPoliceCheckDateChange, onCheckboxChange,
            roleId, staffAgreement, conflictOfInterestAgreement, codeOfConductAgreement, confidentialityAgreement, associateAgreement, policeCheckDate,
        } = this.props;
        const isStaff = roleId === FRONTLINE_STAFF_ROLE_ID || roleId === MANAGEMENT_ROLE_ID;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/associates"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/associate/${slug}/operations`}><UserTypeOfIconHelper typeOfId={associate && associate.typeOf} />&nbsp;{associate && associate.fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Associate</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <span className="num">1.</span><span className="">
                                <Link to={`/admin/associate/${slug}/promote/step-1`}>Selection</Link>
                            </span>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Agreement</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <h4><i className="fas fa-file-signature"></i>&nbsp;Agreement</h4>

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.conflictOfInterestAgreement}
                                label="I agree to the Conflict of Interest agreement."
                                onChange={onCheckboxChange}
                                value={conflictOfInterestAgreement}
                                name="conflictOfInterestAgreement"
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.codeOfConductAgreement}
                                label="I agree to the Code of Conduct agreement."
                                onChange={onCheckboxChange}
                                value={codeOfConductAgreement}
                                name="codeOfConductAgreement"
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.confidentialityAgreement}
                                label="I agree to the Confidentiality agreement."
                                onChange={onCheckboxChange}
                                value={confidentialityAgreement}
                                name="confidentialityAgreement"
                            />

                            {isStaff &&
                                <BootstrapCheckbox
                                    inputClassName="form-check-input form-check-input-lg"
                                    borderColour="border-success"
                                    error={errors.staffAgreement}
                                    label="I agree to the staff agreement. (*)"
                                    onChange={onCheckboxChange}
                                    value={staffAgreement}
                                    name="staffAgreement"
                                />
                            }

                            <h4><i className="fas fa-user-shield"></i>&nbsp;Policy</h4>

                            <BootstrapDatePicker
                                label="Police Check Date (*)"
                                name="policeCheckDate"
                                dateObj={policeCheckDate}
                                onTimeChange={onPoliceCheckDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.policeCheckDate}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to={`/admin/associate/${slug}/promote/step-1`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
