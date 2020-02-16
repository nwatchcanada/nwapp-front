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
            itemTypeList,

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
        },{
            dataField: 'category',
            text: 'Category',
            sort: true,
            formatter: categoryFormatter
        },{
            dataField: 'text',
            text: 'Text',
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
            dataField: 'id',
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
                data={ itemTypeList }
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


function categoryFormatter(cell, row){
    switch(row.category) {
        case 2:
            return <span><i className="fas fa-fire" style={{ color: 'red' }}></i></span>;
            break;
        case 3:
            return <span><i className="fas fa-glass-cheers" style={{ color: 'green' }}></i></span>;
            break;
        case 4:
            return <i className="fas fa-exclamation-circle" style={{ color: 'yellow' }}></i>;
            break;
        case 5:
            return <i className="fas fa-info-circle" style={{ color: 'blue' }}></i>;
            break;
        default:
            return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
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
                <Link to={`/admin/itemType/${row.user}/file/archive/${row.id}`}>
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
        return (
            <div>
                <Link to={`/admin/settings/item-type/${row.id}`} className="btn btn-success btn-xs">
                    <i className="fas fa-binoculars"></i>&nbsp;View
                </Link>;
                <Link to={`/admin/settings/item-type/operation/archive/${row.id}`} className="btn btn-danger btn-xs">
                    <i className="fas fa-archive"></i>&nbsp;Archive
                </Link>
            </div>
        )
    }
}


class AdminItemTypeListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            itemTypeList,

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
                                <i className="fas fa-cogs"></i>&nbsp;Settings
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-sliders-h"></i>&nbsp;Item Types
                        </li>
                    </ol>
                </nav>
                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-sliders-h"></i>&nbsp;Item Types</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to={`/admin/settings/item-type/add/step-1`} className="d-block link-ndecor" title="Members">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add Item Type</h4>
                                <div className="text-muted">Add Item Type</div>
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
                            itemTypeList={itemTypeList}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminItemTypeListComponent;
