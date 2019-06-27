import React, { Component } from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapDatePicker } from "../../bootstrap/bootstrapDatePicker";


export default class MemberBizUpdateFormComponent extends Component {
    render() {
        const { errors, onTextChange, onSelectChange, onDOBDateTimeChange, isLoading, onClick } = this.props;
        const { contactFirstName, contactLastName, primaryPhone, secondaryPhone, email } = this.props;
        const { companyName, streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions } = this.props;
        const { dateOfBirth, howDidYouHear, howDidYouHearOptions, howDidYouHearOther } = this.props;

        const isOtherStreetTypeSelected = streetType === 'Other';
        const isOtherHowDidYouHearSelected = howDidYouHear === 'Other';

        return (
            <div>
                <h4><i className="fas fa-id-card"></i>&nbsp;Personal Information</h4>

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.companyName}
                    label="Compan Name (*)"
                    onChange={onTextChange}
                    value={companyName}
                    name="companyName"
                    type="text"
                />

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.contactFirstName}
                    label="Contact First Name (*)"
                    onChange={onTextChange}
                    value={contactFirstName}
                    name="contactFirstName"
                    type="text"
                />

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.contactLastName}
                    label="Contact Last Name (*)"
                    onChange={onTextChange}
                    value={contactLastName}
                    name="contactLastName"
                    type="text"
                />

                <h4><i className="fas fa-tty"></i>&nbsp;Contact Information</h4>

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.primaryPhone}
                    label="Primary Phone (*)"
                    onChange={onTextChange}
                    value={primaryPhone}
                    name="primaryPhone"
                    type="text"
                />

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-success"
                    error={errors.secondaryPhone}
                    label="Secondary Phone (*)"
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
                    />
                }
            </div>
        );
    };
}
