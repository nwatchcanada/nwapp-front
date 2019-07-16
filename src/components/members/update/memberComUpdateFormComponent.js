import React, { Component } from 'react';

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapDatePicker } from "../../bootstrap/bootstrapDatePicker";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";


export default class MemberComUpdateFormComponent extends Component {
    render() {
        const { errors, onTextChange, onSelectChange, onDOBDateTimeChange, isLoading } = this.props;
        const { firstName, lastName, primaryPhone, secondaryPhone, email } = this.props;
        const { streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions } = this.props;
        const { watch, watchOptions } = this.props;
        const { dateOfBirth, howDidYouHear, howDidYouHearOptions, howDidYouHearOther } = this.props;

        const isOtherStreetTypeSelected = streetType === 'Other';
        const isOtherHowDidYouHearSelected = howDidYouHear === 'Other';

        return (
            <div>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                />

                <h4><i className="fas fa-tty"></i>&nbsp;Contact Information</h4>

                <BootstrapTelephoneInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.primaryPhone}
                    label="Primary Phone (*)"
                    onChange={onTextChange}
                    value={primaryPhone}
                    name="primaryPhone"
                    type="text"
                    placeholder="+1 (xxx) xxx-xxxx"
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
                    placeholder="+1 (xxx) xxx-xxxx"
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                        disabled={isLoading}
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
                    disabled={isLoading}
                    helpText="Please pick direction if address has legally designated direction, ex.: `123 Centre Street South`."
                />

                <h4><i className="fas fa-shield-alt"></i>&nbsp;Watch</h4>

                <BootstrapSingleSelect
                    borderColour="border-primary"
                    label="Watch (*)"
                    name="watch"
                    defaultOptionLabel="Please select a watch."
                    options={watchOptions}
                    value={watch}
                    error={errors.watch}
                    onSelectChange={onSelectChange}
                    disabled={isLoading}
                />

                <h4><i className="fas fa-chart-pie"></i>&nbsp;Metrics</h4>

                <BootstrapDatePicker
                    label="Date of Birth (*)"
                    name="dateOfBirth"
                    dateObj={dateOfBirth}
                    onTimeChange={onDOBDateTimeChange}
                    datePickerClassName="form-control form-control-lg border"
                    divClassName="form-group p-0 col-md-7 mb-4"
                    error={errors.dateOfBirth}
                    disabled={isLoading}
                />

                <BootstrapSingleSelect
                    borderColour="border-primary"
                    label="How did you hear about us? (*)"
                    name="howDidYouHear"
                    defaultOptionLabel="Please select a street type."
                    options={howDidYouHearOptions}
                    value={howDidYouHear}
                    error={errors.howDidYouHear}
                    onSelectChange={onSelectChange}
                    disabled={isLoading}
                />

                {isOtherHowDidYouHearSelected &&
                    <BootstrapInput
                        inputClassName="form-control form-control-lg"
                        borderColour="border-primary"
                        error={errors.howDidYouHearOther}
                        label="Other (*)"
                        onChange={onTextChange}
                        value={howDidYouHearOther}
                        name="howDidYouHearOther"
                        type="text"
                        disabled={isLoading}
                    />
                }
            </div>
        );
    };
}
