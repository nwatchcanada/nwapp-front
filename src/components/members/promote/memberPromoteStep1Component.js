// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class MemberPromoteStep1Component extends Component {
    render() {
        const { urlArgument, slug, onClick, isLoading } = this.props;
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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/members/${urlArgument}/${slug}`}><i className="fas fa-users"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Member</h1>
                <h5>Please select what the promotion is.</h5>

                <div className="card-group row">
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-horse-head fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Area Coordinator</h3>
                                <p className="card-text">Promote the member to be an area coordinator.</p>
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onClick}>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-crown fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Associate</h3>
                                <p className="card-text">Promote the member to be an associate.</p>
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onClick}>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Link to={`/members/${urlArgument}/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                            <i className="fas fa-arrow-circle-left"></i> Back
                        </Link>
                    </div>
                </div>

            </main>
        );
    }
}
