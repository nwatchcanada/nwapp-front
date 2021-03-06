// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { WILL_ACTION_CHOICES, NOT_ACTIONING_CONCERN_ITEM_REASON_CHOICES } from "../../../constants/api";


class AssignWatchAssociateTaskStep1Component extends Component {
    render() {
        const { willAction, comment, reason, reasonOther, slug, errors, onTextChange, onSelectChange, onRadioChange, isLoading, onClick } = this.props;
        const isOtherHowDidYouHearSelected = reason === 1;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task #1
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Argyle</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/3/${slug}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Action</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-vote-yea"></i>&nbsp;Action Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.willAction}
                                label="Will NW staff be replying directly to this concern? (*)"
                                name="willAction"
                                onChange={onRadioChange}
                                selectedValue={willAction}
                                options={WILL_ACTION_CHOICES}
                            />

                            {willAction === 0 &&
                                <BootstrapSingleSelect
                                    borderColour="border-primary"
                                    label="Why will you not be responding directly to this concern? (*)"
                                    name="reason"
                                    defaultOptionLabel="Please select how you heard about us."
                                    options={NOT_ACTIONING_CONCERN_ITEM_REASON_CHOICES}
                                    value={reason}
                                    error={errors.reason}
                                    onSelectChange={onSelectChange}
                                />
                            }

                            {willAction === 1 &&
                                <BootstrapTextarea
                                    name="comment"
                                    borderColour="border-primary"
                                    label="Comment (*)"
                                    placeholder="Write any additional text here."
                                    rows="5"
                                    value={comment}
                                    helpText=""
                                    onChange={onTextChange}
                                    error={errors.comment}
                                />
                            }

                            {isOtherHowDidYouHearSelected &&
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
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to={`/task/3/${slug}/step-1`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AssignWatchAssociateTaskStep1Component;
