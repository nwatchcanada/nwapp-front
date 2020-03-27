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
import { UserTypeOfIconHelper } from "../../../../../constants/helper";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


let associateDetailSlug = "";


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
        // {
        //     dataField: 'is_archived',
        //     text: 'Status',
        //     sort: false,
        //     filter: selectFilter({
        //         options: selectOptions,
        //         defaultValue: 3,
        //         withoutEmptyOption: true
        //     }),
        //     formatter: statusFormatter
        // },
        {
            dataField: 'typeOf',
            text: 'Type',
            sort: true,
            formatter: typeOfFormatter
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: false,
            formatter: nameFormatter
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false
        },
        // {
        //     dataField: 'createdAt',
        //     text: 'Created At',
        //     sort: true,
        //     formatter: createdAtFormatter
        // },
        // {
        //     dataField: 'fileUrl',
        //     text: 'File',
        //     sort: false,
        //     formatter: fileFormatter
        // },
        // {
        //     dataField: 'email',
        //     text: 'Email',
        //     sort: true,
        //     formatter: emailFormatter,
        // },{
        //     dataField: 'slug',
        //     text: 'Financials',
        //     sort: false,
        //     formatter: financialExternalLinkFormatter
        // },
        {
            dataField: 'slug',
            text: '-',
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
                noDataIndication="There are no districts at the moment"
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


function nameFormatter(cell, row){
    let viewButtonCode = "";
    switch(parseInt(row.typeOf)) {
        case 1:
            viewButtonCode = <Link to={`/admin/settings/district/rez/${row.slug}`} target="_blank">
                {row.name}&nbsp;<i className="fas fa-external-link-alt"></i>
            </Link>;
            break;
        case 2:
            viewButtonCode = <Link to={`/admin/settings/district/biz/${row.slug}`} target="_blank">
                {row.name}&nbsp;<i className="fas fa-external-link-alt"></i>
            </Link>;
            break;
        case 3:
            viewButtonCode = <Link to={`/admin/settings/district/com/${row.slug}`} target="_blank">
                {row.name}&nbsp;<i className="fas fa-external-link-alt"></i>
            </Link>;
            break;
        default:
            viewButtonCode = "";
            break;
    }
    return viewButtonCode;
}


function detailLinkFormatter(cell, row){
    if (row.isArchived === true) {
        return <div><i className="fas fa-box"></i>&nbsp;Archived</div>;
    } else {
        return (
            <Link to={`/admin/associate/${associateDetailSlug}/district/step-2/${row.slug}`} className="btn btn-success btn-lg">
                Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
            </Link>
        )
    }
}


class AdminAssociateDistrictStep1Component extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            districtList, associate, slug,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        // Store our associate's slug.
        associateDetailSlug = slug;

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/associates"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/associate/${slug}/operations`}>
                                <UserTypeOfIconHelper typeOfId={associate && associate.typeOf} />&nbsp;{associate && associate.fullName}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map"></i>&nbsp;Assign District to Associate (Operation)
                        </li>
                    </ol>
                </nav>
                <FlashMessageComponent object={flashMessage} />

                <div className="row">
                    <div className="col-sm-3 p-3 mb-2">
                        <Link className="btn btn-primary btn-lg" to={`/admin/associate/${slug}/operations`} role="button">
                            <i className="fas fa-arrow-left"></i>&nbsp;Back to Operations
                        </Link>
                    </div>
                </div>

                <h1>
                    <i className="fas fa-map"></i>&nbsp;Assign District to Associate
                </h1>

                {associate.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This associate is archived and is read-only.
                    </div>
                }

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

export default AdminAssociateDistrictStep1Component;
