// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import MemberBizUpdateFormComponent from "./memberBizUpdateFormComponent";
import MemberComUpdateFormComponent from "./memberComUpdateFormComponent";
import MemberRezUpdateFormComponent from "./memberRezUpdateFormComponent";


class MemberUpdateComponent extends Component {
    render() {
        // Common
        const { urlArgument, slug, typeOf, errors, onTextChange, onSelectChange, onRadioChange, onMultiChange, onDOBDateTimeChange, isLoading, onClick } = this.props;

        // Biz - Contact
        const { companyName, contactFirstName, contactLastName } = this.props;

        // Rez - Contact
        const { firstName, lastName, primaryPhone, secondaryPhone, email } = this.props;

        // Address
        const { streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions } = this.props;

        // Watches
        const { watch, watchOptions } = this.props;

        // Extra
        const {
            tags, tagOptions, birthYear, gender, howDidYouHear, howDidYouHearOptions, howDidYouHearOther,
            meaning, expectations, willingToVolunteer, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount,
            companyEmployeeCount, companyYearsInOperation, companyType,
        } = this.props;

        // Check the type of member this is.
        const isBiz = typeOf === BUSINESS_TYPE_OF;
        const isRez = typeOf === RESIDENCE_TYPE_OF;
        const isCom = typeOf === COMMUNITY_CARES_TYPE_OF;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/members/${urlArgument}`}><i className="fas fa-users"></i>&nbsp;Member</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/members/${urlArgument}/${slug}/full`}><i className="fas fa-user"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Update Member</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            {isRez &&
                                <MemberRezUpdateFormComponent
                                    urlArgument={urlArgument}
                                    slug={slug}
                                    typeOf={typeOf}
                                    errors={errors}
                                    onTextChange={onTextChange}
                                    onRadioChange={onRadioChange}
                                    onSelectChange={onSelectChange}
                                    onMultiChange={onMultiChange}
                                    onDOBDateTimeChange={onDOBDateTimeChange}
                                    isLoading={isLoading}
                                    onClick={onClick}

                                    firstName={firstName}
                                    lastName={lastName}
                                    primaryPhone={primaryPhone}
                                    secondaryPhone={secondaryPhone}
                                    email={email}

                                    streetNumber={streetNumber}
                                    streetName={streetName}
                                    streetType={streetType}
                                    streetTypeOptions={streetTypeOptions}
                                    streetTypeOther={streetTypeOther}
                                    streetDirection={streetDirection}
                                    streetDirectionOptions={streetDirectionOptions}

                                    watch={watch}
                                    watchOptions={watchOptions}

                                    tags={tags}
                                    tagOptions={tagOptions}
                                    birthYear={birthYear}
                                    gender={gender}
                                    howDidYouHear={howDidYouHear}
                                    // howDidYouHearOption={howDidYouHearOption}
                                    howDidYouHearOptions={howDidYouHearOptions}
                                    howDidYouHearOther={howDidYouHearOther}
                                    meaning={meaning}
                                    expectations={expectations}
                                    willingToVolunteer={willingToVolunteer}
                                    anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                                    totalHouseholdCount={totalHouseholdCount}
                                    under18YearsHouseholdCount={under18YearsHouseholdCount}
                                />
                            }

                            {isBiz &&
                                <MemberBizUpdateFormComponent
                                    urlArgument={urlArgument}
                                    slug={slug}
                                    typeOf={typeOf}
                                    errors={errors}
                                    onTextChange={onTextChange}
                                    onRadioChange={onRadioChange}
                                    onSelectChange={onSelectChange}
                                    onMultiChange={onMultiChange}
                                    onDOBDateTimeChange={onDOBDateTimeChange}
                                    isLoading={isLoading}
                                    onClick={onClick}

                                    companyName={companyName}
                                    contactFirstName={contactFirstName}
                                    contactLastName={contactLastName}
                                    primaryPhone={primaryPhone}
                                    secondaryPhone={secondaryPhone}
                                    email={email}

                                    streetNumber={streetNumber}
                                    streetName={streetName}
                                    streetType={streetType}
                                    streetTypeOptions={streetTypeOptions}
                                    streetTypeOther={streetTypeOther}
                                    streetDirection={streetDirection}
                                    streetDirectionOptions={streetDirectionOptions}

                                    watch={watch}
                                    watchOptions={watchOptions}

                                    tags={tags}
                                    tagOptions={tagOptions}
                                    birthYear={birthYear}
                                    gender={gender}
                                    howDidYouHear={howDidYouHear}
                                    // howDidYouHearOption={howDidYouHearOption}
                                    howDidYouHearOptions={howDidYouHearOptions}
                                    howDidYouHearOther={howDidYouHearOther}
                                    meaning={meaning}
                                    expectations={expectations}
                                    willingToVolunteer={willingToVolunteer}
                                    anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                                    totalHouseholdCount={totalHouseholdCount}
                                    under18YearsHouseholdCount={under18YearsHouseholdCount}
                                    companyEmployeeCount={companyEmployeeCount}
                                    companyYearsInOperation={companyYearsInOperation}
                                    companyType={companyType}
                                />
                            }

                            {isCom &&
                                <MemberComUpdateFormComponent
                                    urlArgument={urlArgument}
                                    slug={slug}
                                    typeOf={typeOf}
                                    errors={errors}
                                    onTextChange={onTextChange}
                                    onRadioChange={onRadioChange}
                                    onSelectChange={onSelectChange}
                                    onMultiChange={onMultiChange}
                                    onDOBDateTimeChange={onDOBDateTimeChange}
                                    isLoading={isLoading}
                                    onClick={onClick}

                                    firstName={firstName}
                                    lastName={lastName}
                                    primaryPhone={primaryPhone}
                                    secondaryPhone={secondaryPhone}
                                    email={email}

                                    streetNumber={streetNumber}
                                    streetName={streetName}
                                    streetType={streetType}
                                    streetTypeOptions={streetTypeOptions}
                                    streetTypeOther={streetTypeOther}
                                    streetDirection={streetDirection}
                                    streetDirectionOptions={streetDirectionOptions}

                                    watch={watch}
                                    watchOptions={watchOptions}

                                    tags={tags}
                                    tagOptions={tagOptions}
                                    birthYear={birthYear}
                                    gender={gender}
                                    howDidYouHear={howDidYouHear}
                                    // howDidYouHearOption={howDidYouHearOption}
                                    howDidYouHearOptions={howDidYouHearOptions}
                                    howDidYouHearOther={howDidYouHearOther}
                                    meaning={meaning}
                                    expectations={expectations}
                                    willingToVolunteer={willingToVolunteer}
                                    anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                                    totalHouseholdCount={totalHouseholdCount}
                                    under18YearsHouseholdCount={under18YearsHouseholdCount}
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/members/${urlArgument}/${slug}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default MemberUpdateComponent;
