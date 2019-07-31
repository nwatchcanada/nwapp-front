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
import { OTHER_EVENT_TYPE_OF } from "../../../constants/api";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   // INFORMATION_ITEM_TYPE_OF
   ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES,
   ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES
} from "../../../constants/api";


class ItemUpdateInfoComponent extends Component {
    render() {
        const {
            slug,
            typeOf,
            title,
            description,
            errors,
            isLoading,
            onTextChange, onClick
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

export default ItemUpdateInfoComponent;
