import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../flashMessageComponent";


class Report05Component extends Component {
    render() {
        const { errors, isLoading, onClick, flashMessage, t } = this.props;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                   <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;{t("Dashboard")}</Link>
                                </li>
                                <li className="breadcrumb-item">
                                   <Link to="/admin/reports"><i className="fas fa-book"></i>&nbsp;{t("Reports")}</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <i className="fas fa-building"></i>&nbsp;{t("Business Watch Report")}
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-building"></i>&nbsp;{t("Business Watch Report")}</h1>
                        <div className="row">
                            <div className="col-md-12">
                                <p>There are no fields to choose from, simple click <strong>download</strong> to generate the report and download.</p>

                                <BootstrapErrorsProcessingAlert errors={errors} />

                                <div className="form-group">
                                    <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                        <i className="fas fa-cloud-download-alt"></i>&nbsp;{t("Download")}
                                    </button>
                                    <Link to={`/admin/reports`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                        <i className="fas fa-arrow-circle-left"></i>&nbsp;{t("Back")}
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Report05Component);
