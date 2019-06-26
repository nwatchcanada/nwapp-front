import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffFullRetrieveComponent from "../../../components/staff/retrieve/staffFullRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { getHowHearReactSelectOptions } from "../../../actions/howHearAction";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";
// import { GENDER_CHOICES, TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES } from "../../../constants/api";


class StaffFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { urlArgument, slug } = this.props.match.params;

        // Update state.
        this.state = {
            urlArgument: urlArgument,
            slug: slug,
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            gender: "",
            genderLabel: "",
            description: "",
            tags: [],
            howHear: "",
            howHearLabel: "",
            phone: "",
            mobile: "",
            workEmail: "",
            personalEmail: "",
            streetNumber: "",
            streetName: "",
            streetType: "",
            streetTypeLabel: "",
            streetTypeOptions: BASIC_STREET_TYPE_CHOICES,
            streetTypeOther: "",
            streetDirection: "",
            streetDirectionOptions: STREET_DIRECTION_CHOICES,
            locality: "",
            region: "",
            country: "",
            postal: "",
            emergencyFullName: "",
            emergencyRelationship: "",
            emergencyTelephone: "",
            emergencyAlternativeTelephone: "",
            additionalComments: "",
            accountType: "",
            accountTypeLabel: "",
            password: "",
            repeatPassword: "",
            isActive: "",
            isActiveLabel: "",
            isActiveOption: {},
            isActiveOptions: [{
                id: 'isActive-true-choice',
                name: 'isActive',
                value: true,
                label: 'Yes',
            },{
                id: 'isActive-false-choice',
                name: 'isActive',
                value: false,
                label: 'No',
            }],
            errors: {},
            isLoading: false
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

       // TODO: IMPLEMENT API ENDPOINTS.
       this.setState({
           firstName: "Frank",
           lastName: "Herbert",
           dateOfBirth: new Date(),
           gender: "",
           genderLabel: "Male",
           description: "A famous author who wrote the book `Dune`.",
           tags: [{"selectName":"tags","value":"health","label":"Health"}],
           howHear: "",
           howHearLabel: "Internet",
           phone: "(123) 456-7898",
           mobile: "(789) 654-3210",
           workEmail: "fherbert@dune.com",
           personalEmail: "fherbert@arakis.com",
           streetNumber: 12345,
           streetName: "Fremen",
           streetType: "",
           streetTypeLabel: "Way",
           streetTypeOptions: BASIC_STREET_TYPE_CHOICES,
           streetTypeOther: "",
           streetDirection: "",
           streetDirectionOptions: STREET_DIRECTION_CHOICES,
           locality: "London",
           region: "Ontario",
           country: "Canada",
           postal: "N6J4X4",
           emergencyFullName: "Paul A.",
           emergencyRelationship: "Friend",
           emergencyTelephone: "(777) 777-7777",
           emergencyAlternativeTelephone: "(888) 888-8888",
           additionalComments: "Good attention to detail.",
           accountType: "",
           accountTypeLabel: "Management Staff",
           password: "",
           repeatPassword: "",
           isActive: "",
           isActiveLabel: "Yes",
           isActiveOption: {},
       })
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/staff/"+this.state.urlArgument);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/staff/"+this.state.urlArgument+"/"+this.state.slug+"/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            firstName, lastName, dateOfBirth, gender, description, tags, howHear, phone, mobile, workEmail, personalEmail,
            streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, locality, region, country, postal, emergencyFullName,
            emergencyRelationship, emergencyTelephone, emergencyAlternativeTelephone, additionalComments, accountType,
            password, repeatPassword, isActive, isActiveOptions,
            genderLabel, howHearLabel, streetTypeLabel, accountTypeLabel, isActiveLabel,
            errors, isLoading
        } = this.state;

        const howHearData = {
            results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                name: 'Word of mouth',
                slug: 'word-of-mouth'
            },{
                name: 'Internet',
                slug: 'internet'
            }]
        };

        const howHearOptions = getHowHearReactSelectOptions(howHearData, "howHear");

        return (
            <StaffFullRetrieveComponent
                urlArgument={this.state.urlArgument}
                slug={this.state.slug}
                firstName={firstName}
                lastName={lastName}
                dateOfBirth={dateOfBirth}
                gender={gender}
                genderLabel={genderLabel}
                description={description}
                tags={tags}
                howHear={howHear}
                howHearLabel={howHearLabel}
                howHearOptions={howHearOptions}
                phone={phone}
                mobile={mobile}
                workEmail={workEmail}
                personalEmail={personalEmail}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeLabel={streetTypeLabel}
                streetTypeOptions={streetTypeOptions}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={streetDirectionOptions}
                locality={locality}
                region={region}
                country={country}
                postal={postal}
                emergencyFullName={emergencyFullName}
                emergencyRelationship={emergencyRelationship}
                emergencyTelephone={emergencyTelephone}
                emergencyAlternativeTelephone={emergencyAlternativeTelephone}
                additionalComments={additionalComments}
                accountType={accountType}
                accountTypeLabel={accountTypeLabel}
                password={password}
                repeatPassword={repeatPassword}
                isActive={isActive}
                isActiveLabel={isActiveLabel}
                isActiveOptions={isActiveOptions}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffFullRetrieveContainer);
