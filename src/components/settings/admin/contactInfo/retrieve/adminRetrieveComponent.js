import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminContactInfoSettingRetrieveComponent extends Component {
    render() {
        const {
            email, phone, websiteUrl, facebookUrl, twitterUrl, instagramUrl, youtubeUrl, errors, isLoading, flashMessage, onBack, onClick
        } = this.props;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-phone-square"></i>&nbsp;Contact Information
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-phone-square"></i>&nbsp;Contact Information</h1>


                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">E-Mail</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Phone</th>
                                    <td>{phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Website</th>
                                    <td>
                                        {websiteUrl
                                            ? <span>
                                                <a href={websiteUrl} target="_blank">View&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                            </span>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Facebook Page</th>
                                    <td>{facebookUrl}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Twitter</th>
                                    <td>{twitterUrl}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Instagram</th>
                                    <td>{instagramUrl}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Youtube</th>
                                    <td>{youtubeUrl}</td>
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

                {/*

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className="fas fa-table"></i>&nbsp;Item Type details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Category</th>
                                    <td>{itemTypeData && itemTypeData.categoryLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Text</th>
                                    <td>{itemTypeData && itemTypeData.text}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{itemTypeData && itemTypeData.description}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {itemTypeData && <Moment format="MM/DD/YYYY hh:mm:ss a">{itemTypeData.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{itemTypeData && itemTypeData.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {itemTypeData && <Moment format="MM/DD/YYYY hh:mm:ss a">{itemTypeData.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{itemTypeData && itemTypeData.lastModifiedBy}</td>
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

                */}


            </div>
        );
    }
}
