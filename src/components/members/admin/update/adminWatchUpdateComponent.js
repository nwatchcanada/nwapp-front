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


export default class AdminMemberWatchUpdateComponent extends Component {
    render() {
        const { slug, member, watchItems, errors, isLoading, onTableRowClick } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/members`}><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/member/${slug}/full`}><i className="fas fa-user"></i>&nbsp;{member && member.fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update (Watch)
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Update (Watch)
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
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
                                <Link to={`/admin/member/${slug}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

class TableRow extends Component {
    render() {
        const { typeOf, slug, name, isVirtual } = this.props.datum;
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
                <td>{name}{isVirtual && <span>&nbsp;(<i className={`fas fa-vr-cardboard`}></i>)</span>}</td>
                <td>

                    <button className="btn btn-success btn-sm float-right" disabled={isLoading} onClick={ (event) => { onTableRowClick(event, typeOf, slug, icon, name) } }>
                        <i className="fas fa-check-circle"></i>&nbsp;Select and Save
                    </button>
                </td>
            </tr>
        );
    }
}
