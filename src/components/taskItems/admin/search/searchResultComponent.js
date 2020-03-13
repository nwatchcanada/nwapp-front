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

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    TaskItemTypeOfLabelHelper, TaskItemStateLabelHelper
} from "../../../../constants/helper";


export default class AdminTaskSearchResultComponent extends Component {
    render() {
        const {
            tasks, isLoading, errors, hasNext, onNextClick, hasPrevious,
            onPreviousClick, onTaskClick
        } = this.props;
        const hasNoTasks = tasks.length <= 0;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/admin/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/admin/tasks/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Tasks Search</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>

                        {hasNoTasks
                            ?<div className="jumbotron">
                                <h1 className="display-4">No Results Found</h1>
                                <p className="lead">It appears nothing was found for your search results. Please try again by clicking below.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/admin/tasks/search">Try Again&nbsp;<i class="fas fa-chevron-right"></i></Link>
                                </p>
                            </div>
                            :<div className="card-group row">
                                {tasks && tasks.map(
                                    (task) => <CardComponent task={task} key={task.id} isLoading={isLoading} onTaskClick={onTaskClick} />)
                                }
                            </div>
                        }

                        <div className="float-right">
                            {hasPrevious &&
                                <Link onClick={onPreviousClick}><i class="fas fa-arrow-circle-left"></i>&nbsp;Previous</Link>
                            }&nbsp;&nbsp;
                            {hasNext &&
                                <Link onClick={onNextClick}>Next&nbsp;<i class="fas fa-arrow-circle-right"></i></Link>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



class CardComponent extends Component {
    render() {
        const { task, isLoading } = this.props;
        return (
            <div className="col-sm-3" key={task.uuid}>
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/admin/task/${task.typeOf}/${task.uuid}/step-1`}>
                                <strong><TaskItemTypeOfLabelHelper typeOfId={task.typeOf} /></strong>
                            </Link>
                        </h5>
                        <p className="card-text">
                            Status: <TaskItemStateLabelHelper stateId={task.state} /><br />
                            Due Date: <Moment format="MM/DD/YYYY">{task.dueDate}</Moment>
                        </p>
                        <Link to={`/admin/task/${task.typeOf}/${task.uuid}/step-1`} type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading}>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
