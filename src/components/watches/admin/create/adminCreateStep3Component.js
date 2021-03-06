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


export default class AdminWatchCreateStep3Component extends Component {
    render() {
        const {
            errors,
            isLoading,
            onClick,
            onTextChange,
            onSelectChange,
            onMultiChange,
            streetMembership,
            isVirtual,

            // Modal related.
            streetNumberStart,
            streetNumberEnd,
            streetNumberRangeType,
            streetNumberRangeTypeOptions,
            streetName,
            streetType,
            streetTypeOptions,
            streetTypeOther,
            streetDirection,
            streetDirectionOptions,
            showModal,
            onAddClick,
            onRemoveClick,
            onSaveClick,
            onCloseClick
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
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/watches/step-2-create">
                                <span className="num">2.</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Street Membership</span>
                            </strong>
                        </div>
                    </div>
                </div>

                {isVirtual
                    ? <div className="row pt-3 mb-4 pb-2">
                        <div className="col-md-5 mx-auto p-2">

                            <div className="jumbotron">
                                <h1 className="display-4">
                                    <i className="fas fa-vr-cardboard"></i>&nbsp;Virtual Watch
                                </h1>
                                <p className="lead">Please note that because you have selected the <strong>virtual watch</strong> checkbox then the street membership section is not necessary.</p>
                                <hr />
                                <p>Please click <strong>next</strong> to proceed or <strong>back</strong> to unselect the option.</p>
                                {/*<p>
                                <Link to={`/admin/watches/step-3-create`} className="btn btn-orange btn-lg  float-left">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                                &nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onClick}>
                                        <i className="fas fa-check-circle"></i>&nbsp;Save
                                    </button>
                                </p>*/}
                            </div>

                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>
                            <Link to="/admin/watches/step-2-create" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>

                        </div>
                    </div>
                    : <div className="col-md-5 mx-auto mt-2">
                        <h3 className="pt-4 pb-2 text-center"><i className="fas fa-road"></i>&nbsp;Street Membership</h3>
                        <form id="residential-form" method="post" className="needs-validation" action="" noValidate>
                            <div className="form-group">

                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                                <BootstrapErrorsProcessingAlert errors={errors} />

                                <AddModalComponent
                                    streetNumberStart={streetNumberStart}
                                    streetNumberEnd={streetNumberEnd}
                                    streetNumberRangeType={streetNumberRangeType}
                                    streetNumberRangeTypeOptions={streetNumberRangeTypeOptions}
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
                                <Link to="/admin/watches/step-2-create" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                }
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
            streetTypeLabel,
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
                <td>
                    {streetTypeLabel}
                </td>
                <td>
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
                    // console.log(rowData);
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
            streetNumberStart,
            streetNumberEnd,
            streetNumberRangeType,
            streetNumberRangeTypeOptions,
            streetName,
            streetType,
            streetTypeOptions,
            streetTypeOther,
            streetDirection,
            streetDirectionOptions,
            onTextChange,
            errors,
            showModal, onSaveClick, onCloseClick, onSelectChange
        } = this.props;

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

                                <BootstrapSingleSelect
                                    borderColour="border-primary"
                                    label="Street Number Range Type (*)"
                                    name="streetType"
                                    defaultOptionLabel="Please select a street type."
                                    options={streetNumberRangeTypeOptions}
                                    value={streetNumberRangeType}
                                    error={errors.streetNumberRangeType}
                                    onSelectChange={onSelectChange}
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

                                {streetType == 1 &&
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
