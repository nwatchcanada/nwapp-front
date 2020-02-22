// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapSingleImageUploadAndPreview } from "../../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapMultipleImageUploadAndPreview } from "../../../bootstrap/bootstrapMultipleImageUploadAndPreview";
import {
    OTHER_EVENT_TYPE_OF,
    ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES,
    ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES
} from "../../../../constants/api";


class ItemCreateStep4EventComponent extends Component {
    render() {
        const {
            title, category, categoryOptions, categoryOther, description, errors, isLoading,
            onClick,  onTextChange, onSelectChange,
            logoPhoto, onLogoDrop, onLogoRemoveUploadClick,
            galleryPhotos, onGalleryDrop, onGalleryRemoveUploadClick,
            shownToWhom, canBePostedOnSocialMedia, onRadioChange,
        } = this.props;
        const isOtherEventTypeOf = category === OTHER_EVENT_TYPE_OF;
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
                            <Link to="/item/add/step-2-event">
                                <span className="num">2.</span><span className="">Categorize</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/item/add/step-3-event">
                                <span className="num">3.</span><span className="">Date/Time</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num">4.</span><span className="">Details</span>
                            </strong>
                        </div>
                    </div>
                </div>

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

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Event Type (*)"
                                name="category"
                                defaultOptionLabel="Please select the event type."
                                options={categoryOptions}
                                value={category}
                                error={errors.category}
                                onSelectChange={onSelectChange}
                            />

                            {isOtherEventTypeOf &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.categoryOther}
                                    label="Event Type - Other (*)"
                                    onChange={onTextChange}
                                    value={categoryOther}
                                    name="categoryOther"
                                    type="text"
                                />
                            }

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

                            <BootstrapSingleImageUploadAndPreview
                                error={errors.logoPhoto}
                                label="Logo"
                                onDrop={onLogoDrop}
                                name="logoPhoto"
                                fileObj={logoPhoto}
                                onRemoveUploadClick={onLogoRemoveUploadClick}
                            />

                            <BootstrapMultipleImageUploadAndPreview
                                error={errors.galleryPhotos}
                                label="Gallery Photos"
                                onDrop={onGalleryDrop}
                                name="galleryPhotos"
                                filesArray={galleryPhotos}
                                onRemoveUploadClick={onGalleryRemoveUploadClick}
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
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/item/add/step-3-event" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ItemCreateStep4EventComponent;
