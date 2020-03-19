import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import AnnouncementComponent from "./announcementComponent";
import {
    TaskItemTypeOfLabelHelper,
    TaskItemStateLabelHelper
} from "../../constants/helper";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";


export default class StaffDashboardComponent extends Component {
    render() {
        const { dashboardData, isLoading } = this.props;
        const {
            activeMembersCount,
            activeWatchesCount,
            activeAssociatesCount,
            activeTasksCount,
            announcements,
            latestTasks
        } = dashboardData;
        return (
            <div className="container-fluid">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <div className="d-flex align-items-stretch">
                    <main id="main">
                        <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/admin/members" className="d-block link-ndecor" title="Members">
                                        <h1 className="circle-title">
                                            {activeMembersCount && activeMembersCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-users"></i>&nbsp;Members</h4>
                                <div className="text-muted">View Members</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/admin/watches" className="d-block link-ndecor" title="Watches">
                                        <h1 className="circle-title">
                                            {activeWatchesCount && activeWatchesCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-shield-alt"></i>&nbsp;Watches</h4>
                                <span className="text-muted">View Watches</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="/admin/associates" className="d-block link-ndecor" title="Associates">
                                        <h1 className="circle-title">
                                            {activeAssociatesCount && activeAssociatesCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Associates</h4>
                                <span className="text-muted">View Associates</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="/admin/tasks" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">
                                            {activeTasksCount && activeTasksCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-tasks"></i>&nbsp;Tasks</h4>
                                <span className="text-muted">View Tasks</span>
                            </div>
                        </section>

                        {announcements && announcements.length <= 0
                            ? <div className="jumbotron">
                                <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                                <p className="lead">There are no announcements. Feel free to add one.</p>

                                <p className="lead">
                                    <Link className="btn btn-success btn-lg" to="/admin/settings/announcement/add/step-1">
                                        <i className="fas fa-plus"></i>&nbsp;Add
                                    </Link>
                                </p>
                            </div>
                            : <AnnouncementComponent announcementItems={announcements} />
                        }

                        {latestTasks && latestTasks.length > 0
                            ? <RecentTaskListComponent latestTasks={latestTasks} />
                            : <div className="jumbotron">
                                <h1 className="display-4"><i className="fas fa-tasks"></i>&nbsp;Latest Tasks</h1>
                                <p className="lead">There are latest tasks. Please check back later to see if the system created a task.</p>
                            </div>
                        }
                    </main>
                </div>
            </div>
        );
    }
}


class RecentTaskListComponent extends Component {
    render() {
        const { latestTasks } = this.props;

        const columns = [{
            dataField: 'typeOf',
            text: 'Type',
            sort: false,
            formatter: taskItemTypeOfFormatter
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            formatter: taskItemStatusFormatter
        },{
            dataField: 'dueDate',
            text: 'Due Date',
            sort: false
        },{
            dataField: 'uuid',
            text: '',
            sort: false,
            formatter: recentTaskLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-list"></i>&nbsp;Recent Task List
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ latestTasks }
                        columns={ columns }
                        striped
                        bordered={ false }
                        noDataIndication="There are no recent tasks at the moment"
                    />

                    <Link to="/admin/tasks" className="float-right">See more&nbsp;<i className="fas fa-chevron-right"></i></Link>

                </div>
            </div>
        );
    }
}


function taskItemTypeOfFormatter(cell, row){
    return <TaskItemTypeOfLabelHelper typeOfId={row.typeOf} />;
}


function taskItemStatusFormatter(cell, row){
    return <TaskItemStateLabelHelper stateId={row.state} />
}


function recentTaskLinkFormatter(cell, row){
    return (
        <Link to={`/admin/task/${row.typeOf}/${row.uuid}/step-1`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}
