import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import { FlashMessageComponent } from "../flashMessageComponent";


class Report01Component extends Component {
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
                                <li className="breadcrumb-item">
                                   <Link to="/admin/reports"><i className="fas fa-book"></i>&nbsp;{t("Reports")}</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <i className="fas fa-crown"></i>&nbsp;{t("Associate Report")}
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-crown"></i>&nbsp;{t("Associate Report")}</h1>
                        <div className="row">
                            <div className="col-md-12">

                            </div>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Report01Component);
