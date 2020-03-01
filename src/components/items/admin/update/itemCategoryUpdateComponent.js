// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from "../../../bootstrap/bootstrapDatePicker";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapSingleImageUploadAndPreview } from "../../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapMultipleImageUploadAndPreview } from "../../../bootstrap/bootstrapMultipleImageUploadAndPreview";
import { OTHER_INCIDENT_TYPE_OF } from "../../../../constants/api";


class ItemCategoryUpdateComponent extends Component {
    render() {
        const {
            slug,
            item,
            category,
            categoryOptions,
            categoryOther,
            errors,
            onTextChange,
            onSelectChange,
            isLoading,
            onClick,
            isItemTypeLoading,
        } = this.props;
        const isOtherIncidentTypeOf = category === OTHER_INCIDENT_TYPE_OF;
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
                            <Link to={`/admin/item/${slug}`}><i className="fas fa-map-pin"></i>&nbsp;Details</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-map-pin"></i>&nbsp;Edit
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Edit Incident Item</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-sign"></i>&nbsp;Category Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Incident Category (*)"
                                name="category"
                                defaultOptionLabel="Please select the incident category."
                                options={categoryOptions}
                                value={category}
                                error={errors.category}
                                onSelectChange={onSelectChange}
                                isLoading={isItemTypeLoading}
                            />

                            {isOtherIncidentTypeOf &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.categoryOther}
                                    label="Incident Category - Other (*)"
                                    onChange={onTextChange}
                                    value={categoryOther}
                                    name="categoryOther"
                                    type="text"
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

export default ItemCategoryUpdateComponent;
