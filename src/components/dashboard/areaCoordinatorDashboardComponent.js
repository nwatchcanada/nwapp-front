import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class AreaCoordinatorDashboardComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main">
                        <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-group row">

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-map-pin fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Items</h3>
                                                <p className="card-text">View items</p>
                                                <Link to="/settings/districts" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-shield-alt fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">My Watches</h3>
                                                <p className="card-text">View my watches.</p>
                                                <Link to="/settings/districts" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-newspaper fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">News</h3>
                                                <p className="card-text">View news</p>
                                                <Link to="/settings/districts" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-atlas fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Resources</h3>
                                                <p className="card-text">View resources</p>
                                                <Link to="/settings/districts" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-pepper-hot fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Perks</h3>
                                                <p className="card-text">View your perks</p>
                                                <Link to="/settings/districts" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default AreaCoordinatorDashboardComponent;
