import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminMemberCreateStep8Component from "../../../../components/members/admin/create/adminMemberCreateStep8Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageRemoveItemsContaining
} from '../../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { postMemberDetail } from '../../../../actions/memberActions';
import { validateStep8CreateInput } from '../../../../validators/memberValidator';


class AdminMemberCreateStep8Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-create-member-typeOf"),
            organizationName: localStorage.getItem("nwapp-create-member-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("nwapp-create-member-organizationTypeOf"),
            firstName: localStorage.getItem("nwapp-create-member-firstName"),
            lastName: localStorage.getItem("nwapp-create-member-lastName"),
            primaryPhone: localStorage.getItem("nwapp-create-member-primaryPhone"),
            secondaryPhone: localStorage.getItem("nwapp-create-member-secondaryPhone"),
            email: localStorage.getItem("nwapp-create-member-email"),
            isOkToEmail: localStorageGetIntegerItem("nwapp-create-member-isOkToEmail"),
            isOkToText: localStorageGetIntegerItem("nwapp-create-member-isOkToText"),
            streetNumber: localStorage.getItem("nwapp-create-member-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-member-streetName"),
            streetType: localStorageGetIntegerItem("nwapp-create-member-streetType"),
            streetTypeLabel: localStorage.getItem("nwapp-create-member-streetTypeLabel"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-member-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-member-streetTypeOther"),
            apartmentUnit: localStorage.getItem("nwapp-create-member-apartmentUnit"),
            streetDirection: localStorageGetIntegerItem("nwapp-create-member-streetDirection"),
            streetDirectionLabel: localStorage.getItem("nwapp-create-member-streetDirectionLabel"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-member-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-member-postalCode"),
            country: localStorage.getItem("nwapp-create-member-country"),
            region: localStorage.getItem("nwapp-create-member-region"),
            locality: localStorage.getItem("nwapp-create-member-locality"),
            watchSlug: localStorage.getItem('nwapp-create-member-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-create-member-watch-icon'),
            watchName: localStorage.getItem('nwapp-create-member-watch-name'),
            typeOf: localStorageGetIntegerItem("nwapp-create-member-typeOf"),
            tags: localStorageGetArrayItem("nwapp-create-member-tags"),
            yearOfBirth: localStorage.getItem("nwapp-create-member-yearOfBirth"),
            gender: localStorageGetIntegerItem("nwapp-create-member-gender"),
            genderLabel: localStorage.getItem("nwapp-create-member-gender-label"),
            howDidYouHearLabel: localStorage.getItem("nwapp-create-member-howDidYouHearLabel"),
            howDidYouHear: localStorage.getItem("nwapp-create-member-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-create-member-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-create-member-howDidYouHearOther"),
            meaningLabel: localStorage.getItem("nwapp-create-member-meaningLabel"),
            meaning: localStorage.getItem("nwapp-create-member-meaning"),
            meaningOther: localStorage.getItem("nwapp-create-member-meaningOther"),
            expectationLabel: localStorage.getItem("nwapp-create-member-expectationLabel"),
            expectation: localStorage.getItem("nwapp-create-member-expectation"),
            expectationOther: localStorage.getItem("nwapp-create-member-expectationOther"),
            willingToVolunteerLabel: localStorage.getItem("nwapp-create-member-willingToVolunteer-label"),
            willingToVolunteer: localStorageGetIntegerItem("nwapp-create-member-willingToVolunteer"),
            anotherHouseholdMemberRegisteredLabel: localStorage.getItem("nwapp-create-member-anotherHouseholdMemberRegistered-label"),
            anotherHouseholdMemberRegistered: localStorageGetIntegerItem("nwapp-create-member-anotherHouseholdMemberRegistered"),
            totalHouseholdCount: localStorageGetIntegerItem("nwapp-create-member-totalHouseholdCount"),
            under18YearsHouseholdCount: localStorageGetIntegerItem("nwapp-create-member-under18YearsHouseholdCount"),
            organizationEmployeeCount: localStorageGetIntegerItem("nwapp-create-member-organizationEmployeeCount"),
            organizationFoundingYear: localStorageGetIntegerItem("nwapp-create-member-organizationFoundingYear"),
            organizationTypeOf: localStorage.getItem("nwapp-create-member-organizationTypeOf"),
            organizationTypeOfLabel: localStorage.getItem("nwapp-create-member-organizationTypeOfLabel"),
            errors: {},
            isLoading: false
        }

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.getPostData = this.getPostData.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // // (2) Join date - We need to format as per required API format.
        // const joinDateMoment = moment(this.state.joinDate);
        // postData.joinDate = joinDateMoment.format("YYYY-MM-DD")

        // BUGFIX: Street direction NaN case
        if (isNaN(this.state.streetDirection)) {
            postData.streetDirection = null;
        }

        // (3) Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
        }

        // (5) Password & Password Repeat
        if (this.state.password === undefined || this.state.password === null || this.state.password === '' || this.state.password.length == 0) {
            var randomString = Math.random().toString(34).slice(-10);
            randomString += "A";
            randomString += "!";
            postData.password = randomString;
            postData.passwordRepeat = randomString;
        }

        // (12) organizationTypeOf
        if (this.state.organizationTypeOf === null || this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === "" || isNaN(this.state.organizationTypeOf)) {
            postData.organizationTypeOf = 0;
            postData.organizationName = null;
        } else {
            if (this.state.organizationTypeOf !== BUSINESS_TYPE_OF) {
                postData.organizationName = null;
                postData.organizationEmployeeCount = 0;
                postData.organizationFoundingYear = 0;
            }
        }

        // Convert to boolean type.
        postData.anotherHouseholdMemberRegistered = this.state.anotherHouseholdMemberRegistered === 1;

        // BUGFIX: Handle NaN cases.
        postData.totalHouseholdCount = isNaN(this.state.totalHouseholdCount) ? 0 : this.state.totalHouseholdCount;
        postData.organizationFoundingYear = isNaN(this.state.organizationFoundingYear) ? 0 : this.state.organizationFoundingYear;
        postData.organizationEmployeeCount = isNaN(this.state.organizationEmployeeCount) ? 0 : this.state.organizationEmployeeCount;

        // BUGFIX: When converting from camelCase to snake_case, there appears to
        //         be a problem with the "18_y" conversion as it saves it as "18y"
        //         therefore as a result we need to run this code.
        postData.under_18_years_household_count = isNaN(this.state.under18YearsHouseholdCount) ? 0 : this.state.under18YearsHouseholdCount;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
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

    onSubmitClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep8CreateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // Once our state has been validated `client-side` then we will
                // make an API request with the server to create our new production.
                this.props.postMemberDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            });
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                localStorageRemoveItemsContaining("nwapp-create-member-");
                this.props.setFlashMessage("success", "Member has been successfully created.");
                this.props.history.push("/admin/member/"+response['slug']);
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            typeOf, errors,
            organizationName, organizationTypeOf, firstName, lastName, primaryPhone, secondaryPhone, email,
            streetNumber, streetName, streetType, streetTypeLabel, streetTypeOption, streetTypeOther, apartmentUnit, streetDirection, streetDirectionLabel, streetDirectionOption, postalCode,
            watchSlug, watchIcon, watchName,
            tags, yearOfBirth, gender, genderLabel, howDidYouHearLabel, howDidYouHear, howDidYouHearOther, meaningLabel, meaning, meaningOther, expectationLabel, expectation, expectationOther,
            willingToVolunteerLabel, willingToVolunteer, anotherHouseholdMemberRegisteredLabel, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount,
            organizationEmployeeCount, organizationFoundingYear, organizationType, organizationTypeOfLabel,
        } = this.state;

        return (
            <AdminMemberCreateStep8Component
                typeOf={typeOf}
                organizationName={organizationName}
                organizationTypeOf={organizationTypeOf}
                firstName={firstName}
                lastName={lastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeLabel={streetTypeLabel}
                streetTypeOption={streetTypeOption}
                streetTypeOther={streetTypeOther}
                apartmentUnit={apartmentUnit}
                streetDirection={streetDirection}
                streetDirectionLabel={streetDirectionLabel}
                streetDirectionOption={streetDirectionOption}
                postalCode={postalCode}
                watchSlug={watchSlug}
                watchIcon={watchIcon}
                watchName={watchName}
                tags={tags}
                yearOfBirth={yearOfBirth}
                gender={gender}
                genderLabel={genderLabel}
                errors={errors}
                onTextChange={this.onTextChange}
                howDidYouHearLabel={howDidYouHearLabel}
                howDidYouHear={howDidYouHear}
                howDidYouHearOther={howDidYouHearOther}
                meaningLabel={meaningLabel}
                meaning={meaning}
                meaningOther={meaningOther}
                expectationLabel={expectationLabel}
                expectation={expectation}
                expectationOther={expectationOther}
                willingToVolunteerLabel={willingToVolunteerLabel}
                willingToVolunteer={willingToVolunteer}
                anotherHouseholdMemberRegisteredLabel={anotherHouseholdMemberRegisteredLabel}
                anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                totalHouseholdCount={totalHouseholdCount}
                under18YearsHouseholdCount={under18YearsHouseholdCount}
                organizationEmployeeCount={organizationEmployeeCount}
                organizationFoundingYear={organizationFoundingYear}
                organizationType={organizationType}
                organizationTypeOfLabel={organizationTypeOfLabel}
                errors={errors}
                onSubmitClick={this.onSubmitClick}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postMemberDetail: (postData, successCallback, failedCallback) => {
            dispatch(postMemberDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberCreateStep8Container);
