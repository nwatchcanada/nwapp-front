import React, { Component } from 'react';
import { Link } from "react-router-dom";


class AssignWatchAreaCoordinatorTaskStep3Component extends Component {
    render() {
        const { areaCoordinatorLabel, onClick, onBack, slug } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task #1
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Argyle</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/2/${slug}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/2/${slug}/step-2`}>
                                <span className="num">2.</span><span className="">Selection</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="ow">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Submission Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>Assign watch an area coordinator.</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Watch</th>
                                    <td>Byron Community Watch</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Area Coordinator</th>
                                    <td>{areaCoordinatorLabel}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/2/${slug}/step-2`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default AssignWatchAreaCoordinatorTaskStep3Component;
