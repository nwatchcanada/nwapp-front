import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../../../bootstrap/bootstrapTextarea";
import { BootstrapInput } from "../../../../bootstrap/bootstrapInput";
import { BootstrapCountrySelect } from '../../../../bootstrap/bootstrapCountrySelect';
import { BootstrapProvinceSelect } from '../../../../bootstrap/bootstrapRegionSelect';
import { BootstrapSingleSelect } from "../../../../bootstrap/bootstrapSingleSelect";


class AdminContactInfoSettingUpdateComponent extends Component {
    render() {
        const {
            email, phone, websiteUrl, facebookUrl, twitterUrl, instagramUrl,
            youtubeUrl, errors={}, isLoading, onTextChange, onSelectChange,
            onCountryChange, onProvinceChange, onClick, onBackClick
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/admin/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/settings/contact-info"><i className="fas fa-phone-square"></i>&nbsp;Contact Information</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-edit"></i>&nbsp;Edit Contact Information</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="E-Mail (*)"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="text"
                                helpText=""
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.phone}
                                label="Phone (*)"
                                onChange={onTextChange}
                                value={phone}
                                name="phone"
                                type="text"
                                helpText=""
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.websiteUrl}
                                label="Website (*)"
                                onChange={onTextChange}
                                value={websiteUrl}
                                name="websiteUrl"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.facebookUrl}
                                label="Facebook Page URL"
                                onChange={onTextChange}
                                value={facebookUrl}
                                name="facebookUrl"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.twitterUrl}
                                label="Twitter URL"
                                onChange={onTextChange}
                                value={twitterUrl}
                                name="twitterUrl"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.instagramUrl}
                                label="Instagram URL"
                                onChange={onTextChange}
                                value={instagramUrl}
                                name="instagramUrl"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.youtubeUrl}
                                label="YouTube URL"
                                onChange={onTextChange}
                                value={youtubeUrl}
                                name="youtubeUrl"
                                type="text"
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

export default AdminContactInfoSettingUpdateComponent;
