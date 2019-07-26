import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class StaffDashboardComponent extends Component {
    render() {
        const { dashboardData } = this.props;
        const { latestTasks } = dashboardData;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main">
                        <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/members" className="d-block link-ndecor" title="Members">
                                        <h1 className="circle-title">1,100</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-users"></i>&nbsp;Members</h4>
                                <div className="text-muted">View Members</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/watches" className="d-block link-ndecor" title="Area Coordinators">
                                        <h1 className="circle-title">10,000</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-shield-alt"></i>&nbsp;Watches</h4>
                                <span className="text-muted">View Watches</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="/associates/active" className="d-block link-ndecor" title="Associates">
                                        <h1 className="circle-title">2,200</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Associates</h4>
                                <span className="text-muted">View Associates</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="/tasks" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">12</h1>
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

                        <h2><i className="fas fa-tasks"></i>&nbsp;Tasks List</h2>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Watch Name</th>
                                        <th>Type</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {latestTasks && latestTasks.map(
                                        (latestTask, i) => <LastestTaskTableRow datum={latestTask} key={i} />)
                                    }
                                </tbody>
                            </table>
                            <Link to="/tasks" className="float-right">See more&nbsp;<i className="fas fa-chevron-right"></i></Link>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}

class LastestTaskTableRow extends Component {
    render() {
        const { slug, watchName, prettyTypeOf, absoluteUrl } = this.props.datum;

        return (
            <tr slug={slug}>
                <td>{watchName}</td>
                <td>{prettyTypeOf}</td>
                <td>
                    <a href={absoluteUrl}>
                        View&nbsp;<i className="fas fa-chevron-right"></i>
                    </a>
                </td>
            </tr>
        );
    }
}

export default StaffDashboardComponent;
