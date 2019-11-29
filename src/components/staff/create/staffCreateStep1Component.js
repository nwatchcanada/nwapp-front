// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { GENDER_CHOICES, TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES } from "../../../constants/api";


export default class StaffCreateStep1Component extends Component {
    render() {
        const {
            firstName, lastName, dateOfBirth, gender, description, howHear, tags, tagOptions, howHearOptions, phone, mobile, workEmail, personalEmail,
            streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, apartmentUnit, streetDirection, streetDirectionOptions, postalCode, locality, country, region, emergencyFullName,
            emergencyRelationship, emergencyTelephone, emergencyAlternativeTelephone, additionalComments, accountType, policeCheckDate, isActive, isActiveOptions,
            password, repeatPassword,
            errors, isLoading,
            onTextChange, onClick, onDateOfBirthChange, onPoliceCheckDateChange, onSelectChange, onMultiChange, onCountryChange, onRegionChange, onRadioChange
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
                            <Link to="/staff"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
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
                            <strong>
                                <span className="num">1.</span><span className="">Type</span>
                            </strong>
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

                            <h4><i className="fas fa-id-card"></i>&nbsp;Personal Information</h4>

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

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onMultiChange}
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

                            <h4><i className="fas fa-tty"></i>&nbsp;Contact Information</h4>

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.phone}
                                label="Phone (*)"
                                onChange={onTextChange}
                                value={phone}
                                name="phone"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.mobile}
                                label="Mobile (*)"
                                onChange={onTextChange}
                                value={mobile}
                                name="mobile"
                                type="text"
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

                            <h4><i className="fas fa-map-marker"></i>&nbsp;Street Address</h4>

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
                                placeholder=""
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

                            <h4><i className="fas fa-clinic-medical"></i>&nbsp;Emergency Contact</h4>

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

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyTelephone}
                                label="Emergency Telephone"
                                onChange={onTextChange}
                                value={emergencyTelephone}
                                name="emergencyTelephone"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyAlternativeTelephone}
                                label="Emergency Alternative Telephone"
                                onChange={onTextChange}
                                value={emergencyAlternativeTelephone}
                                name="emergencyAlternativeTelephone"
                                type="text"
                            />

                            <h4><i className="fas fa-user-shield"></i>&nbsp;Policy</h4>

                            <BootstrapDatePicker
                                label="Police Check Date (*)"
                                name="policeCheckDate"
                                dateObj={policeCheckDate}
                                onTimeChange={onPoliceCheckDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.policeCheckDate}
                            />

                            <h4><i className="fas fa-user-circle"></i>&nbsp;Account</h4>

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

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isActive}
                                label="Is the user account active? (*)"
                                name="isActive"
                                onChange={onRadioChange}
                                selectedValue={isActive}
                                options={isActiveOptions}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/staff" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
