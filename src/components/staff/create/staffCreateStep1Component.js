// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'
import { GENDER_CHOICES, TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES } from "../../../constants/api";


export default class StaffCreateStep1Component extends Component {
    render() {
        const {
            firstName, lastName, dateOfBirth, gender, description, howHear, howHearOptions, phone, mobile, workEmail, personalEmail,
            streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, locality, country, region, postal, emergencyFullName,
            emergencyRelationship, emergencyTelephone, emergencyAlternativeTelephone, additionalComments, accountType, isActive,
            password, repeatPassword,
            errors, isLoading,
            onTextChange, onClick, onDateOfBirthChange, onSelectChange, onCountryChange, onRegionChange, onCheckboxChange,
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
                            <Link to="/staff/active"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Create New Staff</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num">1.</span><span className="">Type</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Contact</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2><i className="fas fa-user-tie"></i>&nbsp;Staff Form</h2>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <h4>Personal Information</h4>

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

                            <BootstrapDatePicker
                                label="Date of Birth (*)"
                                name="dateOfBirth"
                                dateObj={dateOfBirth}
                                onTimeChange={onDateOfBirthChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.dateOfBirth}
                            />

                            <BootstrapSingleSelect
                                label="Gender (*)"
                                name="gender"
                                defaultOptionLabel="Please select the gender."
                                options={GENDER_CHOICES}
                                value={gender}
                                error={errors.gender}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-success"
                                label="Describe the staff:"
                                placeholder="Description here..."
                                rows="5"
                                value={description}
                                helpText=""
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapSingleSelect
                                label="How did you hear about us? (*)"
                                name="howHear"
                                defaultOptionLabel="Please select how you hear about us."
                                options={howHearOptions}
                                value={howHear}
                                error={errors.howHear}
                                onSelectChange={onSelectChange}
                            />

                            <h4>Contact Information</h4>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.phone}
                                label="Phone (*)"
                                onChange={onTextChange}
                                value={phone}
                                name="phone"
                                type="text"
                                placeholder="(xxx) xxx-xxxx"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.mobile}
                                label="Mobile"
                                onChange={onTextChange}
                                value={mobile}
                                name="mobile"
                                type="text"
                                placeholder="(xxx) xxx-xxxx"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.workEmail}
                                label="Work Email (*)"
                                onChange={onTextChange}
                                value={workEmail}
                                name="workEmail"
                                type="text"
                                placeholder="Email Address"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.personalEmail}
                                label="Personal Email (*)"
                                onChange={onTextChange}
                                value={personalEmail}
                                name="personalEmail"
                                type="text"
                                placeholder="Email Address"
                            />

                            <h4>Street Address</h4>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.streetNumber}
                                label="Street Number (*)"
                                onChange={onTextChange}
                                value={streetNumber}
                                name="streetNumber"
                                type="text"
                                placeholder=""
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.streetName}
                                label="Street Number (*)"
                                onChange={onTextChange}
                                value={streetName}
                                name="streetName"
                                type="text"
                                placeholder=""
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

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.locality}
                                label="Locality (*)"
                                onChange={onTextChange}
                                value={locality}
                                name="locality"
                                type="text"
                                placeholder=""
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
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.postal}
                                label="Postal (*)"
                                onChange={onTextChange}
                                value={postal}
                                name="postal"
                                type="text"
                                placeholder=""
                            />

                            <h4>Emergency Contact</h4>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyFullName}
                                label="Emergency Full Name"
                                onChange={onTextChange}
                                value={emergencyFullName}
                                name="emergencyFullName"
                                type="text"
                                placeholder=""
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyRelationship}
                                label="Emergency Relationship"
                                onChange={onTextChange}
                                value={emergencyRelationship}
                                name="emergencyRelationship"
                                type="text"
                                placeholder=""
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyTelephone}
                                label="Emergency Telephone"
                                onChange={onTextChange}
                                value={emergencyTelephone}
                                name="emergencyTelephone"
                                type="text"
                                placeholder=""
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyAlternativeTelephone}
                                label="Emergency Alternative Telephone"
                                onChange={onTextChange}
                                value={emergencyAlternativeTelephone}
                                name="emergencyAlternativeTelephone"
                                type="text"
                                placeholder=""
                            />

                            <h4>Account</h4>

                            <BootstrapTextarea
                                name="additionalComments"
                                borderColour="border-success"
                                label="Additional Comment(s)"
                                placeholder="Please add any additional comments"
                                rows="5"
                                value={additionalComments}
                                helpText=""
                                onChange={onTextChange}
                                error={errors.additionalComments}
                            />

                            <BootstrapSingleSelect
                                label="Account Type (*)"
                                name="accountType"
                                defaultOptionLabel="Please select the account type."
                                options={TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES}
                                value={accountType}
                                error={errors.accountType}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.password}
                                label="Password"
                                onChange={onTextChange}
                                value={password}
                                name="password"
                                type="password"
                                placeholder=""
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.repeatPassword}
                                label="Repeat Password"
                                onChange={onTextChange}
                                value={repeatPassword}
                                name="repeatPassword"
                                type="repeatPassword"
                                placeholder=""
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isActive}
                                label="I agree to the terms of service (*)"
                                onChange={onCheckboxChange}
                                checked={isActive}
                                name="isActive"
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check"></i>&nbsp;Submit
                                </button>
                                <Link to="/staff/active" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
