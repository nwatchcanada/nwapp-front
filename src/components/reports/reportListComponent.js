import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import { FlashMessageComponent } from "../flashMessageComponent";


class ReportListComponent extends Component {
    render() {
        const { flashMessage, t } = this.props;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                   <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;{t("Dashboard")}</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <i className="fas fa-book"></i>&nbsp;{t("Reports")}
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-book"></i>&nbsp;{t("Reports")}</h1>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-group row">
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-crown fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">{t("Associate Report")}</h3>
                                                <p className="card-text">{t("View Associates Report")}</p>
                                                <Link to="/admin/report/1" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
                                                <p className="card-text">View AC Report</p>
                                                <Link to="/admin/report/2" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
                                                <p className="card-text">View Members Report</p>
                                                <Link to="/admin/report/3" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
                                                <p className="card-text">View District Report</p>
                                                <Link to="/admin/report/4" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
                                                <p className="card-text">View BW Report</p>
                                                <Link to="/admin/report/5" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
                                                <h3 className="card-title">Community Cares Report</h3>
                                                <p className="card-text">View CC Report</p>
                                                <Link to="/admin/report/6" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
                                                <p className="card-text">View RW Report</p>
                                                <Link to="/admin/report/7" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-house-damage fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Unassigned Watch Report</h3>
                                                <p className="card-text">View unassigned watches Report</p>
                                                <Link to="/admin/report/8" className="btn btn-success btn-lg">
                                                    {t("Go")}&nbsp;<i className="fas fa-arrow-circle-right"></i>
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

export default withTranslation()(ReportListComponent);
