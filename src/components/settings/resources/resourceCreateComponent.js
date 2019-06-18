// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../constants/api";


export default class ResourceCreateComponent extends Component {
    render() {
        const {
            category, categoryOptions, typeOf, typeOfOptions, name, url, description, youTubeEmbedCode, errors, onTextChange, onSelectChange, isLoading, onClick
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
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/resources"><i className="fas fa-atlas"></i>&nbsp;Resources</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Create New Resource</h1>
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

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Type (*)"
                                name="typeOf"
                                defaultOptionLabel="Please select the type."
                                options={typeOfOptions}
                                value={typeOf}
                                error={errors.typeOf}
                                onSelectChange={onSelectChange}
                            />

                            {isLinkTypeOf &&
                                <LinkFormComponent
                                    name={name}
                                    url={url}
                                    description={description}
                                    errors={errors}
                                    onTextChange={onTextChange}
                                />
                            }
                            {isYouTubeVideoTypeOf &&
                                <YouTubeVideoFormComponent
                                    name={name}
                                    youTubeEmbedCode={youTubeEmbedCode}
                                    description={description}
                                    errors={errors}
                                    onTextChange={onTextChange}
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check"></i>&nbsp;Submit
                                </button>
                                <Link to="/settings/resources" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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


class LinkFormComponent extends Component {
    render() {
        const { name, url, description, errors, onTextChange } = this.props;
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
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.url}
                    label="URL (*)"
                    onChange={onTextChange}
                    value={url}
                    name="url"
                    type="text"
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



class YouTubeVideoFormComponent extends Component {
    render() {
        const { name, youTubeEmbedCode, description, errors, onTextChange } = this.props;
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
                <BootstrapTextarea
                    name="youTubeEmbedCode"
                    borderColour="border-primary"
                    label="YouTube Embed Code (*)"
                    placeholder="Please set the YouTube embed code"
                    rows="5"
                    value={youTubeEmbedCode}
                    helpText="This is the embed code of the video."
                    onChange={onTextChange}
                    error={errors.youTubeEmbedCode}
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
