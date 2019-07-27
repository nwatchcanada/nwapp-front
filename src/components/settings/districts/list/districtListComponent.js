import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import DistrictFilterComponent from "./districtFilterComponent";


class ActiveListComponent extends Component {
    render() {
        const { districts } = this.props;

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'number',
            text: 'Number',
            sort: true
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-user-check"></i>&nbsp;Active Districts
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ districts }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active districts at the moment"
                    />

                </div>
            </div>
        );
    }
}


class InactiveListComponent extends Component {
    render() {
        const { districts } = this.props;

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
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-user-times"></i>&nbsp;Inactive Districts
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ districts }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no inactive districts at the moment"
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
    let aURL = "";
    if (row.typeOf === 'residential') {
        aURL = "/settings/district-rez/"+row.slug
    } else if (row.typeOf === 'business') {
        aURL = "/settings/district-biz/"+row.slug
    } else if (row.typeOf === 'community-cares') {
        aURL = "/settings/district-cc/"+row.slug
    }
    return (
        <Link to={aURL}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class DistrictListComponent extends Component {
    render() {
        const { filter, onFilterClick, districts, flashMessage } = this.props;

        const isActive = filter === "active";
        const isInactive = filter === "inactive";

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Districts
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map"></i>&nbsp;Districts</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/settings/district/step-1-create" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Districts</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/settings/districts/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Districts</span>
                            </div>
                        </section>
                    </div>
                </div>

                <DistrictFilterComponent filter={filter} onFilterClick={onFilterClick} />

                {isActive &&
                    <ActiveListComponent districts={districts} />
                }
                {isInactive &&
                    <InactiveListComponent districts={districts} />
                }


            </div>
        );
    }
}

export default DistrictListComponent;
