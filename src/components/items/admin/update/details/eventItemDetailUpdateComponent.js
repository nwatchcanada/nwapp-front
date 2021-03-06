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
import {
    ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES,
    ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES
} from "../../../../../constants/api";


class EventItemDetailUpdateComponent extends Component {
    render() {
        const {
            slug, title, description, externalUrl, errors, isLoading,
            onClick,  onTextChange, onSelectChange,
            eventLogoImage, onLogoDrop, onLogoRemoveUploadClick,
            shownToWhom, canBePostedOnSocialMedia, onRadioChange,
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

                <h1><i className="fas fa-edit"></i>&nbsp;Edit Event Item</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-glass-cheers"></i>&nbsp;Event Form</h1>
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

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description (*)"
                                placeholder="Please describe your event"
                                rows="5"
                                value={description}
                                helpText=""
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.externalUrl}
                                label="External web address"
                                onChange={onTextChange}
                                value={externalUrl}
                                name="externalUrl"
                                type="text"
                                helpText="If you would like people to visit an external website for this event, please fill it in here."
                            />

                            <BootstrapSingleImageUploadAndPreview
                                error={errors.eventLogoImage}
                                label="Logo"
                                onDrop={onLogoDrop}
                                name="eventLogoImage"
                                fileObj={eventLogoImage}
                                onRemoveUploadClick={onLogoRemoveUploadClick}
                                helpText=""
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.shownToWhom}
                                label="This event should be shown to whom? (*)"
                                name="shownToWhom"
                                onChange={onRadioChange}
                                selectedValue={shownToWhom}
                                options={ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.canBePostedOnSocialMedia}
                                label="This event can be shared by others on social media? (*)"
                                name="canBePostedOnSocialMedia"
                                onChange={onRadioChange}
                                selectedValue={canBePostedOnSocialMedia}
                                options={ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
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

export default EventItemDetailUpdateComponent;
