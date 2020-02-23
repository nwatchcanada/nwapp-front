// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapSingleImageUploadAndPreview } from "../../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapMultipleImageUploadAndPreview } from "../../../bootstrap/bootstrapMultipleImageUploadAndPreview";
import { OTHER_EVENT_TYPE_OF } from "../../../../constants/api";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   // INFORMATION_ITEM_TYPE_OF
   ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES,
   ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES
} from "../../../../constants/api";


class ItemUpdateEventComponent extends Component {
    render() {
        const {
            slug,
            typeOf,
            title,
            description,
            location,
            eventTypeOf,
            eventTypeOfOptions,
            eventTypeOfOther,
            date,
            logoPhoto, onLogoDrop, onLogoRemoveUploadClick,
            galleryPhotos, onGalleryDrop, onGalleryRemoveUploadClick,
            errors,
            isLoading,
            onTextChange, onDateTimeChange, onSelectChange, onClick, onDrop, onRemoveUploadClick,
            shownToWhom, canBePostedOnSocialMedia, onRadioChange,
        } = this.props;

        const isOtherEventTypeOf = eventTypeOf === OTHER_EVENT_TYPE_OF;

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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/item/${slug}`}><i className="fas fa-map-pin"></i>&nbsp;Item</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-edit"></i>&nbsp;Update Item</h1>
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
                                name="eventTypeOf"
                                defaultOptionLabel="Please select the event type."
                                options={eventTypeOfOptions}
                                value={eventTypeOf}
                                error={errors.eventTypeOf}
                                onSelectChange={onSelectChange}
                            />

                            {isOtherEventTypeOf &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.eventTypeOfOther}
                                    label="Event Type - Other (*)"
                                    onChange={onTextChange}
                                    value={eventTypeOfOther}
                                    name="eventTypeOfOther"
                                    type="text"
                                />
                            }

                            <BootstrapDatePicker
                                label="Date (*)"
                                name="date"
                                dateObj={date}
                                onTimeChange={onDateTimeChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.date}
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
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/admin/item/argyle" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ItemUpdateEventComponent;
