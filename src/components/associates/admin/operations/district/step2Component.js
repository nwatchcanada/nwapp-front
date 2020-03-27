import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { UserTypeOfIconHelper } from "../../../../../constants/helper";


class AdminAssociateDistrictStep2Component extends Component {
    render() {
        const {
            associate, associateSlug, districtSlug, isLoading, errors, onClick
        } = this.props;

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/associates">
                                <i className="fas fa-crown"></i>&nbsp;Associates
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/associate/${associateSlug}/operations`}>
                                <UserTypeOfIconHelper typeOfId={associate && associate.typeOf} />&nbsp;{associate && associate.fullName}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Assign District to Associate (Operation)
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/associate/${associateSlug}/operations`} role="button">
                            <i className="fas fa-arrow-left"></i>&nbsp;Back to Operations
                        </Link>
                    </div>
                </div>

                <h1>
                    <i className="fas fa-map"></i>&nbsp;Assign District to Associate
                </h1>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation</h1>
                            <p className="lead">This will assign this associate to our new district.</p>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/admin/associate/${associateSlug}/district/step-1`} className="btn btn-orange btn-lg  float-left">
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

            </div>
        );
    }
}

export default AdminAssociateDistrictStep2Component;
