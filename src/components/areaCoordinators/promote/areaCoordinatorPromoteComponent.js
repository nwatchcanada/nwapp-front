// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class AreaCoordinatorPromoteComponent extends Component {
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
                            <Link to={`/area-coordinators/${urlArgument}`}><i className="fas fa-horse-head"></i>&nbsp;Area Coordinator</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/area-coordinators/${urlArgument}/${slug}`}><i className="fas fa-horse-head"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Area Coordinator</h1>
                <h5>Please confirm before submitting the promotion.</h5>

                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation</h1>
                    <p className="lead">Are you sure you want to promote this area coordinator to the role of associate?</p>
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
                        <Link to={`/area-coordinators/${urlArgument}/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                            <i className="fas fa-times-circle"></i>&nbsp;Cancel
                        </Link>
                    </div>
                </div>

            </main>
        );
    }
}
