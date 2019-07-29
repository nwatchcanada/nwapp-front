// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AREA_COORDINATOR_GROUP_ID, ASSOCIATE_GROUP_ID } from "../../../constants/api";

import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";


export default class AreaCoordinatorPromoteStep1Component extends Component {
    render() {
        const {
            slug, onClick, isLoading, errors, onPoliceCheckDateChange, onCheckboxChange,
            groupId, associateAgreement
        } = this.props;
        const isAssociate = groupId === ASSOCIATE_GROUP_ID;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/area-coordinators"><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/area-coordinator/${slug}/full`}><i className="fas fa-horse-head"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Area Coordinator</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Agreement</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Review</span>
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
                                error={errors.associateAgreement}
                                label="I agree to the Associate agreement."
                                onChange={onCheckboxChange}
                                value={associateAgreement}
                                name="associateAgreement"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Proceed to Review&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to={`/area-coordinator/${slug}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
