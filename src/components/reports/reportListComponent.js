import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class ReportListComponent extends Component {
    render() {
        const { flashMessage } = this.props;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                   <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <i className="fas fa-book"></i>&nbsp;Report
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-book"></i>&nbsp;Report</h1>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-group row">
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-crown fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associates Report</h3>
                                                <p className="card-text">View report about associates.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-horse-head fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Area Coordinators Report</h3>
                                                <p className="card-text">View report about area coordinators.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-users fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Members Report</h3>
                                                <p className="card-text">View report about members.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-map fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">District Overview Report</h3>
                                                <p className="card-text">View report about district overview.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-building fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Business Watch Report</h3>
                                                <p className="card-text">View report about business watch.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-university fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Community Cares Watch Report</h3>
                                                <p className="card-text">View report about community cares watch.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-home fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Residential Watch Report</h3>
                                                <p className="card-text">View report about residential watch.</p>
                                                <Link to="#" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}

export default ReportListComponent;
