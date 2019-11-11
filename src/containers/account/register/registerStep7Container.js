import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterStep7Component from "../../../components/account/register/registerStep7Component";
import {
    localStorageGetObjectItem, localStorageGetArrayItem, localStorageGetBooleanItem
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class RegisterStep7Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-register-typeOf"));
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
            bizCompanyName: localStorage.getItem("nwapp-register-biz-companyName"),
            bizContactFirstName: localStorage.getItem("nwapp-register-biz-contactFirstName"),
            bizContactLastName: localStorage.getItem("nwapp-register-biz-contactLastName"),
            bizPrimaryPhone: localStorage.getItem("nwapp-register-biz-primaryPhone"),
            bizSecondaryPhone: localStorage.getItem("nwapp-register-biz-secondaryPhone"),
            bizEmail: localStorage.getItem("nwapp-register-biz-email"),
            rezFirstName: localStorage.getItem("nwapp-register-rez-or-com-firstName"),
            rezLastName: localStorage.getItem("nwapp-register-rez-or-com-lastName"),
            rezPrimaryPhone: localStorage.getItem("nwapp-register-rez-or-com-primaryPhone"),
            rezSecondaryPhone: localStorage.getItem("nwapp-register-rez-or-com-secondaryPhone"),
            rezEmail: localStorage.getItem("nwapp-register-rez-or-com-email"),
            streetNumber: localStorage.getItem("nwapp-register-streetNumber"),
            streetName: localStorage.getItem("nwapp-register-streetName"),
            streetType: localStorage.getItem("nwapp-register-streetType"),
            streetTypeOption: localStorageGetObjectItem('nwapp-register-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-register-streetTypeOther"),
            streetDirection: localStorage.getItem("nwapp-register-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-register-streetDirectionOption'),
            watchSlug: localStorage.getItem('nwapp-register-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-register-watch-icon'),
            watchName: localStorage.getItem('nwapp-register-watch-name'),
            tags: localStorageGetArrayItem("nwapp-register-member-tags"),
            birthYear: localStorage.getItem("nwapp-register-birthYear"),
            gender: parseInt(localStorage.getItem("nwapp-register-member-gender")),
            genderLabel: localStorage.getItem("nwapp-register-member-gender-label"),
            howDidYouHear: localStorage.getItem("nwapp-register-member-howDidYouHear"),
            howDidYouHearLabel: localStorage.getItem("nwapp-register-member-howDidYouHearLabel"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-register-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-register-howDidYouHearOther"),
            meaning: localStorage.getItem("nwapp-register-member-meaning"),
            meaningLabel: localStorage.getItem("nwapp-register-member-meaningLabel"),
            meaningOther: localStorage.getItem("nwapp-register-member-meaningOther"),
            expectations: localStorage.getItem("nwapp-register-member-expectations"),
            willingToVolunteer: parseInt(localStorage.getItem("nwapp-register-willingToVolunteer")),
            willingToVolunteerLabel: localStorage.getItem("nwapp-register-willingToVolunteer-label"),
            anotherHouseholdMemberRegistered: parseInt(localStorage.getItem("nwapp-register-anotherHouseholdMemberRegistered")),
            anotherHouseholdMemberRegisteredLabel: localStorage.getItem("nwapp-register-anotherHouseholdMemberRegistered-label"),
            totalHouseholdCount: parseInt(localStorage.getItem("nwapp-register-totalHouseholdCount")),
            under18YearsHouseholdCount: parseInt(localStorage.getItem("nwapp-register-under18YearsHouseholdCount")),
            companyEmployeeCount: parseInt(localStorage.getItem("nwapp-register-companyEmployeeCount")),
            companyYearsInOperation: parseInt(localStorage.getItem("nwapp-register-companyYearsInOperation")),
            companyType: localStorage.getItem("nwapp-register-companyType"),
            agreement: localStorageGetBooleanItem("nwapp-register-agreement"),
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
            tags, birthYear, gender, genderLabel, howDidYouHear, howDidYouHearOther, howDidYouHearLabel, meaning, meaningLabel, meaningOther, expectations,
            willingToVolunteer, willingToVolunteerLabel, anotherHouseholdMemberRegistered, anotherHouseholdMemberRegisteredLabel, totalHouseholdCount, under18YearsHouseholdCount,
            companyEmployeeCount, companyYearsInOperation, companyType,
        } = this.state;

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
                birthYear={birthYear}
                gender={gender}
                genderLabel={genderLabel}
                howDidYouHear={howDidYouHear}
                howDidYouHearLabel={howDidYouHearLabel}
                howDidYouHearOther={howDidYouHearOther}
                meaning={meaning}
                meaningLabel={meaningLabel}
                meaningOther={meaningOther}
                expectations={expectations}
                willingToVolunteer={willingToVolunteer}
                willingToVolunteerLabel={willingToVolunteerLabel}
                anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                anotherHouseholdMemberRegisteredLabel={anotherHouseholdMemberRegisteredLabel}
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
