// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";


class AdminAnnouncementCreateStep2Component extends Component {
    render() {
        const {
            errors, isLoading, onClick
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/announcements"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>Create Announcement</h1>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation</h1>
                            <p className="lead">This will create our <strong>district</strong> in our system.</p>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/admin/settings/announcement/add/step-1`} className="btn btn-orange btn-lg  float-left">
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

export default AdminAnnouncementCreateStep2Component;
