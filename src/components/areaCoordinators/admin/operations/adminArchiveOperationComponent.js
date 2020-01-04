// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import {
    ARCHIVE_REASON_CHOICES
} from '../../../../constants/api';


export default class AreaCoordinatorArchiveOperationComponent extends Component {
    render() {
        // Common
        const { reason, reasonOther, comment, slug, errors, onTextChange, onSelectChange, isLoading, onClick, areaCoordinator } = this.props;
        const isReasonOther = reason === 1;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/area-coordinators`}><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/area-coordinator/${slug}/operations`}><i className="fas fa-user"></i>&nbsp;{areaCoordinator && areaCoordinator.fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-archive"></i>&nbsp;Archive
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-archive"></i>&nbsp;Archive AreaCoordinator</h1>
                            <p>You are about to <strong>archive the areaCoordinator</strong> this means the areaCoordinator will be in a read-only state and the areaCoordinator cannot create work orders for our associates. Please explain why. All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Reason(*)"
                                name="reason"
                                defaultOptionLabel="Please select the reason."
                                options={ARCHIVE_REASON_CHOICES}
                                value={reason}
                                error={errors.reason}
                                onSelectChange={onSelectChange}
                                disabled={isLoading}
                            />

                            {isReasonOther &&
                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.reasonOther}
                                    label="Reason (other) (*)"
                                    onChange={onTextChange}
                                    value={reasonOther}
                                    name="reasonOther"
                                    type="text"
                                />
                            }

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-primary"
                                label="Additional Comments (*)"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This is the comment with additional details."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/area-coordinator/${slug}/operations`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
