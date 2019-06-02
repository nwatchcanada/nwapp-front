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
                                    <i className="fas fa-id-card"></i>&nbsp;Setting
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-id-card"></i>&nbsp;Setting</h1>
                        <div className="row">
                            <div className="col-md-12">

                            <div className="card-group row">
                                <div className="col-sm-3">
                                    <div className="card box-shadow text-center mx-auto">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-user fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Crime Setting</h3>
                                            <p className="card-text">View setting about crimes types</p>
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

export default SettingListComponent;