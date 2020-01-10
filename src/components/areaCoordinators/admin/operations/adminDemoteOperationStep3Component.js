// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


export default class AdminAreaCoordinatorDemoteOperationStep3Component extends Component {
    render() {
        const { areaCoordinator, errors, slug, onClick, isLoading } = this.props;

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/area-coordinators"><i className="fas fa-crown"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/area-coordinator/${slug}/operations`}><i className="fas fa-user"></i>&nbsp;{areaCoordinator && areaCoordinator.fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star-half"></i>&nbsp;Demote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star-half"></i>&nbsp;Demote Area Coordinator</h1>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation</h1>
                            <p className="lead">This will demote our area coordinator.</p>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/admin/area-coordinator/${slug}/demote/step-2`} className="btn btn-orange btn-lg  float-left">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                            </p>
                        </div>

                    </div>
                </div>

            </main>
        );
    }
}
