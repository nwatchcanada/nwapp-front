// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


export default class WatchUpdateRezComponent extends Component {
    render() {
        const {
            // Page related.
            slug, name, associate, associateOptions, district, districtOptions,
            primaryAreaCoordinator, primaryAreaCoordinatorOptions, secondaryAreaCoordinator, secondaryAreaCoordinatorOptions, streetMembership,
            errors, isLoading, onClick, onTextChange, onSelectChange,

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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/watch-rez/${slug}`}><i className="fas fa-home"></i>&nbsp;{name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Update
                </h1>

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
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                            <Link to={`/watch-rez/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Street # (Start)</th>
                            <th>Street # (Finish)</th>
                            <th>Street Name</th>
                            <th>Street Type</th>
                            <th>Direction</th>
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
            streetNumberStart, streetNumberFinish, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, onTextChange, onSelectChange, errors,
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

        const isOtherStreetTypeSelected = streetType === 'Other';

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
