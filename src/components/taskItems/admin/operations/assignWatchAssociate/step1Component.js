import React, { Component } from 'react';
import { Link } from "react-router-dom";


class AssignWatchAssociateTaskStep1Component extends Component {
    render() {
        const { onClick, onBack } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Assign Associate to Watch
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Assign Associate to Watch</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Info</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Search</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Selection</span>
                        </div>
                    </div>
                </div>

                <div className="ow">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">
                                    <i className="fas fa-table"></i>&nbsp;Task Details
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Description</th>
                                <td>A new watch has been created and has the option of assigning an associate. Please assign an associate to the watch if there is one.</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Watch</th>
                                <td>Byron Watch</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Tags</th>
                                <td><span className="badge badge-info badge-lg">Skill 1</span> <span
                                        className="badge badge-info badge-lg">Skill 2</span>
                                    <span className="badge badge-info badge-lg">HTML</span> <span
                                            className="badge badge-info badge-lg">PHP</span> <span
                                            className="badge badge-info badge-lg">Bootstrap</span> <span
                                            className="badge badge-info badge-lg">Django</span> <span
                                            className="badge badge-info badge-lg">Photoshop</span> <span
                                            className="badge badge-info badge-lg">Python</span> <span
                                            className="badge badge-info badge-lg">ASP.net</span> <span
                                            className="badge badge-info badge-lg">Android</span> <span
                                            className="badge badge-info badge-lg">jQuery</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                Proceed to Search&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to="/admin/tasks">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default AssignWatchAssociateTaskStep1Component;
