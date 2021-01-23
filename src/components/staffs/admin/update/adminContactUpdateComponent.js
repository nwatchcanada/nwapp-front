// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapCountrySelect } from '../../../bootstrap/bootstrapCountrySelect'
import { BootstrapProvinceSelect } from '../../../bootstrap/bootstrapRegionSelect'
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
import {
    BUSINESS_TYPE_OF,
    RESIDENCE_TYPE_OF,
    COMPANY_TYPE_OF_CHOICES,
    IS_OK_TO_EMAIL_CHOICES,
    IS_OK_TO_TEXT_CHOICES,
} from "../../../../constants/api";


export default class AdminStaffContactUpdateComponent extends Component {
    render() {
        const {
            // STEP 3
            typeOf,

            // STEP 4
            organizationName, organizationTypeOf, firstName, lastName, primaryPhone, secondaryPhone, email, isOkToText, isOkToEmail,

            // EVERYTHING ELSE
            slug, errors, isLoading, onClick, onTextChange, onRadioChange, onBillingCountryChange, onBillingProvinceChange,
            onMultiChange, onDateOfBirthChange, onSelectChange, onJoinDateChange,
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
                            <Link to={`/admin/staff`}><i className="fas fa-user-check"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/admin/staff/${slug}/full`}><i className="fas fa-user"></i>&nbsp;{firstName} {lastName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update (Contact)
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Edit Staff (Contact)
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-edit"></i>&nbsp;Client Contact Form</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            {typeOf === BUSINESS_TYPE_OF &&
                                <div>
                                    <BootstrapInput
                                        inputClassName="form-control form-control-lg"
                                        borderColour="border-primary"
                                        error={errors.organizationName}
                                        label="Company Name (*)"
                                        onChange={onTextChange}
                                        value={organizationName}
                                        name="organizationName"
                                        type="text"
                                    />
                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="Company Type (*)"
                                        name="organizationTypeOf"
                                        defaultOptionLabel="Please select a telephone type."
                                        options={COMPANY_TYPE_OF_CHOICES}
                                        value={organizationTypeOf}
                                        error={errors.organizationTypeOf}
                                        onSelectChange={onSelectChange}
                                    />
                                </div>
                            }

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.firstName}
                                label="First Name (*)"
                                onChange={onTextChange}
                                value={firstName}
                                name="firstName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.lastName}
                                label="Last Name (*)"
                                onChange={onTextChange}
                                value={lastName}
                                name="lastName"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.primaryPhone}
                                label="Primary Phone (*)"
                                onChange={onTextChange}
                                value={primaryPhone}
                                name="primaryPhone"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.secondaryPhone}
                                label="Secondary Phone"
                                onChange={onTextChange}
                                value={secondaryPhone}
                                name="secondaryPhone"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="text"
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isOkToEmail}
                                label="Ok to E-Mail? (*)"
                                name="isOkToEmail"
                                onChange={onRadioChange}
                                selectedValue={isOkToEmail}
                                options={IS_OK_TO_EMAIL_CHOICES}
                                helpText='Selecting "yes" will result in client getting emails from our system.'
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isOkToText}
                                label="Ok to Text? (*)"
                                name="isOkToText"
                                onChange={onRadioChange}
                                selectedValue={isOkToText}
                                options={IS_OK_TO_TEXT_CHOICES}
                                helpText='Selecting "yes" will result in client getting text-messages on their phone from our system.'
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/admin/staff/${slug}/full`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
