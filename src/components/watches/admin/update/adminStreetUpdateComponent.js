// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";


export default class AdminWatchStreetUpdateComponent extends Component {
    render() {
        const {
            watchDetail, slug, errors, isLoading, onClick, onTextChange, onSelectChange, onMultiChange, streetMembership,

            // Modal related.
            streetNumberStart, streetNumberEnd, streetName,
            streetType, streetTypeOptions, streetTypeOther,
            streetDirection, streetDirectionOptions,
            showModal, onAddClick, onRemoveClick, onSaveClick, onCloseClick
        } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watches`}><i className="fas fa-shield-alt"></i>&nbsp;Watches</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/watch/${slug}`}><i className="fas fa-user"></i>&nbsp;{watchDetail && watchDetail.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update Watch
                        </li>
                    </ol>
                </nav>

                <h1>Update Watch - Details</h1>

                <div className="col-md-5 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center"><i className="fas fa-road"></i>&nbsp;Street Membership</h3>
                    <form id="residential-form" method="post" className="needs-validation" action="" noValidate>
                        <div className="form-group">

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <AddModalComponent
                                streetNumberStart={streetNumberStart}
                                streetNumberEnd={streetNumberEnd}
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
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>
                            <Link to={`/admin/watch/${slug}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
        const {
            streetAddress,
            streetNumberStart,
            streetNumberEnd,
            streetName,
            streetType,
            streetTypeLabel,
            streetDirection,
            streetDirectionLabel,
            onRemoveClick
        } = this.props;
        return (
            <tr key={streetAddress}>
                <td>
                    {streetNumberStart}
                </td>
                <td>
                    {streetNumberEnd}
                </td>
                <td>
                    {streetName}
                </td>
                <td id={`street-type-${streetType}`}>
                    {streetTypeLabel}
                </td>
                <td id={`street-direction-${streetDirection}`}>
                    {streetDirectionLabel}
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
                            streetNumberEnd={rowData.streetNumberEnd}
                            streetName={rowData.streetName}
                            streetType={rowData.streetType}
                            streetTypeLabel={rowData.streetTypeLabel}
                            streetDirection={rowData.streetDirection}
                            streetDirectionLabel={rowData.streetDirectionLabel}
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
                                <th>Street # (End)</th>
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
            streetNumberStart, streetNumberEnd, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, onTextChange, errors,
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
                                    type="number"
                                />

                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.streetNumberEnd}
                                    label="Street Number End (*)"
                                    onChange={onTextChange}
                                    value={streetNumberEnd}
                                    name="streetNumberEnd"
                                    type="number"
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
