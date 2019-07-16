// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";


class WatchCreateStep3ComComponent extends Component {
    render() {
        const { name, description, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, isLoading, onClick, errors } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/watches"><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>Create Watch - Review</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/watches/step-1-create">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/watches/step-2-create-cc">
                                <span className="num">2.</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                        { /* <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Skills Required</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                        */ }
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the community cares watch.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;District details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">District</th>
                                    <td>{district.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Program</th>
                                    <td>Business</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate</th>
                                    <td>{associate.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Area Coordinator</th>
                                    <td>{primaryAreaCoordinator.label}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Area Coordinator</th>
                                    <td>{secondaryAreaCoordinator.label}</td>
                                </tr>
                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/watches/step-2-create-cc" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default WatchCreateStep3ComComponent;
