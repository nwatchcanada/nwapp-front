// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class MemberCreateStep2Component extends Component {
    render() {
        const { isLoading, onClick } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/members/active"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add Form</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/members/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Results</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Please select the area coordinator to promote.</h5>
                </div>

                <div className="card-group row">

                    <div className="col-sm-3">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to="#">
                                        <strong><i className="fas fa-home"></i>&nbsp;Rodolfo Martinez</strong>
                                    </Link>
                                </h5>
                                <p className="card-text">1848 Mickleborough Dr<br />
                                    London, ON<br />
                                    (519)521-3135
                                </p>
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ (event)=> { onClick(event, "rodolfo-martinez") } } disabled={isLoading}>Select</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to="#">
                                        <strong><i className="fas fa-building"></i>&nbsp;Frank Herbert</strong>
                                    </Link>
                                </h5>
                                <p className="card-text">1234 Dune Street<br />
                                    London, ON<br />
                                    (123)123-1234
                                </p>
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ (event)=> { onClick(event, "frank-herbert") } } disabled={isLoading}>Select</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to="#">
                                        <strong><i className="fas fa-university"></i>&nbsp;Robert A. Heinlein</strong>
                                    </Link>
                                </h5>
                                <p className="card-text">4567 Startship Trooper Avenue<br />
                                    Toronto, ON<br />
                                    (321)123-1234
                                </p>
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ (event)=> { onClick(event, "robert-a-heinlein") } } disabled={isLoading}>Select</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Would you like to add a NEW area coordinator?</h5>
                    <a href="/members/add/step-1">
            		    <button type="button" class="btn btn-lg btn-dark m-3">
                            <i class="fas fa-arrow-circle-left"></i>&nbsp;No - use search again
            		    </button>
                    </a>
            		<a href="/area-coordinators/add/step-1" target="_blank">
            		    <button type="button" class="btn btn-lg btn-success m-3">
            		       <i class="fas fa-external-link-alt"></i>&nbsp;Yes - add a new area coordinator
            		    </button>
                    </a>
                </div>


            </main>
        );
    }
}
