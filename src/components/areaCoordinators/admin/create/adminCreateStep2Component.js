// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";


class CardComponent extends Component {
    render() {
        const { areaCoordinator, isLoading } = this.props;
        return (
            <div className="col-sm-3" id={areaCoordinator.slug}>
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/admin/areaCoordinator/${areaCoordinator.slug}`}>
                                {areaCoordinator.typeOf === 3 &&
                                    <strong><i className="fas fa-building"></i>&nbsp;{areaCoordinator.organizationName}</strong>
                                }
                                {areaCoordinator.typeOf === 2 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{areaCoordinator.firstName}&nbsp;{areaCoordinator.lastName}</strong>
                                }
                                {areaCoordinator.typeOf === 1 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{areaCoordinator.firstName}&nbsp;{areaCoordinator.lastName}</strong>
                                }
                            </Link>
                        </h5>
                        <p className="card-text">
                            {areaCoordinator.streetAddress}<br />
                            {areaCoordinator.locality}, {areaCoordinator.region}, {areaCoordinator.postalCode}<br />
                            <a href={`email:${areaCoordinator.email}`}>{areaCoordinator.email}</a><br />
                            <a href={`tel:${areaCoordinator.primaryPhoneE164}`}>{areaCoordinator.primaryPhoneNational}</a>
                        </p>
                        <Link to={`/admin/areaCoordinator/${areaCoordinator.slug}`} type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading}>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default class AreaCoordinatorCreateStep2Component extends Component {
    render() {
        const { areaCoordinators, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/areaCoordinators"><i className="fas fa-users"></i>&nbsp;AreaCoordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add AreaCoordinator</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/areaCoordinators/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Results</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Type</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Contact</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Address</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Watch</span>
                        </div>
                         <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Metrics</span>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Please select the areaCoordinator.</h5>
                </div>

                <div className="card-group row">
                    {areaCoordinators && areaCoordinators.map(
                        (areaCoordinator) => <CardComponent areaCoordinator={areaCoordinator} key={areaCoordinator.id} isLoading={isLoading} />)
                    }
                </div>

                <div className="float-right">
                    {hasPrevious &&
                        <Link onClick={onPreviousClick}><i class="fas fa-arrow-circle-left"></i>&nbsp;Previous</Link>
                    }&nbsp;&nbsp;
                    {hasNext &&
                        <Link onClick={onNextClick}>Next&nbsp;<i class="fas fa-arrow-circle-right"></i></Link>
                    }
                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Would you like to add a NEW areaCoordinator?</h5>
                    <Link to="/admin/areaCoordinators/add/step-1">
            		    <button type="button" class="btn btn-lg btn-dark m-3">
                            <i class="fas fa-arrow-circle-left"></i>&nbsp;No - use search again
            		    </button>
                    </Link>
            		<Link to="/admin/areaCoordinators/add/step-3">
            		    <button type="button" class="btn btn-lg btn-success m-3">
            		       <i class="fas fa-user"></i>&nbsp;Yes - add a new areaCoordinator
            		    </button>
                    </Link>
                </div>


            </main>
        );
    }
}
