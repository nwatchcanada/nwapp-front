// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { AREA_COORDINATOR_ROLE_ID, ASSOCIATE_ROLE_ID } from "../../../../constants/api";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


export default class AdminStaffPromoteOperationStep2Component extends Component {
    render() {
        const { roleId, staff, policeCheckDate, errors, slug, onClick, isLoading } = this.props;

        let groupLabel = "Unknown";
        if (roleId === AREA_COORDINATOR_ROLE_ID) {
            groupLabel = "Area Coordinator";
        } else if (roleId === ASSOCIATE_ROLE_ID) {
            groupLabel = "Staff";
        }

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/staffs"><i className="fas fa-hat-wizard"></i>&nbsp;Staffs</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/staff/${slug}/operations`}><i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Staff</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <span className="num">1.</span><span className="">
                                <Link to={`/admin/staff/${slug}/promote/step-1`}>Selection</Link>
                            </span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">
                                <Link to={`/admin/staff/${slug}/promote/step-2`}>Agreement</Link>
                            </span>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before promoting the staff:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Promoted Role</th>
                                    <td>{groupLabel}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-file-signature"></i>&nbsp;Agreement
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Agreed to Area Coordinator agreement</th>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Agreed to Conflict of Interest agreement</th>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Agreed to Code of Conduct agreement</th>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Agreed to Confidentiality agreement</th>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Agreed to Staff agreement</th>
                                    <td>Yes</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-shield-alt"></i>&nbsp;Policy
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Police Check Date</th>
                                    <td><Moment format="YYYY/MM/DD">{policeCheckDate}</Moment></td>
                                </tr>
                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/staff/${slug}/promote/step-2`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
