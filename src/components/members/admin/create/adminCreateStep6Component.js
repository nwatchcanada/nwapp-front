// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


export default class AdminMemberCreateStep6Component extends Component {
    render() {
        const { watchItems, errors, isLoading, onTableRowClick } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/members"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Member
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/members/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/members/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/admin/members/add/step-3">
                                <span className="num">3.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/admin/members/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/admin/members/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num">6.</span><span className="">Watch</span>
                            </strong>
                        </div>
                         <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Metrics</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        {watchItems && watchItems.length > 0
                            ?<form>
                                <h2>
                                    <i className="fas fa-shield-alt"></i>&nbsp;Watch
                                </h2>

                                <BootstrapErrorsProcessingAlert errors={errors} />

                                <p>According to the address you entered, you are eligable for the following watches, please select the watch which is appropriate for the member:</p>

                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {watchItems && watchItems.map(
                                                (tableDatum, i) => <TableRow datum={tableDatum} key={i} onTableRowClick={onTableRowClick} isLoading={isLoading} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="form-group">
                                    <Link to="/admin/members/add/step-5" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                    </Link>
                                </div>

                            </form>
                            : <div className="jumbotron">
                                <h1 className="display-4"><i className="fas fa-shield-alt"></i>&nbsp;Watches</h1>
                                <p className="lead">There are no watches found. Either you entered the previous data incorrectly or the watch you are looking for needs to be created.</p>
                                <p className="lead">To proceed, please either <a href="/admin/watches/step-1-create" target="_blank">create a new watch&nbsp;<i className="fas fa-external-link-alt"></i></a> or go back and fix the incorrect entry.</p>
                                <p className="lead">
                                    <Link className="btn btn-orange btn-lg" to="/admin/members/add/step-5">
                                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                    </Link>
                                </p>
                            </div>
                        }
                    </div>
                </div>

            </main>
        );
    }
}

class TableRow extends Component {
    render() {
        const { typeOf, slug, name } = this.props.datum;
        const { onTableRowClick, isLoading } = this.props;

        // Assign the icon based on the type of `Watch` object.
        let icon;
        if (typeOf === RESIDENCE_TYPE_OF) {
            icon = "home";
        } else if (typeOf === BUSINESS_TYPE_OF) {
            icon = "building";
        } else if (typeOf === COMMUNITY_CARES_TYPE_OF) {
            icon = "university";
        }

        return (
            <tr slug={slug}>
                <td><i className={`fas fa-${icon}`}></i></td>
                <td>{name}</td>
                <td>

                    <button className="btn btn-primary btn-sm float-right" disabled={isLoading} onClick={ (event) => { onTableRowClick(event, typeOf, slug, icon, name) } }>
                        Select and Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </button>
                </td>
            </tr>
        );
    }
}
