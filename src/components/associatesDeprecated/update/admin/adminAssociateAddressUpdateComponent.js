// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";


class AdminAssociateAddressUpdateComponent extends Component {
    render() {
        const {
            streetNumber, streetName, apartmentUnit, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, postalCode,
            returnURL, errors, onTextChange, onSelectChange, isLoading, onClick, slug, fullName
        } = this.props;

        const isOtherStreetTypeSelected = streetType === 'Other';

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/associates`}><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/associate/${slug}/full`}><i className="fas fa-user"></i>&nbsp;{fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Edit Associate (Address)
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Edit Associate (Contact)
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-address-book"></i>&nbsp;Address
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.apartmentUnit}
                                label="Apt. Unit"
                                onChange={onTextChange}
                                value={apartmentUnit}
                                name="apartmentUnit"
                                type="text"
                            />

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
                                helpText="Please pick direction if address has legally designated direction, ex.: `123 Centre Street South`."
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.postalCode}
                                label="Postal Code (*)"
                                onChange={onTextChange}
                                value={postalCode}
                                name="postalCode"
                                type="text"
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Save&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to={`/associate/${slug}/full`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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

export default AdminAssociateAddressUpdateComponent;