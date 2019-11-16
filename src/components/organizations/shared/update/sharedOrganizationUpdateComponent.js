import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapCountrySelect } from '../../../bootstrap/bootstrapCountrySelect';
import { BootstrapRegionSelect } from '../../../bootstrap/bootstrapRegionSelect';
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";


class SharedOrganizationUpdateComponent extends Component {
    render() {
        const {
            schemaName, name, alternateName, description, country, region, locality, streetAddress, postalCode, timezone, timezoneOptions,
            errors={}, isLoading, onTextChange, onSelectChange, onCountryChange, onRegionChange, onClick, onCancelClick
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/organizations"><i className="fas fa-building"></i>&nbsp;Organizations</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-edit"></i>&nbsp;Edit Organization</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-edit"></i>&nbsp;Edit Organization</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Update Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.schemaName}
                                label="Schema (*)"
                                onChange={onTextChange}
                                value={schemaName}
                                name="schemaName"
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
                            <BootstrapRegionSelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.region}
                                label="Province / state (*)"
                                country={country}
                                value={region}
                                onChange={onRegionChange}
                                name="region"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.locality}
                                label="Locality (*)"
                                onChange={onTextChange}
                                value={locality}
                                name="locality"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.streetAddress}
                                label="Street Address (*)"
                                onChange={onTextChange}
                                value={streetAddress}
                                name="streetAddress"
                                type="text"
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

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Timezone (*)"
                                name="timezone"
                                defaultOptionLabel="Please select a timezone."
                                options={timezoneOptions}
                                value={timezone}
                                error={errors.timezone}
                                onSelectChange={onSelectChange}
                            />

                            <div className="form-group">
                                <button type="button" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onCancelClick}>
                                    <i className="fas fa-times"></i>&nbsp;Cancel
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
