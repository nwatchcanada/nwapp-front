import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../flashMessageComponent";
import FinancialFilterComponent from "./financialFilterComponent";


class ActiveListComponent extends Component {
    render() {
        const { financials } = this.props;

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
            text: 'Financials',
            sort: false,
            formatter: financialExternalLinkFormatter
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
                        <i className="fas fa-user-check"></i>&nbsp;Active Financials
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ financials }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active financials at the moment"
                    />

                </div>
            </div>
        );
    }
}


class InactiveListComponent extends Component {
    render() {
        const { financials } = this.props;

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
            text: 'Financials',
            sort: false,
            formatter: financialExternalLinkFormatter
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
                        <i className="fas fa-user-times"></i>&nbsp;Inactive Financials
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ financials }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no inactive financials at the moment"
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
        <Link to={`/financial/${row.slug}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class FinancialListComponent extends Component {
    render() {
        const { filter, onFilterClick, financials, flashMessage } = this.props;

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
                            <i className="fas fa-credit-card"></i>&nbsp;Financials
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-credit-card"></i>&nbsp;Financials</h1>

                <FinancialFilterComponent filter={filter} onFilterClick={onFilterClick} />

                {isActive &&
                    <ActiveListComponent financials={financials} />
                }
                {isInactive &&
                    <InactiveListComponent financials={financials} />
                }


            </div>
        );
    }
}

export default FinancialListComponent;
