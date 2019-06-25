import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffCreateStep2Component from "../../../components/staff/create/staffCreateStep2Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import validateInput from "../../../validators/staffValidator";
import { localStorageGetDateItem, localStorageGetArrayItem } from '../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions } from "../../../actions/howHearAction";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";


class StaffCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: localStorage.getItem("temp-staff-create-firstName"),
            lastName: localStorage.getItem("temp-staff-create-lastName"),
            dateOfBirth: localStorageGetDateItem("temp-staff-create-dateOfBirth"),
            gender: parseInt(localStorage.getItem("temp-staff-create-gender")),
            genderLabel: localStorage.getItem("temp-staff-create-genderLabel"),
            description: localStorage.getItem("temp-staff-create-description"),
            tags: localStorageGetArrayItem("temp-staff-create-tags"),
            howHear: localStorage.getItem("temp-staff-create-howHear"),
            howHearLabel: localStorage.getItem("temp-staff-create-howHearLabel"),
            phone: localStorage.getItem("temp-staff-create-phone"),
            mobile: localStorage.getItem("temp-staff-create-mobile"),
            workEmail: localStorage.getItem("temp-staff-create-workEmail"),
            personalEmail: localStorage.getItem("temp-staff-create-personalEmail"),
            streetNumber: localStorage.getItem("temp-staff-create-streetNumber"),
            streetName: localStorage.getItem("temp-staff-create-streetName"),
            streetType: localStorage.getItem("temp-staff-create-streetType"),
            streetTypeLabel: localStorage.getItem("temp-staff-create-streetTypeLabel"),
            streetTypeOptions: BASIC_STREET_TYPE_CHOICES,
            streetTypeOther: localStorage.getItem("temp-staff-create-streetTypeOther"),
            streetDirection: localStorage.getItem("temp-staff-create-streetDirection"),
            streetDirectionOptions: STREET_DIRECTION_CHOICES,
            locality: localStorage.getItem("temp-staff-create-locality"),
            region: localStorage.getItem("temp-staff-create-region"),
            country: localStorage.getItem("temp-staff-create-country"),
            postal: localStorage.getItem("temp-staff-create-postal"),
            emergencyFullName: localStorage.getItem("temp-staff-create-emergencyFullName"),
            emergencyRelationship: localStorage.getItem("temp-staff-create-emergencyRelationship"),
            emergencyTelephone: localStorage.getItem("temp-staff-create-emergencyTelephone"),
            emergencyAlternativeTelephone: localStorage.getItem("temp-staff-create-emergencyAlternativeTelephone"),
            additionalComments: localStorage.getItem("temp-staff-create-additionalComments"),
            accountType: parseInt(localStorage.getItem("temp-staff-create-accountType")),
            accountTypeLabel: localStorage.getItem("temp-staff-create-accountTypeLabel"),
            password: localStorage.getItem("temp-staff-create-password"),
            repeatPassword: localStorage.getItem("temp-staff-create-repeatPassword"),
            isActive: localStorage.getItem("temp-staff-create-isActive"),
            isActiveLabel: localStorage.getItem("temp-staff-create-isActiveLabel"),
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

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

    onSuccessfulSubmissionCallback(staff) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Staff has been successfully created.");
        this.props.history.push("/staff/active");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
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
            <StaffCreateStep2Component
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffCreateStep2Container);
