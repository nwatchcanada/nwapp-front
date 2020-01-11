// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminMemberCreateStep2Component extends Component {
    render() {
        const { members, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick, onMemberClick } = this.props;
        const hasNoMembers = members.length <= 0;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/area-coordinators"><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add Area Coordinator
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add Area Coordinator</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/area-coordinators/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Results</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Agreement</span>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Please select the member to promote.</h5>
                </div>



                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>

                        {hasNoMembers
                            ?<div className="jumbotron">
                                <h1 className="display-4">No Results Found</h1>
                                <p className="lead">It appears nothing was found for your search results. Please try again by clicking below.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/admin/area-coordinators/add/step-1">Try Again&nbsp;<i class="fas fa-chevron-right"></i></Link>
                                </p>
                            </div>
                            :<div className="card-group row">
                                {members && members.map(
                                    (member) => <CardComponent member={member} key={member.id} isLoading={isLoading} onMemberClick={onMemberClick} />)
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


                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Would you like to add a NEW area coordinator?</h5>
                    <a href="/admin/area-coordinators/add/step-1">
            		    <button type="button" class="btn btn-lg btn-dark m-3">
                            <i class="fas fa-arrow-circle-left"></i>&nbsp;No - use search again
            		    </button>
                    </a>
            		<a href="/admin/members/add/step-1" target="_blank">
            		    <button type="button" class="btn btn-lg btn-success m-3">
            		       <i class="fas fa-external-link-alt"></i>&nbsp;Yes - add a new member
            		    </button>
                    </a>
                </div>


            </main>
        );
    }
}



class CardComponent extends Component {
    render() {
        const { member, isLoading, onMemberClick } = this.props;
        return (
            <div className="col-sm-3" id={member.slug}>
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/admin/area-coordinators/add/step-1`}>
                                {member.typeOf === 3 &&
                                    <strong><i className="fas fa-building"></i>&nbsp;{member.organizationName}</strong>
                                }
                                {member.typeOf === 2 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{member.firstName}&nbsp;{member.lastName}</strong>
                                }
                                {member.typeOf === 1 &&
                                    <strong><i className="fas fa-home"></i>&nbsp;{member.firstName}&nbsp;{member.lastName}</strong>
                                }
                            </Link>
                        </h5>
                        <p className="card-text">
                            {member.streetAddress}<br />
                            {member.locality}, {member.region}, {member.postalCode}<br />
                            <a href={`email:${member.email}`}>{member.email}</a><br />
                            <a href={`tel:${member.primaryPhoneE164}`}>{member.primaryPhoneNational}</a>
                        </p>
                        <Link onClick={ (event)=> { onMemberClick(event, member.slug, member.firstName, member.lastName) } } type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading}>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
