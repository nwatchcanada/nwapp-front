// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


export default class WatchCreateStep2RezComponent extends Component {
    render() {
        const {
            // Page related.
            name, associate, associateOptions, district, districtOptions,
            primaryAreaCoordinator, primaryAreaCoordinatorOptions, secondaryAreaCoordinator, secondaryAreaCoordinatorOptions, streetMembershipArray,
            errors, isLoading, onClick, onTextChange, onSelectChange,

            // Modal related.
            streetNumberStart, streetNumberFinish, streetName, streetType, streetDirection,
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
                            <span className="num">2.</span><span className="">Details</span>
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
                                label="District (*)"
                                name="district"
                                defaultOptionLabel="Please select the residential district."
                                options={districtOptions}
                                value={district}
                                error={errors.district}
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
                                streetDirection={streetDirection}
                                onTextChange={onTextChange}
                                errors={errors}
                                showModal={showModal}
                                onSaveClick={onSaveClick}
                                onCloseClick={onCloseClick}
                            />

                            <StreetMembershipTable
                               streetMembershipArray={streetMembershipArray}
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
        const { streetAddress, streetNumberStart, streetNumberFinish, streetName, streetType, onRemoveClick } = this.props;
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
        const { streetsArray, onAddClick, onRemoveClick } = this.props;

        let elements = [];
        if (streetsArray !== undefined && streetsArray !== null) {
            for (let i = 0; i < streetsArray.length; i++) {
                let rowData = streetsArray[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <StreetMembershipRow
                            key={rowData.streetAddress}
                            streetAddress={rowData.streetAddress}
                            streetNumberStart={rowData.streetNumberStart}
                            streetNumberFinish={rowData.streetNumberFinish}
                            streetName={rowData.streetName}
                            streetType={rowData.streetType}
                            onRemoveClick={onRemoveClick}
                        />
                    );
                }
            }
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Street # (Start)</th>
                            <th>Street # (Finish)</th>
                            <th>Street Name</th>
                            <th>Street Type</th>
                            <th>
                            <button type="button" className="btn btn-success float-right" onClick={onAddClick}>
                                <span className="fa fa-plus"></span>
                            </button>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </table>
            </div>
        );
    }
}


class AddModalComponent extends Component {
    render() {
        const {
            streetNumberStart, streetNumberFinish, streetName, streetType, streetDirection, onTextChange, errors,
            showModal, onSaveClick, onCloseClick } = this.props;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                marginRight           : '0%',
                marginLeft            : '0%',
                marginTop             : '50px',
                marginBottom          : '0%',
            }
        };

        return (
            <div>
                <ReactModal
                    style={customStyles}
                    isOpen={showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <h1>
                      Add Location
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

                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.streetType}
                                    label="Street Type (*)"
                                    onChange={onTextChange}
                                    value={streetType}
                                    name="streetType"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-success"
                                    error={errors.streetDirection}
                                    label="Street Direction"
                                    onChange={onTextChange}
                                    value={streetDirection}
                                    name="streetDirection"
                                    type="text"
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
                                    <i className="fas fa-check"></i>&nbsp;Save
                                </button>

                            </form>
                        </div>
                    </div>

                </ReactModal>
            </div>
        );
    }
}
