import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../../flashMessageComponent";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            districtList,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            3: 'Active',
            2: 'Archived',
        };

        const columns = [
        {
            dataField: 'is_archived',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions,
                defaultValue: 3,
                withoutEmptyOption: true
            }),
            formatter: statusFormatter
        },
        {
            dataField: 'typeOf',
            text: 'Type',
            sort: true,
            formatter: typeOfFormatter
        },{
            dataField: 'name',
            text: 'Name',
            sort: true,
            // formatter: typeOfFormatter
        },{
            dataField: 'description',
            text: 'Description',
            sort: false
        },{
            dataField: 'createdAt',
            text: 'Created At',
            sort: true,
            formatter: createdAtFormatter
        },
        {
            dataField: 'slug',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
        }
        ];

        const defaultSorted = [{
            dataField: 'createdAt',
            order: 'asc'
        }];

        const paginationOption = {
            page: page,
            sizePerPage: sizePerPage,
            totalSize: totalSize,
            sizePerPageList: [{
                text: '25', value: 25
            }, {
                text: '50', value: 50
            }, {
                text: '100', value: 100
            }, {
                text: 'All', value: totalSize
            }],
            showTotal: true,
            paginationTotalRenderer: customTotal,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
        };

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ districtList }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no score points at the moment"
                remote
                onTableChange={ onTableChange }
                pagination={ paginationFactory(paginationOption) }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function statusFormatter(cell, row){
    switch(row.isArchived) {
        case false:
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        case true:
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        default:
            return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}


function typeOfFormatter(cell, row){
    switch(parseInt(row.typeOf)) {
        case 1:
            return <div><i className="fas fa-home" style={{ color: 'blue' }}></i>&nbsp;Residential</div>;
            break;
        case 2:
            return <div><i className="fas fa-building" style={{ color: 'green' }}></i>&nbsp;Business</div>;
            break;
        case 3: // Daily Usage
            return <div><i className="fas fa-university" style={{ color: 'green' }}></i>&nbsp;Community Cares</div>;
            break;
        default:
            return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}


function fileFormatter(cell, row){
    return (
        <div>
            {row.isArchived === false &&
                <a href={row.fileUrl} target="_blank">
                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                </a>
            }
            {row.isArchived === true &&
                <strong>
                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                </strong>
            }
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            {row.isArchived === false &&
                <Link to={`/admin/district/${row.user}/file/archive/${row.slug}`}>
                    <i className="fas fa-archive"></i>&nbsp;Archive
                </Link>
            }
            {row.isArchived === true &&
                <strong>
                    <i className="fas fa-archive"></i>&nbsp;Archived
                </strong>
            }
        </div>
    )
}


function createdAtFormatter(cell, row){
    return <Moment format="MM/DD/YYYY hh:mm:ss a">{row.createdAt}</Moment>
}


function detailLinkFormatter(cell, row){
    if (row.isArchived === true) {
        return <div><i className="fas fa-box"></i>&nbsp;Archived</div>;
    } else {
        let viewButtonCode = "";
        switch(parseInt(row.typeOf)) {
            case 1:
                viewButtonCode = <Link to={`/admin/settings/district/rez/${row.slug}`} className="btn btn-success btn-xs">
                    <i className="fas fa-binoculars"></i>&nbsp;View
                </Link>;
                break;
            case 2:
                viewButtonCode = <Link to={`/admin/settings/district/biz/${row.slug}`} className="btn btn-success btn-xs">
                    <i className="fas fa-binoculars"></i>&nbsp;View
                </Link>;
                break;
            case 3:
                viewButtonCode = <Link to={`/admin/settings/district/com/${row.slug}`} className="btn btn-success btn-xs">
                    <i className="fas fa-binoculars"></i>&nbsp;View
                </Link>;
                break;
            default:
                viewButtonCode = "";
                break;
        }
        return (
            <div>
                {viewButtonCode}&nbsp;&nbsp;
                <Link to={`/admin/settings/district/operation/archive/${row.slug}`} className="btn btn-danger btn-xs">
                    <i className="fas fa-archive"></i>&nbsp;Archive
                </Link>
            </div>
        )
    }
}


class AdminDistrictListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            districtList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings">
                                <i className="fas fa-cogs"></i>&nbsp;Setting
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Districts
                        </li>
                    </ol>
                </nav>
                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;Districts</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to={`/admin/settings/district/add/step-1`} className="d-block link-ndecor" title="Members">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add District</h4>
                                <div className="text-muted">Add District</div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            districtList={districtList}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDistrictListComponent;
