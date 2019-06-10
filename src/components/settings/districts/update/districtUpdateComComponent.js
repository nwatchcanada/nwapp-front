// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";


class AddModalComponent extends Component {
    render() {
        const {
            streetNumber, streetName, streetType, onTextChange, errors,
            isShowingModal, onSaveClick, onCloseClick } = this.props;

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
                    isOpen={isShowingModal}
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
                                    error={errors.streetNumber}
                                    label="Street Number (*)"
                                    onChange={onTextChange}
                                    value={streetNumber}
                                    name="streetNumber"
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


class DistrictUpdateComComponent extends Component {
    render() {
        const {
            slug, name, description, streetNumber, streetName, streetType, errors, onTextChange, isLoading, onClick,
            streetsArray, isShowingModal, onAddClick, onSaveClick, onCloseClick, onRemoveClick
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/districts"><i className="fas fa-map"></i>&nbsp;Districts</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/settings/district-cc/${slug}`}>
                                <i className="fas fa-university"></i>&nbsp;{name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Update District</h1>
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
                                placeholder="Please set the district description"
                                rows="5"
                                value={description}
                                helpText="This is the description of the business district."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <AddModalComponent
                                streetNumber={streetNumber}
                                streetName={streetName}
                                streetType={streetType}
                                onTextChange={onTextChange}
                                errors={errors}
                                isShowingModal={isShowingModal}
                                onSaveClick={onSaveClick}
                                onCloseClick={onCloseClick}
                            />

                            <StreetsTable
                               streetsArray={streetsArray}
                               onAddClick={onAddClick}
                               onRemoveClick={onRemoveClick}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check"></i>&nbsp;Save
                                </button>
                                <Link to="/settings/district/step-1-create" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default DistrictUpdateComComponent;


class StreetTableRow extends Component {
    render() {
        const { streetAddress, streetNumber, streetName, streetType, onRemoveClick } = this.props;
        return (
            <tr key={streetAddress}>
                <td>
                    {streetNumber}
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


class StreetsTable extends Component {
    render() {
        const { streetsArray, onAddClick, onRemoveClick } = this.props;

        let elements = [];
        if (streetsArray !== undefined && streetsArray !== null) {
            for (let i = 0; i < streetsArray.length; i++) {
                let rowData = streetsArray[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <StreetTableRow
                            key={rowData.streetAddress}
                            streetAddress={rowData.streetAddress}
                            streetNumber={rowData.streetNumber}
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
                    <th>Street #</th>
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