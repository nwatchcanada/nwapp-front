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


export default class AdminResourceCreateStep2ImageComponent extends Component {
    render() {
        const {
            category, categoryOptions, name, description, errors,
            imageFile, file,
            onTextChange, onSelectChange, isLoading, onClick,
            onImageDrop, onRemoveImageUploadClick
        } = this.props;
        return (
            <main id="main" role="main">
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
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>Create Resource - Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/settings/resource/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Details</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Category (*)"
                                name="category"
                                defaultOptionLabel="Please select the category."
                                options={categoryOptions}
                                value={category}
                                error={errors.category}
                                onSelectChange={onSelectChange}
                            />

                            <ImageFormComponent
                                name={name}
                                imageFile={imageFile}
                                description={description}
                                errors={errors}
                                onTextChange={onTextChange}
                                onImageDrop={onImageDrop}
                                onRemoveImageUploadClick={onRemoveImageUploadClick}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/admin/settings/resource/add/step-1" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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


class ImageFormComponent extends Component {
    render() {
        const {
            name, imageFile, description, errors, onTextChange, onImageDrop, onRemoveImageUploadClick
        } = this.props;
        return (
            <div>
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.name}
                    label="Name (*)"
                    onChange={onTextChange}
                    value={name}
                    name="name"
                    type="text"
                />
                <BootstrapSingleImageUploadAndPreview
                    error={errors.imageFile}
                    label="Image File (*)"
                    onDrop={onImageDrop}
                    name="imageFile"
                    fileObj={imageFile}
                    onRemoveUploadClick={onRemoveImageUploadClick}
                />
                <BootstrapTextarea
                    name="description"
                    borderColour="border-primary"
                    label="Description (*)"
                    placeholder="Please set the link description"
                    rows="5"
                    value={description}
                    helpText="This is the description of the link."
                    onChange={onTextChange}
                    error={errors.description}
                />
            </div>
        );
    };
}
