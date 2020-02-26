// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapMultipleImageUploadAndPreview } from "../../../../bootstrap/bootstrapMultipleImageUploadAndPreview";


class ItemCreateStep5ConcernComponent extends Component {
    render() {
        const {
            errors,isLoading, onClick, photos, onDrop, onRemoveUploadClick
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/item/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/item/add/step-2-concern">
                                <span className="num">2.</span><span className="">Notice</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/admin/item/add/step-3-concern">
                                <span className="num">3.</span><span className="">Category</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/admin/item/add/step-4-concern">
                                <span className="num">4.</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <strong>
                                <span className="num">5.</span><span className="">Photo(s)</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-exclamation-circle"></i>&nbsp;Concern Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapMultipleImageUploadAndPreview
                                error={errors.photos}
                                label="Photos"
                                onDrop={onDrop}
                                name="photos"
                                filesArray={photos}
                                onRemoveUploadClick={onRemoveUploadClick}
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/admin/item/add/step-4-concern" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default ItemCreateStep5ConcernComponent;
