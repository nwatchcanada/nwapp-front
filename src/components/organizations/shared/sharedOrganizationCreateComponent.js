import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'

class SharedOrganizationCreateComponent extends Component {
    render() {
        const {
            schema, name, description, country, region, errors={}, isLoading, onTextChange, onCountryChange, onRegionChange, locality, onClick, onCancelClick
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/organizations"><i className="fas fa-building"></i>&nbsp;Organizations</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-plus"></i>&nbsp;Add Organization</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Join and grow with us</h1>
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
                                helpText="This is the subdomain associated with the tenant. Value must be uniue and cannot be changed afterwords!"
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



                            <div className="form-group">
                                <button type="button" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onCancelClick}>
                                    <i className="fas fa-times"></i>&nbsp;Cancel
                                </button>
                                <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onClick} disabled={isLoading}>
                                    <i className="fas fa-check"></i>&nbsp;Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default SharedOrganizationCreateComponent;
