import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export default class StaffDashboardComponent extends Component {
    render() {
        const { dashboardData } = this.props;
        console.log(dashboardData);
        const { activeMembersCount, activeWatchesCount, activeAssociatesCount, activeTasksCount, latestTasks } = dashboardData;
        return (
            <div className="container-fluid">
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
                                    <Link to="/watches" className="d-block link-ndecor" title="Area Coordinators">
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
                                    <Link to="/tasks" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">
                                            {activeTasksCount && activeTasksCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-tasks"></i>&nbsp;Tasks</h4>
                                <span className="text-muted">View Tasks</span>
                            </div>
                        </section>

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                            <p className="lead">There are no announcements. Feel free to add one.</p>

                            <p className="lead">
                                <Link className="btn btn-success btn-lg" to="/settings/announcements">
                                    <i className="fas fa-plus"></i>&nbsp;Add
                                </Link>
                            </p>
                        </div>
{/*
                        <RecentTaskListComponent latestTasks={latestTasks} />
*/}
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
            dataField: 'watchName',
            text: 'Watch Name',
            sort: false
        },{
            dataField: 'prettyTypeOf',
            text: 'Type',
            sort: false
        },{
            dataField: 'slug',
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

                    <Link to="/tasks" className="float-right">See more&nbsp;<i className="fas fa-chevron-right"></i></Link>

                </div>
            </div>
        );
    }
}


function recentTaskLinkFormatter(cell, row){
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
        <Link to={`/task/${typeOfID}/${row.slug}/step-1`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}
