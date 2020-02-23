import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import * as moment from 'moment';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../../constants/api";


class RemoteListComponent extends Component {
    render() {
        const { items } = this.props;
        const columns = [
            {
                dataField: 'category',
                text: 'Category',
                sort: false,
                formatter: categoryFormatter
            },{
                dataField: 'text',
                text: 'Title / Text',
                sort: false,
                // formatter: textFormatter
            },{
                dataField: 'slug',
                text: 'Details',
                sort: false,
                formatter: detailLinkFormatter
            }
        ];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-check"></i>&nbsp;Active Items
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ items }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active items at the moment"
                    />

                </div>
            </div>
        );
    }
}


function statusFormatter(cell, row){
    switch(row.state) {
        case "active":
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        case "archived":
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        default:
            return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}


function categoryFormatter(cell, row){
    switch(row.category) {
        case INCIDENT_ITEM_TYPE_OF:
            return <div><i className="fas fa-fire"></i>&nbsp;Incident</div>;
            break;
        case EVENT_ITEM_TYPE_OF:
            return <div><i className="fas fa-glass-cheers"></i>&nbsp;Event</div>;
            break;
        case CONCERN_ITEM_TYPE_OF:
            return <div><i className="fas fa-exclamation-circle"></i>&nbsp;Concern</div>;
            break;
        case INFORMATION_ITEM_TYPE_OF:
            return <div><i className="fas fa-info-circle"></i>&nbsp;Information</div>;
            break;
        default:
            return <div><i className="fas fa-question"></i>&nbsp;Unknown</div>;
            break;
    }
}


function textFormatter(cell, row){

    // const policeCheckDateMoment = moment(this.state.policeCheckDate);
    // postData.policeCheckDate = policeCheckDateMoment.format("YYYY-MM-DD")
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/admin/item/${row.slug}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


export default class AdminItemListComponent extends Component {
    render() {
        const { items, flashMessage, isLoading } = this.props;

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;Items
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-map-pin"></i>&nbsp;Items</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/admin/item/add/step-1" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Items</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/admin/items/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Items</span>
                            </div>
                        </section>
                    </div>
                </div>

                <RemoteListComponent items={items} />

            </div>
        );
    }
}
