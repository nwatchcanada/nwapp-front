// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from "../../../../bootstrap/bootstrapDatePicker";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../../bootstrap/bootstrapSingleSelect";
import { BootstrapRadio } from "../../../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";
import { BootstrapSingleImageUploadAndPreview } from "../../../../bootstrap/bootstrapSingleImageUploadAndPreview";
import { BootstrapMultipleImageUploadAndPreview } from "../../../../bootstrap/bootstrapMultipleImageUploadAndPreview";
import { OTHER_CONCERN_TYPE_OF } from "../../../../../constants/api";


class ItemCreateStep3ConcernComponent extends Component {
    render() {
        const {
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
        const isOtherIncidentTypeOf = category === OTHER_CONCERN_TYPE_OF;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/item/add/step-1">
                                <span className="num">1.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/item/add/step-2-concern">
                                <span className="num">2.</span><span className="">Notice</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Category</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Details</span>
                        </div>
                    </div>
                </div>

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
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={ (event)=>{onClick(event)} }>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/admin/item/add/step-2-concern" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ItemCreateStep3ConcernComponent;
