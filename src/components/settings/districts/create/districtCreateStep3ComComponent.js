// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


class DistrictCreateStep3ComComponent extends Component {
    render() {
        const { errors, isLoading, onClick } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/districts"><i className="fas fa-map"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>Create District - Business Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/settings/district/step-1-create">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/settings/district/step-2-create-biz">
                                <span className="num">2.</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                        { /* <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Skills Required</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                        */ }
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the residential client:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">Personal details</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">First name</th>
                                <td>Rodolfo</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last name</th>
                                <td>Martinez</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Phone</th>
                                <td>(xxx) xxx-xxxx</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Mobile</th>
                                <td>---</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">E-Mail</th>
                                <td>example@example.com</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Ok to E-Mail?</th>
                                <td>Yes</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Ok to Text?</th>
                                <td>No</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Date of Birth</th>
                                <td>30/03/1994</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Gender</th>
                                <td>Male</td>
                            </tr>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">Address</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Street No.</th>
                                <td>XYZ</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Street name</th>
                                <td>Southdale road</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Neighbourhood</th>
                                <td>---</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">City</th>
                                <td>London</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">State/Province</th>
                                <td>Ontario</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Postal code</th>
                                <td>N0L 1E0</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Country</th>
                                <td>Canada</td>
                            </tr>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">Skills</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Client&apos;s skills</th>
                                <td><span className="badge badge-info badge-lg">Skill 1</span> <span
                                        className="badge badge-info badge-lg">Skill 2</span>
                                    <span className="badge badge-info badge-lg">HTML</span> <span
                                            className="badge badge-info badge-lg">PHP</span> <span
                                            className="badge badge-info badge-lg">Bootstrap</span> <span
                                            className="badge badge-info badge-lg">Django</span> <span
                                            className="badge badge-info badge-lg">Photoshop</span> <span
                                            className="badge badge-info badge-lg">Python</span> <span
                                            className="badge badge-info badge-lg">ASP.net</span> <span
                                            className="badge badge-info badge-lg">Android</span> <span
                                            className="badge badge-info badge-lg">jQuery</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <form>
                        <div className="form-group">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                            <Link to="/settings/district/step-2-create-biz" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                        </div>
                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default DistrictCreateStep3ComComponent;
