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

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    AREA_COORDINATOR_ROLE_ID,
    MEMBER_ROLE_ID
} from "../../../../constants/api";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            watches,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {  // DEPRECATED VIA https://github.com/over55/nwapp-front/issues/296
            "active": 'Active',
            "inactive": 'Archived',
        };

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
            formatter: nameFormatter
        },{
            dataField: 'districtName',
            text: 'District',
            sort: true,
            formatter: districtFormatter
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({ // DEPRECATED VIA https://github.com/over55/nwapp-front/issues/296
                options: selectOptions,
                defaultValue: 1,
                withoutEmptyOption: true
            }),
            formatter: statusFormatter
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'name',
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
                data={ watches }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no watches at the moment"
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


function iconFormatter(cell, row){
    switch(row.typeOf) {
        case BUSINESS_TYPE_OF:
            return <i className="fas fa-building"></i>;
            break;
        case RESIDENCE_TYPE_OF:
            return <i className="fas fa-home"></i>;
            break;
        case COMMUNITY_CARES_TYPE_OF:
            return <i className="fas fa-university"></i>;
            break;
        default:
            return <i className="fas fa-question"></i>;
            break;
    }
}


function statusFormatter(cell, row){
    switch(row.state) {
        case "active":
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        case "inactive":
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        case COMMUNITY_CARES_TYPE_OF:
            return <i className="fas fa-university"></i>;
            break;
        default:
            return <i className="fas fa-question"></i>;
            break;
    }
}


function nameFormatter(cell, row){
    return (
       <span>{row.name}{row.isVirtual && <span>&nbsp;(<i className={`fas fa-vr-cardboard`}></i>)</span>}</span>
    );
}


function roleIdFormatter(cell, row){
    switch(row.roleId) {
        case MANAGEMENT_ROLE_ID:
            return <div><i className="fas fa-user-check"></i>&nbsp;Management Staff</div>;
            break;
        case FRONTLINE_STAFF_ROLE_ID:
            return <div><i className="fas fa-user-check"></i>&nbsp;Frontline Staff</div>;
            break;
        case ASSOCIATE_ROLE_ID:
            return <div><i className="fas fa-crown"></i>&nbsp;Associate</div>;
            break;
        case AREA_COORDINATOR_ROLE_ID:
            return <div><i className="fas fa-horse-head"></i>&nbsp;Area Coordinator</div>;
            break;
        case MEMBER_ROLE_ID:
            return <div><i className="fas fa-shield-alt"></i>&nbsp;Watch</div>;
            break;
        default:
            return <i className="fas fa-question"></i>;
            break;
    }
}


function districtFormatter(cell, row){
    let aURL = "";
    switch(parseInt(row.typeOf)) {
        case RESIDENCE_TYPE_OF:
            aURL = "/admin/settings/district/rez/" + row.districtSlug;
            break;
        case BUSINESS_TYPE_OF:
            aURL = "/admin/settings/district/biz/" + row.districtSlug;
            break;
        case COMMUNITY_CARES_TYPE_OF:
            aURL = "/admin/settings/district/com/" + row.districtSlug;
            break;
        default:
            break;
    }
    return (
        <div>
            <a href={aURL} target="_blank">
                {row.districtName}&nbsp;<i className="fas fa-external-link-alt"></i>
            </a>
        </div>
    )
}


function detailLinkFormatter(cell, row){
    if (row.state === "inactive") {
        return <div><i className="fas fa-box"></i>&nbsp;Archived</div>;
    } else {
        return (
            <Link to={`/admin/watch/${row.slug}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    }

}


class AdminWatchListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            watchList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const watches = watchList.results ? watchList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
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
                                    <Link to="/admin/watches/step-1-create" className="d-block link-ndecor" title="Watches">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Watches</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/admin/watches/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Watches</span>
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
                            watches={watches}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminWatchListComponent;
