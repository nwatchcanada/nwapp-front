import React, { Component } from 'react';
import { Link } from "react-router-dom";


class ActionIncidentItemTaskStep3Component extends Component {
    render() {
        const { onClick, onBack, willAction, comment, reason, reasonOther, slug, errors, } = this.props;

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
                            <Link to={`/task/4/${slug}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/4/${slug}/step-2`}>
                                <span className="num">2.</span><span className="">Action</span>
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
                                <td>A new watch has been created and requires an associate to be assigned. Please assign an associate to the watch.</td>
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

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/4/${slug}/step-2`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default ActionIncidentItemTaskStep3Component;
