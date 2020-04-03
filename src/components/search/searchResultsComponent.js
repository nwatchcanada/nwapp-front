import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as moment from 'moment';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../flashMessageComponent";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            tagItems,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'description',
            text: 'Description',
            sort: false
        },{
            dataField: 'lastModifiedAt',
            text: 'Last Modified',
            sort: false,
            formatter: lastModifiedAtFormatter
        },{
            dataField: 'tags',
            text: 'Tags',
            sort: false,
            formatter: tagFormatter
        },{
            dataField: 'id',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'id',
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
                data={ tagItems }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no search results at the moment"
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
    if (row.typeOf === 6) {
        return (
            <i className="fas fa-cloud-download-alt"></i>
        )
    } else if (row.typeOf === 5) {
        return (
            <i className="fas fa-handshake"></i>
        )
    } else if (row.typeOf === 4) {
        return (
            <i className="fas fa-wrench"></i>
        )
    } else if (row.typeOf === 3) {
        return (
            <i className="fas fa-user-tie"></i>
        )
    } else if (row.typeOf === 2) {
        return (
            <i className="fas fa-crown"></i>
        )
    } else if (row.typeOf === 1) {
        return (
            <i className="fas fa-user-circle"></i>
        )
    } else {
        return (
            <i className="fas fa-question-circle"></i>
        )
    }

}


function statusFormatter(cell, row){
    switch(row.state) {
        case 1:
            return <i className="fas fa-check-circle"></i>;
            break;
        case 0:
            return <i className="fas fa-times-circle"></i>;
            break;
        default:
        return <i className="fas fa-question-circle"></i>;
            break;
    }
}



function tagFormatter(cell, row){
    return (
        row && row.tags && row.tags.map(
            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>
        )
    );
}


class TagItem extends Component {
    render() {
        const { text, id } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}


function lastModifiedAtFormatter(cell, row){
    const lastModifiedAtMoment = moment(row.lastModifiedAt);
    if (lastModifiedAtMoment.isValid()) {
        const lastModifiedAt = lastModifiedAtMoment.format("YYYY-MM-DD hh:mm:ss");
        return (
            lastModifiedAt
        );
    } else {
        return (
            "-"
        );
    }
}



function detailLinkFormatter(cell, row){
    if (row.typeOf === 6) {
        return (
            "-"
        )
    } else if (row.typeOf === 5) {
        return (
            <Link to={`/partner/${row.id}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    } else if (row.typeOf === 4) {
        return (
            <Link to={`/order/${row.id}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    } else if (row.typeOf === 3) {
        return (
            <Link to={`/staff/${row.id}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    } else if (row.typeOf === 2) {
        return (
            <Link to={`/associate/${row.id}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    } else if (row.typeOf === 1) {
        return (
            <Link to={`/client/${row.id}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    } else {
        return (
            <div><i className="fas fa-lock"></i>&nbsp;Locked</div>
        )
    }
}


class AdminSearchResultsComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            unifiedSearchItemList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const tagItems = unifiedSearchItemList.results ? unifiedSearchItemList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/search">
                                <i className="fas fa-search"></i>&nbsp;Search
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-search"></i>&nbsp;Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-search"></i>&nbsp;Search Results
                </h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            tagItems={tagItems}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminSearchResultsComponent;
