import React, { Component } from 'react';

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { GENDER_RADIO_CHOICES, WILLING_TO_VOLUNTEER_CHOICES, ANOTHER_HOUSEHOLD_MEMBER_REGISTERED_CHOICES } from "../../../constants/api";


export default class MemberBizUpdateFormComponent extends Component {
    render() {
        const { errors, onTextChange, onSelectChange, onRadioChange, onMultiChange, isLoading } = this.props;
        const { contactFirstName, contactLastName, primaryPhone, secondaryPhone, email } = this.props;
        const { companyName, streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions } = this.props;
        const { watch, watchOptions } = this.props;
        const { tags, tagOptions, birthYear, gender, howDidYouHear, howDidYouHearOptions, howDidYouHearOther, meaning, expectations, willingToVolunteer, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount, companyEmployeeCount, companyYearsInOperation, companyType } = this.props;

        const isOtherStreetTypeSelected = streetType === 'Other';
        const isOtherHowDidYouHearSelected = howDidYouHear === 'Other';

        // This code checks to see if we need to display the household count fields.
        let showHouseholdCount = false;
        try {
            showHouseholdCount = parseInt(anotherHouseholdMemberRegistered) === 0;
        } catch (error) {
            // Do nothing.
        }

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
                    disabled={isLoading}
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
                    disabled={isLoading}
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

                <BootstrapRadio
                    inputClassName="form-check-input form-check-input-lg"
                    borderColour="border-primary"
                    error={errors.gender}
                    label="Please select your gender (*)"
                    name="gender"
                    onChange={onRadioChange}
                    selectedValue={gender}
                    options={GENDER_RADIO_CHOICES}
                />

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.birthYear}
                    label="Year of Birth (*)"
                    onChange={onTextChange}
                    value={birthYear}
                    name="birthYear"
                    type="number"
                />

                <BootstrapSingleSelect
                    borderColour="border-primary"
                    label="How did you hear about us? (*)"
                    name="howDidYouHear"
                    defaultOptionLabel="Please select how you heard about us."
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

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.meaning}
                    label="What does NW mean to you (*)"
                    onChange={onTextChange}
                    value={meaning}
                    name="meaning"
                    type="text"
                />

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.expectations}
                    label="What do you expect from NW? (*)"
                    onChange={onTextChange}
                    value={expectations}
                    name="expectations"
                    type="text"
                />

                <BootstrapRadio
                    inputClassName="form-check-input form-check-input-lg"
                    borderColour="border-primary"
                    error={errors.willingToVolunteer}
                    label="Are you willing to volunteer as a area coordinator / associate ? (*)"
                    name="willingToVolunteer"
                    onChange={onRadioChange}
                    selectedValue={willingToVolunteer}
                    options={WILLING_TO_VOLUNTEER_CHOICES}
                />

                <BootstrapRadio
                    inputClassName="form-check-input form-check-input-lg"
                    borderColour="border-primary"
                    error={errors.anotherHouseholdMemberRegistered}
                    label="Is there another member of your household which is registered with us? (*)"
                    name="anotherHouseholdMemberRegistered"
                    onChange={onRadioChange}
                    selectedValue={anotherHouseholdMemberRegistered}
                    options={ANOTHER_HOUSEHOLD_MEMBER_REGISTERED_CHOICES}
                />

                {showHouseholdCount &&
                    <div>
                        <BootstrapInput
                            inputClassName="form-control form-control-lg"
                            borderColour="border-primary"
                            error={errors.totalHouseholdCount}
                            label="How many people are in your household? (*)"
                            onChange={onTextChange}
                            value={totalHouseholdCount}
                            name="totalHouseholdCount"
                            type="number"
                        />
                        <BootstrapInput
                            inputClassName="form-control form-control-lg"
                            borderColour="border-primary"
                            error={errors.under18YearsHouseholdCount}
                            label="How many people in your household are under the age of 18? (*)"
                            onChange={onTextChange}
                            value={under18YearsHouseholdCount}
                            name="under18YearsHouseholdCount"
                            type="number"
                        />
                    </div>
                }

                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.companyEmployeeCount}
                    label="How many employees does your business have (*)"
                    onChange={onTextChange}
                    value={companyEmployeeCount}
                    name="companyEmployeeCount"
                    type="number"
                />
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.companyYearsInOperation}
                    label="How many years has your company been in operation (*)"
                    onChange={onTextChange}
                    value={companyYearsInOperation}
                    name="companyYearsInOperation"
                    type="number"
                />
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.companyType}
                    label="What type of business is this? (*)"
                    onChange={onTextChange}
                    value={companyType}
                    name="companyType"
                    type="text"
                />

            </div>
        );
    };
}
