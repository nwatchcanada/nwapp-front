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


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            awardList,

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
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false
        },
        {
            dataField: 'createdAt',
            text: 'Created At',
            sort: true,
            formatter: createdAtFormatter
        },
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
            dataField: 'uuid',
            text: 'Archive?',
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
                data={ awardList }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no awards at the moment"
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
    switch(row.typeOf) {
        case 1: // Other
            return <div><i className={`fas fa-${row.icon}`} style={{ color: row.colour }}></i>&nbsp;{row.typeOfLabel}</div>;
            break;
        case 2: // Supporter
            return <div><i className="fas fa-donate" style={{ color: 'green' }}></i>&nbsp;{row.typeOfLabel}</div>;
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
                <Link to={`/admin/member/${row.user}/file/archive/${row.slug}`}>
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
            <Link to={`/admin/member/${row.user}/community/award/archive/${row.uuid}`}>
                View&nbsp;<i className="fas fa-chevron-right"></i>
            </Link>
        )
    }
}


class AdminMemberAwardListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            awardList, member, slug,

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
                            <Link to="/admin/members"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/member/${slug}/operations`}>
                                <UserTypeOfIconHelper typeOfId={member && member.typeOf} />&nbsp;{member && member.fullName}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-trophy"></i>&nbsp;Awards
                        </li>
                    </ol>
                </nav>
                <FlashMessageComponent object={flashMessage} />

                <h1><UserTypeOfIconHelper typeOfId={member && member.typeOf} />&nbsp;{member && member.fullName}</h1>

                {member.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This member is archived and is read-only.
                    </div>
                }

                <div className="row" id="mainNav">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/admin/member/${slug}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/member/${slug}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        { /*
                        <div id="step-3" className="st-grey">
                            <Link to={`/admin/member/${slug}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        */}
                        <div id="step-4" className="st-grey">
                            <Link to={`/admin/member/${slug}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/admin/member/${slug}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </strong>
                        </div>
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
                            awardList={awardList}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminMemberAwardListComponent;
