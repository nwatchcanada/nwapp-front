import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../../flashMessageComponent";


class ListComponent extends Component {
    render() {
        const { results } = this.props;

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
            formatter: externalLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-list"></i>&nbsp;Search Results
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ results }
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




function iconFormatter(cell, row){
    return (
        <i className={`fas fa-${row.icon}`}></i>
    )
}


function externalLinkFormatter(cell, row){
    let aURL = "";
    if (row.typeOf === 'residential') {
        aURL = "/settings/district-rez/"+row.slug
    } else if (row.typeOf === 'business') {
        aURL = "/settings/district-biz/"+row.slug
    } else if (row.typeOf === 'community-cares') {
        aURL = "/settings/district-cc/"+row.slug
    }
    return (
        <a target="_blank" href={aURL}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}



class DistrictSearchResultComponent extends Component {
    render() {
        const { results, flashMessage } = this.props;
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
                        <li className="breadcrumb-item">
                           <Link to={`/settings/districts`}><i className="fas fa-map"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/settings/districts/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map"></i>&nbsp;Districts</h1>
                <div className="row">
                    <div className="col-md-12">
                        <ListComponent results={results} />
                    </div>
                </div>

                <div className="form-group">
                    <Link to="/settings/districts/search" className="btn btn-secondary btn-lg">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>
            </div>
        );
    }
}

export default DistrictSearchResultComponent;
