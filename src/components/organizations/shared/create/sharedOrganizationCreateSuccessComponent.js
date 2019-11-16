import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SharedOrganizationCreateSuccessComponent extends Component {
    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/organizations"><i className="fas fa-building"></i>&nbsp;Organizations</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-plus"></i>&nbsp;Add Organization</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">

                        <div className="jumbotron">
                            <h1 className="display-4">Organization building...</h1>
                            <p className="lead">The organization is now being built by us, please wait 5 minutes and the organization will be ready then.</p>
                            <hr className="my-4" />
                            <p>Click below to go back to the list page.</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="/organizations">Back to organization list&nbsp;<i className="fas fa-chevron-right"></i></Link>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default SharedOrganizationCreateSuccessComponent;
