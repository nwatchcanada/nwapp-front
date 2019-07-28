import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import ResourceFilterComponent from "./resourceFilterComponent";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../constants/api";


class ActiveListComponent extends Component {
    render() {
        const { resources } = this.props;

        const columns = [{
            dataField: 'number',
            text: 'Resource #',
            sort: true
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'category',
            text: 'Category',
            sort: true
        },{
            dataField: 'typeOf',
            text: 'Type',
            sort: true,
            formatter: typeOfFormatter,
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
                        <i className="fas fa-check-circle"></i>&nbsp;Active Resources
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ resources }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no active resources at the moment"
                    />

                </div>
            </div>
        );
    }
}


class InactiveListComponent extends Component {
    render() {
        const { resources } = this.props;

        const columns = [{
            dataField: 'number',
            text: 'Resource #',
            sort: true
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'category',
            text: 'Category',
            sort: true
        },{
            dataField: 'typeOf',
            text: 'Type',
            sort: true,
            formatter: typeOfFormatter,
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
                        <i className="fas fa-check-circle"></i>&nbsp;Inactive Resources
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ resources }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no archived resources at the moment"
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


function typeOfFormatter(cell, row){
    let prettyTypeOf;
    switch (row.typeOf) {
        case LINK_RESOURCE_TYPE_OF:
            prettyTypeOf = "Link";
            break;
        case YOUTUBE_VIDEO_RESOURCE_TYPE_OF:
            prettyTypeOf = "YouTube";
            break;
        case IMAGE_RESOURCE_TYPE_OF:
            prettyTypeOf = "Image";
            break;
        case FILE_RESOURCE_TYPE_OF:
            prettyTypeOf = "File";
            break;
        default:
            prettyTypeOf = "Unknown";
    }
    return (
        <div>{prettyTypeOf}</div>
    )
}


function buttonsFormatter(cell, row){
    return (
        <div>
            <Link to={`/settings/resource/${row.slug}/update`} className="btn btn-primary pl-4 pr-4">
                <i className="fas fa-edit"></i>&nbsp;Edit
            </Link>&nbsp;&nbsp;&nbsp;
            <Link to={`/settings/resource/${row.slug}/delete`} className="btn btn-danger pl-4 pr-4">
                <i className="fas fa-minus"></i>&nbsp;Remove
            </Link>
        </div>
    )
}


class ResourceListComponent extends Component {
    render() {
        const { filter, onFilterClick, resources, flashMessage } = this.props;

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
                            <i className="fas fa-resources"></i>&nbsp;Resources
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-resources"></i>&nbsp;Resources</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/settings/resource/add" className="d-block link-ndecor" title="Clients">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Resources</div>
                            </div>
                        </section>
                    </div>
                </div>

                <ResourceFilterComponent filter={filter} onFilterClick={onFilterClick} />

                {isActive &&
                    <ActiveListComponent resources={resources} />
                }
                {isInactive &&
                    <InactiveListComponent resources={resources} />
                }


            </div>
        );
    }
}

export default ResourceListComponent;
