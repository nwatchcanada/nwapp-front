// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";


export default class WatchCreateStep2BizComponent extends Component {
    render() {
        const {
            // Page related.
            tags, tagOptions, name, description, associate, associateOptions, district, districtOptions,
            primaryAreaCoordinator, primaryAreaCoordinatorOptions, secondaryAreaCoordinator, secondaryAreaCoordinatorOptions, streetMembership,
            errors, isLoading, onClick, onTextChange, onSelectChange, onMultiChange,

            // Modal related.
            streetNumberStart, streetNumberFinish, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions,
            showModal, onAddClick, onRemoveClick, onSaveClick, onCloseClick
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/watches"><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
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
                            <Link to="/watches/step-1-create">
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
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                        { /* <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Skills Required</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                        */ }
                    </div>
                </div>

                <div className="col-md-5 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center">Details</h3>
                    <form id="residential-form" method="post" className="needs-validation" action="" noValidate>
                        <div className="form-group">

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

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

                            <BootstrapSingleSelect
                                label="Associate (*)"
                                name="associate"
                                defaultOptionLabel="Please select the associate."
                                options={associateOptions}
                                value={associate}
                                error={errors.associate}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="Primary Area Coordinator (*)"
                                name="primaryAreaCoordinator"
                                defaultOptionLabel="Please select the primary area coordinator."
                                options={primaryAreaCoordinatorOptions}
                                value={primaryAreaCoordinator}
                                error={errors.primaryAreaCoordinator}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="Secondary Area Coordinator (*)"
                                name="secondaryAreaCoordinator"
                                defaultOptionLabel="Please select the secondary area coordinator."
                                options={secondaryAreaCoordinatorOptions}
                                value={secondaryAreaCoordinator}
                                error={errors.secondaryAreaCoordinator}
                                onSelectChange={onSelectChange}
                            />

                            <AddModalComponent
                                streetNumberStart={streetNumberStart}
                                streetNumberFinish={streetNumberFinish}
                                streetName={streetName}
                                streetType={streetType}
                                streetTypeOptions={streetTypeOptions}
                                streetTypeOther={streetTypeOther}
                                streetDirection={streetDirection}
                                streetDirectionOptions={streetDirectionOptions}
                                onTextChange={onTextChange}
                                onSelectChange={onSelectChange}
                                errors={errors}
                                showModal={showModal}
                                onSaveClick={onSaveClick}
                                onCloseClick={onCloseClick}
                            />

                            <StreetMembershipTable
                               streetMembership={streetMembership}
                               onAddClick={onAddClick}
                               onRemoveClick={onRemoveClick}
                            />

                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>
                            <Link to="/watches/step-1-create" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </form>
                </div>

            </main>
        );
    }
}



class StreetMembershipRow extends Component {
    render() {
        const { streetAddress, streetNumberStart, streetNumberFinish, streetName, streetType, streetDirection, onRemoveClick } = this.props;
        return (
            <tr key={streetAddress}>
                <td>
                    {streetNumberStart}
                </td>
                <td>
                    {streetNumberFinish}
                </td>
                <td>
                    {streetName}
                </td>
                <td>
                    {streetType}
                </td>
                <td>
                    {streetDirection}
                </td>
                <td>
                    <button type="button" className="btn btn-danger float-right" aria-label="prev" onClick={() => onRemoveClick(streetAddress)}>
                        <span className="fa fa-minus"></span>
                    </button>
                </td>
            </tr>
        );
    }
}


class StreetMembershipTable extends Component {
    render() {
        const { streetMembership, onAddClick, onRemoveClick } = this.props;

        let elements = [];
        if (streetMembership !== undefined && streetMembership !== null) {
            for (let i = 0; i < streetMembership.length; i++) {
                let rowData = streetMembership[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <StreetMembershipRow
                            key={rowData.streetAddress}
                            streetAddress={rowData.streetAddress}
                            streetNumberStart={rowData.streetNumberStart}
                            streetNumberFinish={rowData.streetNumberFinish}
                            streetName={rowData.streetName}
                            streetType={rowData.streetType}
                            streetDirection={rowData.streetDirection}
                            onRemoveClick={onRemoveClick}
                        />
                    );
                }
            }
        }

        return (
            <div>

                <div className="row">
                    <div className="col-md-12 mx-auto mt-2">
                        <button type="button" className="btn btn-success float-right" onClick={onAddClick}>
                            <span className="fa fa-plus">&nbsp;Add Address Info</span>
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Street # (Start)</th>
                                <th>Street # (Finish)</th>
                                <th>Street Name</th>
                                <th>Street Type</th>
                                <th>Direction</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {elements}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class AddModalComponent extends Component {
    render() {
        const {
            streetNumberStart, streetNumberFinish, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, onTextChange, errors,
            showModal, onSaveClick, onCloseClick, onSelectChange } = this.props;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                marginRight           : '0%',
                marginLeft            : '0%',
                marginTop             : '50px',
                marginBottom          : '0%',
            }
        };

        const isOtherStreetTypeSelected = streetType === 'Other';

        return (
            <div>
                <ReactModal
                    style={customStyles}
                    isOpen={showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <h1>
                        <i className="fas fa-plus"></i>&nbsp;Add Location
                        <button type="button" className="btn btn-secondary btn-lg float-right" onClick={onCloseClick}>
                            <span className="fa fa-times"></span>
                        </button>
                    </h1>

                    <div className="row">
                        <div className="col-md-8 mx-auto mt-2">

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <form className="needs-validation" noValidate>
                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.streetNumberStart}
                                    label="Street Number Start (*)"
                                    onChange={onTextChange}
                                    value={streetNumberStart}
                                    name="streetNumberStart"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.streetNumberFinish}
                                    label="Street Number Finish (*)"
                                    onChange={onTextChange}
                                    value={streetNumberFinish}
                                    name="streetNumberFinish"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.streetName}
                                    label="Street Name (*)"
                                    onChange={onTextChange}
                                    value={streetName}
                                    name="streetName"
                                    type="text"
                                />

                                <BootstrapSingleSelect
                                    borderColour="border-primary"
                                    label="Street Type (*)"
                                    name="streetType"
                                    defaultOptionLabel="Please select a street type."
                                    options={streetTypeOptions}
                                    value={streetType}
                                    error={errors.streetType}
                                    onSelectChange={onSelectChange}
                                />

                                {isOtherStreetTypeSelected &&
                                    <BootstrapInput
                                        inputClassName="form-control form-control-lg"
                                        borderColour="border-primary"
                                        error={errors.streetTypeOther}
                                        label="Street Type Other (*)"
                                        onChange={onTextChange}
                                        value={streetTypeOther}
                                        name="streetTypeOther"
                                        type="text"
                                    />
                                }

                                <BootstrapSingleSelect
                                    borderColour="border-successs"
                                    label="Street Direction"
                                    name="streetDirection"
                                    defaultOptionLabel="Please select a street direction."
                                    options={streetDirectionOptions}
                                    value={streetDirection}
                                    error={errors.streetDirection}
                                    onSelectChange={onSelectChange}
                                />

                                <button
                                    onClick={onCloseClick}
                                    type="button"
                                    className="btn btn-lg btn-secondary float-left">
                                    <i className="fas fa-times"></i>&nbsp;Close
                                </button>
                                <button
                                    onClick={onSaveClick}
                                    type="button"
                                    className="btn btn-lg btn-success float-right">
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>

                            </form>
                        </div>
                    </div>

                </ReactModal>
            </div>
        );
    }
}
