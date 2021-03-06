import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import DOMPurify from "dompurify";

import { FlashMessageComponent } from "../../../../flashMessageComponent";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminResourceRetrieveComponent extends Component {
    render() {
        const { resourceData, onClick, onBack, flashMessage, isLoading } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/resources"><i className="fas fa-atlas"></i>&nbsp;Resources</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-resource"></i>&nbsp;{resourceData && resourceData.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-resource"></i>&nbsp;{resourceData && resourceData.name}</h1>

                {resourceData.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This resource item is archived and is read-only.
                    </div>
                }

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className="fas fa-table"></i>&nbsp;Resource details</th>
                                </tr>

                                {resourceData && resourceData.name &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>{resourceData.name}</td>
                                    </tr>
                                }

                                {resourceData && resourceData.description &&
                                    <tr>
                                        <th scope="row" className="bg-light">Description</th>
                                        <td>{resourceData.description}</td>
                                    </tr>
                                }


                                {resourceData && resourceData.category &&
                                    <tr>
                                        <th scope="row" className="bg-light">Category</th>
                                        <td>{resourceData.categoryLabel}</td>
                                    </tr>
                                }

                                {resourceData && resourceData.typeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Type</th>
                                        <td>{resourceData.typeOfLabel}</td>
                                    </tr>
                                }

                                {resourceData && resourceData.externalUrl &&
                                    <tr>
                                        <th scope="row" className="bg-light">External URL</th>
                                        <td>
                                            <a href={resourceData.externalUrl} target="_blank">{resourceData.externalUrl}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                        </td>
                                    </tr>
                                }

                                {resourceData && resourceData.embedCode &&
                                    <tr>
                                        <th scope="row" className="bg-light">YouTube Video</th>
                                        <td dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(resourceData.embedCode) }}></td>
                                    </tr>
                                }

                                {resourceData && resourceData.imageUrl &&
                                    <tr>
                                        <th scope="row" className="bg-light">Image</th>
                                        <td>
                                            <img src={resourceData.imageUrl} alt="Image" />
                                        </td>
                                    </tr>
                                }

                                {resourceData && resourceData.fileUrl &&
                                    <tr>
                                        <th scope="row" className="bg-light">File</th>
                                        <td>
                                            <a href={resourceData.fileUrl} target="_blank">
                                                <i className="fas fa-cloud-download-alt"></i>&nbsp;Download now
                                            </a>
                                        </td>
                                    </tr>
                                }

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {resourceData && <Moment format="MM/DD/YYYY hh:mm:ss a">{resourceData.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{resourceData && resourceData.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {resourceData && <Moment format="MM/DD/YYYY hh:mm:ss a">{resourceData.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{resourceData && resourceData.lastModifiedBy}</td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>

                            <button className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" onClick={onBack}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}
