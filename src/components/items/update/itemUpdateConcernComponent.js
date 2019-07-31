// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapSingleImageUploadAndPreview } from "../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapMultipleImageUploadAndPreview } from "../../bootstrap/bootstrapMultipleImageUploadAndPreview";
import { OTHER_INCIDENT_TYPE_OF } from "../../../constants/api";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   // INFORMATION_ITEM_TYPE_OF
   ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES,
   ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES,
   INCIDENT_TYPE_CHOICES,
   ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES,
   ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES
} from "../../../constants/api";


class ItemUpdateConcernComponent extends Component {
    render() {
        const {
            typeOf,

            title,
            date,
            description,
            location,
            photos,

            errors, isLoading, onClick, slug, onSelectChange, onTextChange, onRadioChange,
            onDateTimeChange, onDrop, onRemoveUploadClick
        } = this.props;
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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/item/${slug}`}><i className="fas fa-map-pin"></i>&nbsp;Item</Link>
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

                            <h4><i className="fas fa-exclamation-circle"></i>&nbsp;Details</h4>

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
                                placeholder="Please describe your incident"
                                rows="5"
                                value={description}
                                helpText=""
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.location}
                                label="Location (*)"
                                onChange={onTextChange}
                                value={location}
                                name="location"
                                type="text"
                            />

                            <BootstrapMultipleImageUploadAndPreview
                                error={errors.photos}
                                label="photos"
                                onDrop={onDrop}
                                name="photos"
                                filesArray={photos}
                                onRemoveUploadClick={onRemoveUploadClick}
                            />


                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/item/argyle" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ItemUpdateConcernComponent;
