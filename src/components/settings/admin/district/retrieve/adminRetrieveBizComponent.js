import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminDistrictRetrieveBizComponent extends Component {
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
                            <i className="fas fa-building"></i>&nbsp;{districtData.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-building"></i>&nbsp;{districtData.name}</h1>

                {districtData.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This districtData is archived and is read-only.
                    </div>
                }

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">
                                    <i className="fas fa-table"></i>&nbsp;District Details
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Name</th>
                                <td>{districtData.name}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Description</th>
                                <td>{districtData.description}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Type</th>
                                <td>Business District</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Website URL</th>
                                <td>
                                    {districtData.websiteUrl &&
                                        <a href={districtData.websiteUrl} target="_blank" rel="noopener noreferrer">
                                            {districtData.websiteUrl}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </a>
                                    }
                                </td>
                            </tr>
                            {districtData.logoImage &&
                                <tr>
                                    <th scope="row" className="bg-light">Logo</th>
                                    <td>
                                        <img src={districtData.logoImage} alt="Logo" height="128" width="128" />
                                    </td>
                                </tr>
                            }

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