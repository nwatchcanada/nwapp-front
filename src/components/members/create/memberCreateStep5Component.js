// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapDatePicker } from "../../bootstrap/bootstrapDatePicker";


class MemberCreateStep5Component extends Component {
    render() {
        const { returnURL, dateOfBirth, howDidYouHear, howDidYouHearOptions, howDidYouHearOther, errors, onTextChange, onSelectChange, onDOBDateTimeChange, isLoading, onClick } = this.props;
        const isOtherHowDidYouHearSelected = howDidYouHear === 'Other';
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
                         <div id="step-5" className="st-grey active">
                            <span className="num">5.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapDatePicker
                                label="Date of Birth (*)"
                                name="dateOfBirth"
                                dateObj={dateOfBirth}
                                onTimeChange={onDOBDateTimeChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.dateOfBirth}
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="How did you hear about us? (*)"
                                name="howDidYouHear"
                                defaultOptionLabel="Please select how the member heard about us."
                                options={howDidYouHearOptions}
                                value={howDidYouHear}
                                error={errors.howDidYouHear}
                                onSelectChange={onSelectChange}
                            />

                            {isOtherHowDidYouHearSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.howDidYouHearOther}
                                    label="Other (*)"
                                    onChange={onTextChange}
                                    value={howDidYouHearOther}
                                    name="howDidYouHearOther"
                                    type="text"
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
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

export default MemberCreateStep5Component;
