import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminDistrictRetrieveMapComponent extends Component {
    render() {
        const { districtData, onClick, onBack, flashMessage, isLoading } = this.props;
        const coords = [42.983611, -81.249722];
        const zoom = 13;
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
                            <i className="fas fa-building"></i>&nbsp;{districtData && districtData.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-building"></i>&nbsp;{districtData && districtData.name}</h1>

                {districtData && districtData.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This district data is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/settings/district/${districtData && districtData.typeOfCode}/${districtData && districtData.slug}`}>
                                <span className="num">
                                    <i className="fas fa-table"></i>&nbsp;</span><span className="">Details
                                </span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/settings/district/${districtData && districtData.typeOfCode}/${districtData && districtData.slug}/map`}>
                                <span className="num">
                                    <i className="fas fa-map"></i>&nbsp;</span><span className="">Map
                                </span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </strong>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <div className="card-group row">
                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-map-signs fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Set Boundry</h3>
                                        <p className="card-text">Adjust the boundry for this district.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link className="btn btn-success btn-lg" to={`/admin/settings/district/operation/set-boundry/${districtData && districtData.slug}`}>
                                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}
