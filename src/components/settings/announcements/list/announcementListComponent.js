import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import AnnouncementFilterComponent from "./announcementFilterComponent";


class ActiveListComponent extends Component {
    render() {
        const { announcements } = this.props;

        const columns = [{
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
            formatter: buttonsFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-check-circle"></i>&nbsp;Active Announcements
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ announcements }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active announcements at the moment"
                    />

                </div>
            </div>
        );
    }
}


class InactiveListComponent extends Component {
    render() {
        const { announcements } = this.props;

        const columns = [{
            dataField: 'number',
            text: 'Number',
            sort: true
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'slug',
            text: '',
            sort: false,
            formatter: buttonsFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-check-circle"></i>&nbsp;Inactive Announcements
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ announcements }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no archived announcements at the moment"
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


function buttonsFormatter(cell, row){
    return (
        <div>
            <Link to={`/settings/announcement/${row.slug}/update`} className="btn btn-primary pl-4 pr-4">
                <i className="fas fa-edit"></i>&nbsp;Edit
            </Link>&nbsp;&nbsp;&nbsp;
            <Link to={`/settings/announcement/${row.slug}/delete`} className="btn btn-danger pl-4 pr-4">
                <i className="fas fa-minus"></i>&nbsp;Remove
            </Link>
        </div>
    )
}


class AnnouncementListComponent extends Component {
    render() {
        const { filter, onFilterClick, announcements, flashMessage } = this.props;

        const isActive = filter === "active";
        const isInactive = filter === "archived";

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
                            <i className="fas fa-announcements"></i>&nbsp;Announcements
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-announcements"></i>&nbsp;Announcements</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/settings/announcements/add" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Announcements</div>
                            </div>
                        </section>
                    </div>
                </div>

                <AnnouncementFilterComponent filter={filter} onFilterClick={onFilterClick} />

                {isActive &&
                    <ActiveListComponent announcements={announcements} />
                }
                {isInactive &&
                    <InactiveListComponent announcements={announcements} />
                }


            </div>
        );
    }
}

export default AnnouncementListComponent;
