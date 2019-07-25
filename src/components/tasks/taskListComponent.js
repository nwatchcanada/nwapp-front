import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { FlashMessageComponent } from "../flashMessageComponent";
import TaskFilterComponent from "./taskFilterComponent";


function linkFormatter(cell, row){
    return (
        <Link to={`/tasks/${row.slug}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class TaskListComponent extends Component {
    render() {
        const { filter, onFilterClick, tasks, flashMessage } = this.props;

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
            formatter: linkFormatter
        }];

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tasks"></i>&nbsp;Tasks
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-tasks"></i>&nbsp;Tasks</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/tasks/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Tasks</span>
                            </div>
                        </section>
                    </div>
                </div>

                <TaskFilterComponent filter={filter} onFilterClick={onFilterClick} />

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-clock"></i>&nbsp;Pending Tasks
                        </h2>

                        <BootstrapTable
                            bootstrap4
                            keyField='slug'
                            data={ tasks }
                            columns={ columns }
                            striped
                            bordered={ false }
                            pagination={ paginationFactory() }
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default TaskListComponent;
