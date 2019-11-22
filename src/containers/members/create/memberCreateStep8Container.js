import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import MemberCreateStep8Component from "../../../components/members/create/memberCreateStep8Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageRemoveItemsContaining
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { postMemberDetail } from '../../../actions/memberActions';
import { validateStep8CreateInput } from '../../../validators/memberValidator';


class MemberCreateStep8Container extends Component {
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
            streetNumber: localStorage.getItem("nwapp-create-member-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-member-streetName"),
            streetType: localStorage.getItem("nwapp-create-member-streetType"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-member-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-member-streetTypeOther"),
            apartmentUnit: localStorage.getItem("nwapp-create-member-apartmentUnit"),
            streetDirection: localStorage.getItem("nwapp-create-member-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-member-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-member-postalCode"),
            watchSlug: localStorage.getItem('nwapp-create-member-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-create-member-watch-icon'),
            watchName: localStorage.getItem('nwapp-create-member-watch-name'),
            tags: localStorageGetArrayItem("nwapp-create-member-tags"),
            birthYear: localStorage.getItem("nwapp-create-member-birthYear"),
            gender: parseInt(localStorage.getItem("nwapp-create-member-gender")),
            genderLabel: localStorage.getItem("nwapp-create-member-gender-label"),
            howDidYouHear: localStorage.getItem("nwapp-create-member-howDidYouHear"),
            howDidYouHearLabel: localStorage.getItem("nwapp-create-member-howDidYouHearLabel"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-create-member-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-create-member-howDidYouHearOther"),
            meaning: localStorage.getItem("nwapp-create-member-meaning"),
            expectations: localStorage.getItem("nwapp-create-member-expectations"),
            willingToVolunteer: parseInt(localStorage.getItem("nwapp-create-member-willingToVolunteer")),
            willingToVolunteerLabel: localStorage.getItem("nwapp-create-member-willingToVolunteer-label"),
            anotherHouseholdMemberRegistered: parseInt(localStorage.getItem("nwapp-create-member-anotherHouseholdMemberRegistered")),
            anotherHouseholdMemberRegisteredLabel: localStorage.getItem("nwapp-create-member-anotherHouseholdMemberRegistered-label"),
            totalHouseholdCount: parseInt(localStorage.getItem("nwapp-create-member-totalHouseholdCount")),
            under18YearsHouseholdCount: parseInt(localStorage.getItem("nwapp-create-member-under18YearsHouseholdCount")),
            organizationEmployeeCount: parseInt(localStorage.getItem("nwapp-create-member-organizationEmployeeCount")),
            organizationYearsInOperation: parseInt(localStorage.getItem("nwapp-create-member-organizationYearsInOperation")),
            organizationType: localStorage.getItem("nwapp-create-member-organizationType"),
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
        }

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
                this.props.postClientDetail(
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
                localStorageRemoveItemsContaining("workery-create-client-");
                this.props.setFlashMessage("success", "Client has been successfully created.");
                this.props.history.push("/client/"+response['id']);
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
            streetNumber, streetName, streetType, streetTypeOption, streetTypeOther, apartmentUnit, streetDirection, streetDirectionOption, postalCode,
            watchSlug, watchIcon, watchName,
            tags, birthYear, gender, genderLabel, howDidYouHear, howDidYouHearOther, howDidYouHearLabel, meaning, expectations,
            willingToVolunteer, willingToVolunteerLabel, anotherHouseholdMemberRegistered, anotherHouseholdMemberRegisteredLabel, totalHouseholdCount, under18YearsHouseholdCount,
            organizationEmployeeCount, organizationYearsInOperation, organizationType,
        } = this.state;

        return (
            <MemberCreateStep8Component
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
                streetTypeOption={streetTypeOption}
                streetTypeOther={streetTypeOther}
                apartmentUnit={apartmentUnit}
                streetDirection={streetDirection}
                streetDirectionOption={streetDirectionOption}
                postalCode={postalCode}
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
                expectations={expectations}
                willingToVolunteer={willingToVolunteer}
                willingToVolunteerLabel={willingToVolunteerLabel}
                anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                anotherHouseholdMemberRegisteredLabel={anotherHouseholdMemberRegisteredLabel}
                totalHouseholdCount={totalHouseholdCount}
                under18YearsHouseholdCount={under18YearsHouseholdCount}
                organizationEmployeeCount={organizationEmployeeCount}
                organizationYearsInOperation={organizationYearsInOperation}
                organizationType={organizationType}
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
)(MemberCreateStep8Container);
