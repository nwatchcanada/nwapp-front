import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../flashMessageComponent";
import WatchFilterComponent from "./watchFilterComponent";


class ActiveListComponent extends Component {
    render() {
        const { watches } = this.props;

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'district',
            text: 'District',
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
                        <i className="fas fa-check-circle"></i>&nbsp;Active Watches
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ watches }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active watches at the moment"
                    />

                </div>
            </div>
        );
    }
}


class InactiveListComponent extends Component {
    render() {
        const { watches } = this.props;

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'district',
            text: 'District',
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
                        <i className="fas fa-times-circle"></i>&nbsp;Inactive Watches
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ watches }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no inactive watches at the moment"
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


function financialExternalLinkFormatter(cell, row){
    return (
        <a target="_blank" href={`/financial/${row.slug}`}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/watch/${row.slug}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class WatchListComponent extends Component {
    render() {
        const { filter, onFilterClick, watches, flashMessage } = this.props;

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
                            <i className="fas fa-shield-alt"></i>&nbsp;Watches
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-shield-alt"></i>&nbsp;Watches</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/watches/step-1-create" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Watches</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/watches/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Watches</span>
                            </div>
                        </section>
                    </div>
                </div>

                <WatchFilterComponent filter={filter} onFilterClick={onFilterClick} />

                {isActive &&
                    <ActiveListComponent watches={watches} />
                }
                {isInactive &&
                    <InactiveListComponent watches={watches} />
                }


            </div>
        );
    }
}

export default WatchListComponent;
