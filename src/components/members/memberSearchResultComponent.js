import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class TableRow extends Component {
    render() {
        const { slug, icon, firstName, lastName, phone, email, absoluteUrl } = this.props.datum;

        return (
            <tr slug={slug}>
                <td><i className={`fas fa-${icon}`}></i></td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                    <Link to={absoluteUrl}  target="_blank">
                        View&nbsp;<i className="fas fa-external-link-alt"></i>
                    </Link>
                </td>
            </tr>
        );
    }
}


class MemberSearchResultComponent extends Component {
    render() {
        const { urlArgument, tableData, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/members/${urlArgument}`}><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/members/${urlArgument}/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-users"></i>&nbsp;Members</h1>
                <div className="row">
                    <div className="col-md-12">

                        <h2>Search Results</h2>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tableData && tableData.map(
                                        (tableDatum, i) => <TableRow datum={tableDatum} key={i} />)
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default MemberSearchResultComponent;
