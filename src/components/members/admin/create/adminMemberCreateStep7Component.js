// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BUSINESS_TYPE_OF, ORGANIZATION_TYPE_OF_CHOICES, GENDER_RADIO_CHOICES, WILLING_TO_VOLUNTEER_CHOICES, ANOTHER_HOUSEHOLD_MEMBER_REGISTERED_CHOICES } from "../../../../constants/api";


export default class AdminMemberCreateStep7Component extends Component {
    render() {
        const {
            typeOf, isTagsLoading, tags, tagOptions, yearOfBirth, gender, isHowHearLoading, howDidYouHear, howDidYouHearOptions, howDidYouHearOther,
            isMeaningLoading, meaning, meaningOptions, meaningOther, isExpectationLoading, expectation, expectationOptions, expectationOther, willingToVolunteer, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount,
            organizationEmployeeCount, organizationFoundingYear, organizationTypeOf,
            onRadioChange,  onMultiChange,
            errors, onTextChange, onSelectChange, isLoading, onClick
        } = this.props;
        const isOtherHowDidYouHearSelected = howDidYouHear === 'Other' || howDidYouHear === '1' || howDidYouHear === 1;
        const isOtherMeaningSelected = meaning === 'Other' || meaning === '1' || meaning === 1;
        const isOtherExpectationSelected = expectation === 'Other' || expectation === '1' || expectation === 1;

        // This code checks to see if we need to display the household count fields.
        let showHouseholdCount = false;
        try {
            showHouseholdCount = parseInt(anotherHouseholdMemberRegistered) === 0;
        } catch (error) {
            // Do nothing.
        }

        const isBizTypeOf = typeOf === BUSINESS_TYPE_OF || typeOf === toString(BUSINESS_TYPE_OF);

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/admin/members"><i className="fas fa-users"></i>&nbsp;Members</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Member
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/admin/members/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/admin/members/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/admin/members/add/step-3">
                                <span className="num">3.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/admin/members/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/admin/members/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to="/admin/members/add/step-6">
                                <span className="num">6.</span><span className="">Watch</span>
                            </Link>
                        </div>
                         <div id="step-7" className="st-grey active">
                            <strong>
                                <span className="num">7.</span><span className="">Metrics</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-shield"></i>&nbsp;Personal Information
                            </p>

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onMultiChange}
                                isLoading={isTagsLoading}
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
                                error={errors.yearOfBirth}
                                label="Year of Birth (*)"
                                onChange={onTextChange}
                                value={yearOfBirth}
                                name="yearOfBirth"
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
                                isLoading={isHowHearLoading}
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

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="What does NW mean to you (*)"
                                name="meaning"
                                defaultOptionLabel="Please select how you heard about us."
                                options={meaningOptions}
                                value={meaning}
                                error={errors.meaning}
                                onSelectChange={onSelectChange}
                                isLoading={isMeaningLoading}
                            />

                            {isOtherMeaningSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.meaningOther}
                                    label="Please select how you heard about us - Other (*)"
                                    onChange={onTextChange}
                                    value={meaningOther}
                                    name="meaningOther"
                                    type="text"
                                />
                            }

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="What do you expect from NW? (*)"
                                name="expectation"
                                defaultOptionLabel="Please select how you heard about us."
                                options={expectationOptions}
                                value={expectation}
                                error={errors.expectation}
                                onSelectChange={onSelectChange}
                                isLoading={isExpectationLoading}
                            />

                            {isOtherExpectationSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.expectationOther}
                                    label="What do you expect from NW - Other? (*)"
                                    onChange={onTextChange}
                                    value={expectationOther}
                                    name="expectationOther"
                                    type="text"
                                />
                            }

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

                            {isBizTypeOf &&
                                <div>
                                    <p className="border-bottom mb-3 pb-1 text-secondary">
                                        <i className="fas fa-building"></i>&nbsp;Business Information
                                    </p>
                                    <BootstrapInput
                                        inputClassName="form-control form-control-lg"
                                        borderColour="border-primary"
                                        error={errors.organizationEmployeeCount}
                                        label="How many employees does your business have (*)"
                                        onChange={onTextChange}
                                        value={organizationEmployeeCount}
                                        name="organizationEmployeeCount"
                                        type="number"
                                    />
                                    <BootstrapInput
                                        inputClassName="form-control form-control-lg"
                                        borderColour="border-primary"
                                        error={errors.organizationFoundingYear}
                                        label="What year was your organization established? (*)"
                                        onChange={onTextChange}
                                        value={organizationFoundingYear}
                                        name="organizationFoundingYear"
                                        type="number"
                                    />
                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="What type of business is this? (*)"
                                        name="organizationTypeOf"
                                        defaultOptionLabel="-"
                                        options={ORGANIZATION_TYPE_OF_CHOICES}
                                        value={organizationTypeOf}
                                        error={errors.organizationTypeOf}
                                        onSelectChange={onSelectChange}
                                    />
                                </div>
                            }

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/admin/members/add/step-6" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
