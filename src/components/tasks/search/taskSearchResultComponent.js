import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../../flashMessageComponent";


class ListComponent extends Component {
    render() {
        const { results } = this.props;

        const columns = [{
            dataField: 'dueDate',
            text: 'Due Date',
            sort: true
        },{
            dataField: 'taskName',
            text: 'Task',
            sort: true
        },{
            dataField: 'watchName',
            text: 'Watch',
            sort: true
        },{
            dataField: 'slug',
            text: '',
            sort: false,
            formatter: externalLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-clock"></i>&nbsp;Unassigned Tasks
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ results }
                        columns={ columns }
                        striped
                        bordered={ false }
                        pagination={ paginationFactory() }
                        noDataIndication="There are no results."
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
    // DEVELOPERS NOTE:
    // WE ARE ASSIGNING AN ID TO THE URL. THIS IS WHERE WE NEED TO ADD MORE IDS
    // IF HAVE MORE DIFFERENT TYPES.
    let typeOfID = 0;
    switch(row.typeOf) {
        case "unassigned-watch-associate":
            typeOfID = 1;
            break;
        case "unassigned-watch-area-coordinator":
            typeOfID = 2;
            break;
        default:
           typeOfID = 0;
           break;
    }
    return (
        <a target="_blank" href={`/task/${typeOfID}/${row.slug}/step-1`}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}


class TaskSearchResultComponent extends Component {
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
                           <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/tasks/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-tasks"></i>&nbsp;Tasks</h1>
                <div className="row">
                    <div className="col-md-12">
                        <ListComponent results={results} />
                    </div>
                </div>

                <div className="form-group">
                    <Link to="/tasks/search" className="btn btn-secondary btn-lg">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>
            </div>
        );
    }
}

export default TaskSearchResultComponent;
