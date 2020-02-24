// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";
import { BootstrapSingleImageUploadAndPreview } from "../../../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapSingleFileUploadAndPreview } from "../../../../bootstrap/bootstrapSingleFileUploadAndPreview";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";


export default class ItemCreateStep3ResourceComponent extends Component {
    render() {
        const {
            category, categoryOptions, typeOf, typeOfOptions, name, externalUrl, description, embedCode, errors,
            imageFile, file,
            onTextChange, onSelectChange, isLoading, onClick,
            onImageDrop, onRemoveImageUploadClick,
            onFileDrop, onRemoveFileUploadClick
        } = this.props;
        const isLinkTypeOf = typeOf === LINK_RESOURCE_TYPE_OF;
        const isYouTubeVideoTypeOf = typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF;
        const isImageTypeOf = typeOf === IMAGE_RESOURCE_TYPE_OF;
        const isFileTypeOf = typeOf === FILE_RESOURCE_TYPE_OF;
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

                {/* <h1>Create Resource - Select Type</h1> */}

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/item/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/item/add/step-2-resource">
                                <span className="num">2.</span><span className="">Categorize</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Format</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Details</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="card-group row">
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-link fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Link</h3>
                                <p className="card-text">Add a residential district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, LINK_RESOURCE_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-film fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">YouTube Video</h3>
                                <p className="card-text">Add a business district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, YOUTUBE_VIDEO_RESOURCE_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-image fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Image</h3>
                                <p className="card-text">Add a community cares district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, IMAGE_RESOURCE_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-file fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">File</h3>
                                <p className="card-text">Add a community cares district</p>
                                <button className="btn btn-success btn-lg" onClick={ (event)=>{ onClick(event, FILE_RESOURCE_TYPE_OF); } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <Link to="/admin/item/add/step-2-resource" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </main>
        );
    }
}
