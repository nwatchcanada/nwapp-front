// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";


export default class AdminWatchCreateStep2Component extends Component {
    render() {
        const {
            tags, tagOptions, name, description, district, districtOptions,
            errors, isLoading, onClick, onTextChange, onSelectChange,
            onMultiChange,
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/watches"><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>Create Watch - Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/watches/step-1-create">
                                <span className="num">1.</span><span className="">
                                    Type
                                </span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Street Membership</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center"><i className="fas fa-table"></i>&nbsp;Details</h3>
                    <form id="residential-form" method="post" className="needs-validation" action="" noValidate>
                        <div className="form-group">

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

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
                                name="description"
                                borderColour="border-primary"
                                label="Description (*)"
                                placeholder="Please describe your concern"
                                rows="5"
                                value={description}
                                helpText=""
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapSingleSelect
                                label="District (*)"
                                name="district"
                                defaultOptionLabel="Please select the residential district."
                                options={districtOptions}
                                value={district}
                                error={errors.district}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onMultiChange}
                            />

                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>
                            <Link to="/admin/watches/step-1-create" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </form>
                </div>

            </main>
        );
    }
}
