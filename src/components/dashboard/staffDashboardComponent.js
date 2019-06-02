import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class StaffDashboardComponent extends Component {
    render() {
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
                                <h4><i className="fas fa-id-card"></i>&nbsp;Members</h4>
                                <div className="text-muted">View your members list</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/items" className="d-block link-ndecor" title="Jobs">
                                        <h1 className="circle-title">10,000</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-map-pin"></i>&nbsp;Items</h4>
                                <span className="text-muted">View your items history</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="#" className="d-block link-ndecor" title="Members">
                                        <h1 className="circle-title">2,200</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Associates</h4>
                                <span className="text-muted">View associate Data</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="#" className="d-block link-ndecor" title="Tasks">
                                        <h1 className="circle-title">12</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-tasks"></i>&nbsp;Tasks</h4>
                                <span className="text-muted">View your tasks</span>
                            </div>
                        </section>

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra
                                attention to featured content or information.</p>
                            <hr className="my-4" />
                            <p>It uses utility classes for typography and spacing to space content out within the larger
                                container.</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="#">Learn more&nbsp;<i className="fas fa-chevron-right"></i></Link>
                            </p>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}

export default StaffDashboardComponent;
