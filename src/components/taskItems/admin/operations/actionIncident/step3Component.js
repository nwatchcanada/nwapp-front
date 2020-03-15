import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class ActionIncidentItemTaskStep3Component extends Component {
    render() {
        const { onClick, onBack, willAction, comment, reason, reasonOther, uuid, errors, isLoading } = this.props;

        let reasonLabel = "";
        switch(reason) {
            case 1:
                reasonLabel = reasonOther;
                break;
            case 2:
                reasonLabel = "The concern has been referred to another community partner";
                break;
            case 3:
                reasonLabel = "This is outside the scope of NW";
                break;
            case 4:
                reasonLabel = "This concern has nothing to do with NW";
                break;
            case 5:
                reasonLabel = "This concern is not serious";
                break;
            default:
                reasonLabel = "";
          }

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
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
                            <Link to={`/admin/task/4/${uuid}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/admin/task/4/${uuid}/step-2`}>
                                <span className="num">2.</span><span className="">Action</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-8 mx-auto mt-2">
                        <form>
                            {/* <h1><i className="fas fa-archive"></i>&nbsp;Archive File</h1> */}

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <div className="jumbotron">
                                <h1 className="display-4"><i className="fas fa-question-circle"></i>&nbsp;Are you sure?</h1>
                                <p className="lead">You are about to action this incident.</p>


                                <div className="row">
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
                                                <td>Some submitted a NW concern item that requires action.</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="bg-light">Will Reply</th>
                                                <td>
                                                    {willAction
                                                        ?"Yes"
                                                        :"No"
                                                    }
                                                </td>
                                            </tr>
                                            {willAction
                                                ?<tr>
                                                    <th scope="row" className="bg-light">Comment</th>
                                                    <td>{comment}</td>
                                                </tr>
                                                :<tr>
                                                    <th scope="row" className="bg-light">Reason</th>
                                                    <td>
                                                        {reasonLabel}
                                                    </td>
                                                </tr>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/task/4/${uuid}/step-2`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}
