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
                        <li className="breadcrumb-item active">
                            <i className="fas fa-id-card"></i>&nbsp;Members
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-id-card"></i>&nbsp;Members</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey ">
                            <Link to="/members/active">
                                <i className="fas fa-user-check"></i>&nbsp;<span className="">Active Members (3)</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <i className="fas fa-user-times"></i>&nbsp;<span className="">Inactive Members (8)</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">

                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/members/add" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add a member</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/members/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search your members</span>
                            </div>

                        </section>

                        <h2><i className="fas fa-user-times"></i>&nbsp;Inactive Members List</h2>

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
