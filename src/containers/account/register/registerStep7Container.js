import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterStep7Component from "../../../components/account/register/registerStep7Component";
import {
    localStorageGetObjectItem, localStorageGetDateItem, localStorageGetArrayItem, localStorageGetBooleanItem
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { getHowHearReactSelectOptions } from "../../../actions/howHearAction";
import { getTagReactSelectOptions } from "../../../actions/tagAction";


class RegisterStep7Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("temp-register-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/register/step-2-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/register/step-2-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            bizCompanyName: localStorage.getItem("temp-register-biz-companyName"),
            bizContactFirstName: localStorage.getItem("temp-register-biz-contactFirstName"),
            bizContactLastName: localStorage.getItem("temp-register-biz-contactLastName"),
            bizPrimaryPhone: localStorage.getItem("temp-register-biz-primaryPhone"),
            bizSecondaryPhone: localStorage.getItem("temp-register-biz-secondaryPhone"),
            bizEmail: localStorage.getItem("temp-register-biz-email"),
            rezFirstName: localStorage.getItem("temp-register-rez-or-com-firstName"),
            rezLastName: localStorage.getItem("temp-register-rez-or-com-lastName"),
            rezPrimaryPhone: localStorage.getItem("temp-register-rez-or-com-primaryPhone"),
            rezSecondaryPhone: localStorage.getItem("temp-register-rez-or-com-secondaryPhone"),
            rezEmail: localStorage.getItem("temp-register-rez-or-com-email"),
            streetNumber: localStorage.getItem("temp-register-streetNumber"),
            streetName: localStorage.getItem("temp-register-streetName"),
            streetType: localStorage.getItem("temp-register-streetType"),
            streetTypeOption: localStorageGetObjectItem('temp-register-streetTypeOption'),
            streetTypeOther: localStorage.getItem("temp-register-streetTypeOther"),
            streetDirection: localStorage.getItem("temp-register-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('temp-register-streetDirectionOption'),
            watchSlug: localStorage.getItem('temp-register-watch-slug'),
            watchIcon: localStorage.getItem('temp-register-watch-icon'),
            watchName: localStorage.getItem('temp-register-watch-name'),
            tags: localStorageGetArrayItem("temp-register-tags"),
            birthYear: localStorage.getItem("temp-register-birthYear"),
            gender: parseInt(localStorage.getItem("temp-register-gender")),
            genderLabel: localStorage.getItem("temp-staff-create-genderLabel"),
            howDidYouHear: localStorage.getItem("temp-register-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('temp-register-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("temp-register-howDidYouHearOther"),
            meaning: localStorage.getItem("temp-register-meaning"),
            expectations: localStorage.getItem("temp-register-expectations"),
            willingToVolunteer: parseInt(localStorage.getItem("temp-register-willingToVolunteer")),
            anotherHouseholdMemberRegistered: parseInt(localStorage.getItem("temp-register-anotherHouseholdMemberRegistered")),
            totalHouseholdCount: parseInt(localStorage.getItem("temp-register-totalHouseholdCount")),
            under18YearsHouseholdCount: parseInt(localStorage.getItem("temp-register-householdCount")),
            companyEmployeeCount: parseInt(localStorage.getItem("temp-register-companyEmployeeCount")),
            companyYearsInOperation: parseInt(localStorage.getItem("temp-register-companyYearsInOperation")),
            companyType: localStorage.getItem("temp-register-companyType"),
            agreement: localStorageGetBooleanItem("temp-register-agreement"),
            errors: {},
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/register-success");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            returnURL, typeOf, errors,
            bizCompanyName, bizContactFirstName, bizContactLastName, bizPrimaryPhone, bizSecondaryPhone, bizEmail,
            rezFirstName, rezLastName, rezPrimaryPhone, rezSecondaryPhone, rezEmail,
            streetNumber, streetName, streetType, streetTypeOption, streetTypeOther, streetDirection, streetDirectionOption,
            watchSlug, watchIcon, watchName,
            tags, birthYear, gender, genderLabel, howDidYouHear, howDidYouHearOther, meaning, expectations,
            willingToVolunteer, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount,
            companyEmployeeCount, companyYearsInOperation, companyType,
        } = this.state;

        const howDidYouHearOptions = getHowHearReactSelectOptions(this.state.howDidYouHearData, "howDidYouHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <RegisterStep7Component
                returnURL={returnURL}
                typeOf={typeOf}
                bizCompanyName={bizCompanyName}
                bizContactFirstName={bizContactFirstName}
                bizContactLastName={bizContactLastName}
                bizPrimaryPhone={bizPrimaryPhone}
                bizSecondaryPhone={bizSecondaryPhone}
                bizEmail={bizEmail}
                rezFirstName={rezFirstName}
                rezLastName={rezLastName}
                rezPrimaryPhone={rezPrimaryPhone}
                rezSecondaryPhone={rezSecondaryPhone}
                rezEmail={rezEmail}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeOption={streetTypeOption}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOption={streetDirectionOption}
                watchSlug={watchSlug}
                watchIcon={watchIcon}
                watchName={watchName}
                tags={tags}
                tagOptions={tagOptions}
                birthYear={birthYear}
                gender={gender}
                genderLabel={genderLabel}
                howDidYouHear={howDidYouHear}
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
                errors={errors}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterStep7Container);
