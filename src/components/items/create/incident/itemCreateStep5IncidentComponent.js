// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


export default class ItemCreateStep5IncidentComponent extends Component {
    render() {
        const {
            // Step 1
            typeOf,

            // Step 2
            prettyIncidentTypeOf,

            // Step 3
            notifiedAuthorities,
            notifiedAuthoritiesLabel,
            acceptAuthorityCooperation,
            acceptAuthorityCooperationLabel,

            // Step 4
            title,
            date,
            description,
            location,
            photos,

            // All
            errors, isLoading, onClick,
        } = this.props;

        // COPIED FROM: /components/boostrap/bootstrapMultipleImageUploadAndPreview.js
        const thumb = {
            display: 'inline-flex',
            // borderRadius: 2,
            // border: '1px solid #eaeaea',
            marginBottom: 8,
            marginRight: 8,
            width: 100,
            height: 100,
            padding: 4,
            boxSizing: 'border-box'
        };
        const img = {
            display: 'block',
            width: 'auto',
            height: '100%'
        };

        // For debugging purposes only.
        console.log(photos);

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/item/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/item/add/step-2-incident">
                                <span className="num">2.</span><span className="">Categorize</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/item/add/step-3-incident">
                                <span className="num">3.</span><span className="">Authorities</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/item/add/step-4-incident">
                                <span className="num">4.</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <strong>
                                <span className="num">5.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the item.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Items details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Type</th>
                                    <td>Incident</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Category</th>
                                    <td>{prettyIncidentTypeOf}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Title</th>
                                    <td>{title}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date</th>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{date}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>{location}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Photos</th>
                                    <td>
                                        {photos && photos.map(
                                            (photoObj, i) => <div key={i}>
                                                <div style={thumb}>
                                                    <img
                                                        src={photoObj.preview}
                                                        style={img}
                                                        alt={photoObj.name}
                                                    />
                                                </div>
                                                <br />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Have authorities been notified of this incident</th>
                                    <td>{notifiedAuthoritiesLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is willing to cooperate with authorities?</th>
                                    <td>{acceptAuthorityCooperationLabel}</td>
                                </tr>
                            </tbody>
                        </table>
                        <form>
                        <div className="form-group">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>
                            <Link to="/item/add/step-4-incident" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
