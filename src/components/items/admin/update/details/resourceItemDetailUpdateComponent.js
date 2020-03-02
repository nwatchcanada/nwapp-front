// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapDatePicker } from "../../../../bootstrap/bootstrapDatePicker";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../../bootstrap/bootstrapSingleSelect";
import { BootstrapRadio } from "../../../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";
import { BootstrapSingleImageUploadAndPreview } from "../../../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapSingleFileUploadAndPreview } from "../../../../bootstrap/bootstrapSingleFileUploadAndPreview";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";


export default class ResourceItemDetailUpdateComponent extends Component {
    render() {
        const {
            typeOf, formatType, title, embedCode, description, externalUrl, image, file, slug, errors, isLoading,
            onTextChange,
            onSelectChange,
            onClick,
            onDrop, onRemoveUploadClick,
        } = this.props;

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/items"><i className="fas fa-map-pin"></i>&nbsp;Items</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/item/${slug}`}><i className="fas fa-map-pin"></i>&nbsp;Details</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;Edit
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-edit"></i>&nbsp;Edit Resource Item</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-sign"></i>&nbsp;Details Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.title}
                                label="Title (*)"
                                onChange={onTextChange}
                                value={title}
                                name="title"
                                type="text"
                            />
                            {formatType === LINK_RESOURCE_TYPE_OF &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.externalUrl}
                                    label="External URL (*)"
                                    onChange={onTextChange}
                                    value={externalUrl}
                                    name="externalUrl"
                                    type="text"
                                />
                            }
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

                            {formatType === YOUTUBE_VIDEO_RESOURCE_TYPE_OF &&
                                <BootstrapTextarea
                                    name="embedCode"
                                    borderColour="border-primary"
                                    label="YouTube Embed Code (*)"
                                    placeholder="Please set the YouTube embed code"
                                    rows="5"
                                    value={embedCode}
                                    helpText="This is the embed code of the video."
                                    onChange={onTextChange}
                                    error={errors.embedCode}
                                />
                            }

                            {formatType === IMAGE_RESOURCE_TYPE_OF &&
                                <BootstrapSingleImageUploadAndPreview
                                    error={errors.file}
                                    label="Image File (*)"
                                    onDrop={onDrop}
                                    name="file"
                                    fileObj={file}
                                    onRemoveUploadClick={onRemoveUploadClick}
                                />
                            }
                            {formatType === FILE_RESOURCE_TYPE_OF &&
                                <BootstrapSingleFileUploadAndPreview
                                    error={errors.file}
                                    label="File File (*)"
                                    onDrop={onDrop}
                                    name="file"
                                    fileObj={file}
                                    onRemoveUploadClick={onRemoveUploadClick}
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={ (event)=>{onClick(event)} }>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/item/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
