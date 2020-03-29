import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapCountrySelect } from '../../../bootstrap/bootstrapCountrySelect';
import { BootstrapProvinceSelect } from '../../../bootstrap/bootstrapRegionSelect';
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";


class SharedOrganizationCreateStep2Component extends Component {
    render() {
        const {
            schema, name, alternateName, description, country, province, city,
            timezone, timezoneOptions, streetNumber, streetName, apartmentUnit,
            streetType, streetTypeLabel, streetTypeOptions, streetTypeOther,
            streetDirection, streetDirectionLabel, streetDirectionOptions,
            postalCode, latitude, longitude, zoom,
            errors={}, isLoading, onTextChange, onSelectChange, onCountryChange,
            onProvinceChange, onClick, onBackClick
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
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

                            <div className="row">
                                <div className="step-navigation">
                                    <div id="step-1" className="st-grey">
                                        <Link to="/organization/add/step-1">
                                            <span className="num">1.</span><span className="">Step 1</span>
                                        </Link>
                                    </div>
                                    <div id="step-2" className="st-grey active">
                                        <strong>
                                            <span className="num">2.</span><span className="">Review</span>
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-table"></i>&nbsp;Details
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Schema</th>
                                        <td>{schema}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>{name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Alternate Name</th>
                                        <td>{alternateName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Description</th>
                                        <td>{description}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Country</th>
                                        <td>{country}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Province</th>
                                        <td>{province}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">City</th>
                                        <td>{city}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Street #</th>
                                        <td>{streetNumber}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Street Name</th>
                                        <td>{streetName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Apartment Unit</th>
                                        <td>{apartmentUnit}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Street Type</th>
                                        <td>{streetTypeLabel}</td>
                                    </tr>
                                    {streetTypeOther &&
                                        <tr>
                                            <th scope="row" className="bg-light">Street Type (Other)</th>
                                            <td>{streetTypeOther}</td>
                                        </tr>
                                    }
                                    {streetDirectionLabel &&
                                        <tr>
                                            <th scope="row" className="bg-light">Street Direction</th>
                                            <td>{streetDirectionLabel}</td>
                                        </tr>
                                    }
                                    <tr>
                                        <th scope="row" className="bg-light">Postal Code</th>
                                        <td>{postalCode}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Longitude</th>
                                        <td>{longitude}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Latitude</th>
                                        <td>{latitude}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Zoom</th>
                                        <td>{zoom}</td>
                                    </tr>
                                </tbody>
                            </table>


                            <div className="form-group">
                                <button type="button" className="btn btn-lg float-left pl-4 pr-4 btn-orange" onClick={onBackClick}>
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

export default SharedOrganizationCreateStep2Component;
