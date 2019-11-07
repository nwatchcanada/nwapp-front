// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class RegisterStep1Component extends Component {
    render() {
        return (
            <main id="main" role="main">

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Register
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Type</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Contact</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Address</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Watch</span>
                        </div>
                         <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Agreement</span>
                        </div>
                        <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <h2>
                    Are you signing up as a....?
                </h2>

                <div className="card-group row">
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-home fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Residential / Community Cares</h3>
                                <p className="card-text">Add a residential or community cares member</p>
                                <Link to="/register/step-2-rez-or-cc" className="btn btn-success btn-lg">
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-building fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Business</h3>
                                <p className="card-text">Add a business member</p>
                                <Link to="/register/step-2-biz" className="btn btn-success btn-lg">
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}
