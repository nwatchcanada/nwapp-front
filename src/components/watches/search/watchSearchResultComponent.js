import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../flashMessageComponent";


class ListComponent extends Component {
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
            dataField: 'state',
            text: 'Status',
            sort: true,
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: externalLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-list"></i>&nbsp;Results
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


function iconFormatter(cell, row){
    return (
        <i className={`fas fa-${row.icon}`}></i>
    )
}


function externalLinkFormatter(cell, row){
    return (
        <a target="_blank" href={`/watch/${row.slug}`}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}


class WatchSearchResultComponent extends Component {
    render() {
        const { watches, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/watches`}><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/watches/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-shield-alt"></i>&nbsp;Watches</h1>
                <div className="row">
                    <div className="col-md-12">
                        <ListComponent watches={watches} />
                    </div>
                </div>

                <div className="form-group">
                    <Link to="/watches/search" className="btn btn-secondary btn-lg">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </div>
        );
    }
}

export default WatchSearchResultComponent;
