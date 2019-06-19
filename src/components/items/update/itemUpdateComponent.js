// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleImageUploadAndPreview } from "../../bootstrap/bootstrapMultipleImageUploadAndPreview";
import { OTHER_EVENT_TYPE_OF } from "../../../constants/api";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


class ItemUpdateComponent extends Component {
    render() {
        const {
            slug,
            typeOf,
            title,
            description,
            location,
            eventTypeOf,
            eventTypeOfOption,
            eventTypeOfOptions,
            eventTypeOfOther,
            date,
            photos,
            errors,
            isLoading,
            onTextChange, onDateTimeChange, onSelectChange, onClick, onDrop, onRemoveUploadClick
        } = this.props;

        const isOtherEventTypeOf = eventTypeOf === OTHER_EVENT_TYPE_OF;
        const isIncidentItemOrConcernItemOrEventItem = typeOf === INCIDENT_ITEM_TYPE_OF || typeOf === CONCERN_ITEM_TYPE_OF || typeOf === EVENT_ITEM_TYPE_OF;
        const isIncidentItemOrConcernItem = typeOf === INCIDENT_ITEM_TYPE_OF || typeOf === CONCERN_ITEM_TYPE_OF;
        const isIncidentItemOrEventItem = typeOf === INCIDENT_ITEM_TYPE_OF || typeOf === EVENT_ITEM_TYPE_OF;
        const isEventItem = typeOf === EVENT_ITEM_TYPE_OF;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/items"><i className="fas fa-map-pin"></i>&nbsp;Item</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/item/argyle"><i className="fas fa-map-pin"></i>&nbsp;Argyle</Link>
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

                            {isIncidentItemOrConcernItemOrEventItem &&
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

                            {isEventItem &&
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
                            }
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

                            {isIncidentItemOrEventItem &&
                                <BootstrapDatePicker
                                    label="Date (*)"
                                    name="date"
                                    dateObj={date}
                                    onTimeChange={onDateTimeChange}
                                    datePickerClassName="form-control form-control-lg border"
                                    divClassName="form-group p-0 col-md-7 mb-4"
                                    error={errors.date}
                                />
                            }

                            {isIncidentItemOrConcernItemOrEventItem &&
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
                            }                            

                            {isIncidentItemOrConcernItem &&
                                <BootstrapMultipleImageUploadAndPreview
                                    error={errors.photos}
                                    label="Photos"
                                    onDrop={onDrop}
                                    name="photos"
                                    filesArray={photos}
                                    onRemoveUploadClick={onRemoveUploadClick}
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check"></i>&nbsp;Submit
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

export default ItemUpdateComponent;
