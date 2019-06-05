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
                                    <Link to="/members/active" className="d-block link-ndecor" title="Members">
                                        <h1 className="circle-title">1,100</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-id-card"></i>&nbsp;Members</h4>
                                <div className="text-muted">View your members list</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/area-coordinators" className="d-block link-ndecor" title="Area Coordinators">
                                        <h1 className="circle-title">10,000</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</h4>
                                <span className="text-muted">View your area coordinators</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="/associates/active" className="d-block link-ndecor" title="Associates">
                                        <h1 className="circle-title">2,200</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Associates</h4>
                                <span className="text-muted">View associate Data</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="/items" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">12</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-map-pin"></i>&nbsp;Items</h4>
                                <span className="text-muted">View your items</span>
                            </div>
                        </section>

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                            <p className="lead">There doesn't appear to be any announcements, begin creating your announcement below.</p>

                            <p className="lead">
                                <Link className="btn btn-success btn-lg" to="#">
                                    <i className="fas fa-plus"></i>&nbsp;Add
                                </Link>
                            </p>
                        </div>

                        <h2><i className="fas fa-tasks"></i>&nbsp;Tasks List</h2>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Task #</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {latestTasks && latestTasks.map(
                                        (latestTask, i) => <TableRow datum={latestTask} key={i} />)
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

class TableRow extends Component {
    render() {
        const { slug, number, name, absoluteUrl } = this.props.datum;

        return (
            <tr slug={slug}>
                <td>{number}</td>
                <td>{name}</td>
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
