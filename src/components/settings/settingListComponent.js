import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class SettingListComponent extends Component {
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
                                    <i className="fas fa-cogs"></i>&nbsp;Setting
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-cogs"></i>&nbsp;Setting</h1>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-group row">
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-map fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Districts</h3>
                                                <p className="card-text">View setting about districts</p>
                                                <Link to="/settings/districts" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-tags fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Tags</h3>
                                                <p className="card-text">View setting about tags</p>
                                                <Link to="/settings/tags" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-tty fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">How did you hear?</h3>
                                                <p className="card-text">Modify how users heard about you.</p>
                                                <Link to="/settings/how-hears" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-bullhorn fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Announcements</h3>
                                                <p className="card-text">Add or remove announcements.</p>
                                                <Link to="/settings/announcements" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-atlas fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Resources</h3>
                                                <p className="card-text">Add or remove resources.</p>
                                                <Link to="/settings/resources" className="btn btn-success btn-lg">
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

export default SettingListComponent;
