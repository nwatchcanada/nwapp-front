import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../flashMessageComponent";
import MemberFilterComponent from "./memberFilterComponent";


class ActiveListComponent extends Component {
    render() {
        const { members } = this.props;

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        },{
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        },{
            dataField: 'phone',
            text: 'Phone',
            sort: true
        },{
            dataField: 'email',
            text: 'Email',
            sort: true
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        },{
            dataField: 'slug',
            text: 'Financials',
            sort: false,
            formatter: financialExternalLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-user-check"></i>&nbsp;Active Members
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ members }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active members at the moment"
                    />

                </div>
            </div>
        );
    }
}


class InactiveListComponent extends Component {
    render() {
        const { members } = this.props;

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter,
            style: {
                width: 10,
            }
        },{
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        },{
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        },{
            dataField: 'phone',
            text: 'Watch',
            sort: true
        },{
            dataField: 'email',
            text: 'Email',
            sort: true
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        },{
            dataField: 'slug',
            text: 'Financials',
            sort: false,
            formatter: financialExternalLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-user-times"></i>&nbsp;Inactive Members
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ members }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no inactive members at the moment"
                    />

                </div>
            </div>
        );
    }
}


function iconFormatter(cell, row){
    return (
        <i className={`fas fa-${row.icon}`}></i>
    )
}

function detailLinkFormatter(cell, row){
    return (
        <Link to={`/member/${row.slug}`}>
            <i className="fa fa-id-card"></i>
        </Link>
    )
}

function financialExternalLinkFormatter(cell, row){
    return (
        <a target="_blank" href={`/financial/${row.slug}`}>
            <i className="fa fa-dollar-sign"></i>
        </a>
    )
}


class MemberListComponent extends Component {
    render() {
        const { filter, onFilterClick, members, flashMessage } = this.props;

        const isActive = filter === "active";
        const isInactive = filter === "inactive";

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-users"></i>&nbsp;Members
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-users"></i>&nbsp;Members</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/members/add/step-1" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Members</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/members/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Members</span>
                            </div>
                        </section>
                    </div>
                </div>

                <MemberFilterComponent filter={filter} onFilterClick={onFilterClick} />

                {isActive &&
                    <ActiveListComponent members={members} />
                }
                {isInactive &&
                    <InactiveListComponent members={members} />
                }


            </div>
        );
    }
}

export default MemberListComponent;
