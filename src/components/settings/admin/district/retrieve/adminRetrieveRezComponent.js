import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminDistrictRetrieveRezComponent extends Component {
    render() {
        const { districtData, onClick, onBack, flashMessage, isLoading } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/districts"><i className="fas fa-map"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-home"></i>&nbsp;{districtData && districtData.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-home"></i>&nbsp;{districtData && districtData.name}</h1>

                {districtData && districtData.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This districtData is archived and is read-only.
                    </div>
                }

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className="fas fa-table"></i>&nbsp;District details</th>
                                </tr>

                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{districtData && districtData.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{districtData && districtData.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Type</th>
                                    <td>Residential District</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Counselor Name</th>
                                    <td>{districtData && districtData.counselorName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Counselor Email</th>
                                    <td>
                                        {districtData && districtData.counselorEmail}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Counselor Phone</th>
                                    <td>{districtData && districtData.counselorPhone}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {districtData && <Moment format="MM/DD/YYYY hh:mm:ss a">{districtData.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{districtData && districtData.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {districtData && <Moment format="MM/DD/YYYY hh:mm:ss a">{districtData.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{districtData && districtData.lastModifiedBy}</td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>

                            <button className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" onClick={onBack}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}
