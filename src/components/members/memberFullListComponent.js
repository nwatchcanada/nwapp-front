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
                    <a href={absoluteUrl}>
                        View&nbsp;<i className="fas fa-chevron-right"></i>
                    </a>
                </td>
            </tr>
        );
    }
}


class MemberListComponent extends Component {
    render() {
        const { tableData, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/members"><i className="fas fa-id-card"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;List
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-id-card"></i>&nbsp;Members</h1>
                <div className="row">
                    <div className="col-md-12">

                        <h2>All Members List</h2>

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

export default MemberListComponent;
