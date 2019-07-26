// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class MemberPromoteStep2Component extends Component {
    render() {
        const { slug, onClick, isLoading } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/members"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/member/${slug}`}><i className="fas fa-user"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Member</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <span className="num">1.</span><span className="">
                                <Link to={`/member/${slug}/promote/step-1`}>Selection</Link>
                            </span>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <h5>Please confirm before submitting the promotion.</h5>

                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation</h1>
                    <p className="lead">Are you sure you want to promote this member?</p>
                    <hr className="my-4" />
                    <p>You agree to the <a href="/terms">terms</a> of the organization when submitting this promotion.</p>
                    <p className="lead">
                        <button className="btn btn-primary btn-lg" disabled={isLoading} onClick={onClick}>
                        Confirm & Submit
                        </button>
                    </p>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <Link to={`/member/${slug}/promote/step-1`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                            <i className="fas fa-arrow-circle-left"></i> Back
                        </Link>
                    </div>
                </div>

            </main>
        );
    }
}
