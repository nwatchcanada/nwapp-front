// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import {
    EXECUTIVE_GROUP_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID
} from '../../../../constants/api';
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminStaffOperationsComponent extends Component {
    render() {
        const { slug, staff, user, errors, flashMessage, isLoading, onAddJobClick } = this.props;
        const isActiveState = staff.state === "active";
        const isFrontlineStaff = staff.roleId === FRONTLINE_STAFF_ROLE_ID;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/staff`}><i className="fas fa-user-check"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}</h1>

                {staff.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This staff is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/staff/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/staff/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        { /*
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/staff/${slug}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        */ }
                        <div id="step-4" className="st-grey">
                            <Link to={`/admin/staff/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/staff/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        {/*
                        <div id="step-6" className="st-grey">
                            <Link to={`/admin/staff/${slug}/community/score-points`}>
                                <span className="num"><i className="fas fa-smile"></i>&nbsp;</span><span className="">Community</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-7" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card-group row">
                            {isFrontlineStaff &&
                                <div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-star fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Promote</h3>
                                            <p className="card-text">Promote the staff to become a <strong>management staff</strong> member in our system.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link className="btn btn-success btn-lg" onClick={onAddJobClick}>
                                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-star-half fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Demote</h3>
                                        <p className="card-text">Demote the staff in our system.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link className="btn btn-success btn-lg" to={`/admin/staff/${slug}/demote/step-1`}>
                                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {isActiveState
                                ?<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-archive fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Archive</h3>
                                            <p className="card-text">This will make the staff <strong>inactive</strong>.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/admin/staff/${slug}/archive`} className="btn btn-success btn-lg">
                                                Go&nbsp;<i className="fas fa-chevron-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                :<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-box-open fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Unarchive</h3>
                                            <p className="card-text">This will make the staff <strong>active</strong>.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/admin/staff/${slug}/unarchive`} className="btn btn-success btn-lg">
                                                Go&nbsp;<i className="fas fa-chevron-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-scroll fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Score Points</h3>
                                        <p className="card-text">View and edit details pertaining to score points.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/admin/staff/${slug}/community/score-points`} className="btn btn-success btn-lg">
                                            Go&nbsp;<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-id-card fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Badges</h3>
                                        <p className="card-text">View and edit details pertaining to badges.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/admin/staff/${slug}/community/badges`} className="btn btn-success btn-lg">
                                            Go&nbsp;<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-trophy fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Awards</h3>
                                        <p className="card-text">View and edit details pertaining to awards.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/admin/staff/${slug}/community/awards`} className="btn btn-success btn-lg">
                                            Go&nbsp;<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/*
                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-trash-alt fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Permanently Delete Staff</h3>
                                        <p className="card-text">Delete data from the database.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/staff/${slug}/delete`} className="btn btn-success btn-lg">
                                            Go&nbsp;<i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            */}

                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-key fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Change Password</h3>
                                        <p className="card-text">Change the staff's password.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link className="btn btn-success btn-lg" to={`/admin/staff/${slug}/password`}>
                                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </main>
        );
    }
}


/**
 *  Function will take the tag value which was selected and find print it with
 *  the label from the tagOptions data.
 */
class TagItem extends Component {
    render() {
        const { tag, tagOptions } = this.props;
        for (let i = 0; i < tagOptions.length; i++) {
            let tagOption = tagOptions[i];
            if (tagOption.value === tag) {
                return (
                    <span className="badge badge-info badge-lg" value={tag}>{tagOption.label}</span>
                );
            }
        }
        return (null);
    };
}


/**
 *  Function will take the howDidYouHear value which was selected and find
 * print it with the label from the howDidYouHearOptions data.
 */
class HowDidYouHearText extends Component {
    render() {
        const { howDidYouHear, howDidYouHearOther, howDidYouHearOptions } = this.props;
        if (howDidYouHearOther !== null && howDidYouHearOther !== undefined && howDidYouHearOther !== "") {
            return howDidYouHearOther;
        }
        for (let i = 0; i < howDidYouHearOptions.length; i++) {
            let howDidYouHearOption = howDidYouHearOptions[i];
            if (howDidYouHearOption.value === howDidYouHear) {
                return (
                    <span value={howDidYouHear}>{howDidYouHearOption.label}</span>
                );
            }
        }
        return (null);
    };
}
