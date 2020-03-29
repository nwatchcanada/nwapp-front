import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapCountrySelect } from '../../../bootstrap/bootstrapCountrySelect';
import { BootstrapProvinceSelect } from '../../../bootstrap/bootstrapRegionSelect';
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";


class SharedOrganizationUpdateComponent extends Component {
    render() {
        const {
            schema, name, alternateName, description, country, province, city,
            timezone, timezoneOptions, streetNumber, streetName, apartmentUnit,
            streetType, streetTypeOptions, streetTypeOther, streetDirection,
            streetDirectionOptions, postalCode, errors={}, isLoading,
            defaultPosition, zoom, longitude, latitude,
            onTextChange, onSelectChange, onCountryChange, onProvinceChange, onClick, onBackClick
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/organizations"><i className="fas fa-building"></i>&nbsp;Organizations</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-edit"></i>&nbsp;Update</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-edit"></i>&nbsp;Edit Organization</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.schema}
                                label="Schema (*)"
                                onChange={onTextChange}
                                value={schema}
                                name="schema"
                                type="text"
                                helpText="This is the subdomain clientd with the tenant. Value must be uniue and cannot be changed afterwords!"
                                disabled={true}
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
                                helpText="Please specify the full legal name as found on documents"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.alternateName}
                                label="Alternate Name (*)"
                                onChange={onTextChange}
                                value={alternateName}
                                name="alternateName"
                                type="text"
                                helpText="Please specify the alternate name"
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description"
                                placeholder="Please set the organization description"
                                rows="5"
                                value={description}
                                helpText="This is the description of the organization."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapCountrySelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.country}
                                label="Country (*)"
                                value={country}
                                onChange={onCountryChange}
                                priorityOptions={["CA", "US", "MX"]}
                                name="country"
                            />
                            <BootstrapProvinceSelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.province}
                                label="Province / state (*)"
                                country={country}
                                value={province}
                                onChange={onProvinceChange}
                                name="province"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.city}
                                label="City (*)"
                                onChange={onTextChange}
                                value={city}
                                name="city"
                                type="text"
                            />

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

                            {streetType === 1 &&
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

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.longitude}
                                label="Longitude (*)"
                                onChange={onTextChange}
                                value={longitude}
                                name="longitude"
                                type="text"
                                helpText="The longitude coordinate to be used to centre the map."
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.latitude}
                                label="Latitude (*)"
                                onChange={onTextChange}
                                value={latitude}
                                name="latitude"
                                type="text"
                                helpText="The latitude coordinate to be used to centre the map."
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.zoom}
                                label="Zoom (*)"
                                onChange={onTextChange}
                                value={zoom}
                                name="zoom"
                                type="integer"
                                helpText="The zoom number to be used to centre the map."
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Timezone (*)"
                                name="timezone"
                                defaultOptionLabel="Please select a timezone."
                                options={timezoneOptions}
                                value={timezone}
                                error={errors.timezone}
                                onSelectChange={onSelectChange}
                                helpText="If organization's timezone is different then please specify here."
                            />

                            <div className="form-group">
                                <button type="button" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </button>
                                <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onClick} disabled={isLoading}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default SharedOrganizationUpdateComponent;
