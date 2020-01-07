import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffCreateStep1Component from "../../../components/staff/create/staffCreateStep1Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import validateInput from "../../../validators/staffValidator";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions } from "../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../actions/tagActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";
import { GENDER_CHOICES, TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES } from "../../../constants/api";


class StaffCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: localStorage.getItem("nwapp-staff-create-firstName"),
            lastName: localStorage.getItem("nwapp-staff-create-lastName"),
            dateOfBirth: localStorageGetDateItem("nwapp-staff-create-dateOfBirth"),
            gender: parseInt(localStorage.getItem("nwapp-staff-create-gender")),
            description: localStorage.getItem("nwapp-staff-create-description"),
            tags: localStorageGetArrayItem("nwapp-staff-create-tags"),
            howHear: localStorage.getItem("nwapp-staff-create-howHear"),
            phone: localStorage.getItem("nwapp-staff-create-phone"),
            mobile: localStorage.getItem("nwapp-staff-create-mobile"),
            workEmail: localStorage.getItem("nwapp-staff-create-workEmail"),
            personalEmail: localStorage.getItem("nwapp-staff-create-personalEmail"),
            streetNumber: localStorage.getItem("nwapp-staff-create-streetNumber"),
            streetName: localStorage.getItem("nwapp-staff-create-streetName"),
            streetType: localStorage.getItem("nwapp-staff-create-streetType"),
            streetTypeOptions: BASIC_STREET_TYPE_CHOICES,
            streetTypeOther: localStorage.getItem("nwapp-staff-create-streetTypeOther"),
            apartmentUnit: localStorage.getItem("nwapp-staff-create-apartmentUnit"),
            streetDirection: localStorage.getItem("nwapp-staff-create-streetDirection"),
            streetDirectionOptions: STREET_DIRECTION_CHOICES,
            postalCode: localStorage.getItem("nwapp-staff-create-postalCode"),
            locality: localStorage.getItem("nwapp-staff-create-locality"),
            region: localStorage.getItem("nwapp-staff-create-region"),
            country: localStorage.getItem("nwapp-staff-create-country"),
            emergencyFullName: localStorage.getItem("nwapp-staff-create-emergencyFullName"),
            emergencyRelationship: localStorage.getItem("nwapp-staff-create-emergencyRelationship"),
            emergencyTelephone: localStorage.getItem("nwapp-staff-create-emergencyTelephone"),
            emergencyAlternativeTelephone: localStorage.getItem("nwapp-staff-create-emergencyAlternativeTelephone"),
            additionalComments: localStorage.getItem("nwapp-staff-create-additionalComments"),
            policeCheckDate: localStorageGetDateItem("nwapp-staff-create-policeCheckDate"),
            accountType: parseInt(localStorage.getItem("nwapp-staff-create-accountType")),
            password: localStorage.getItem("nwapp-staff-create-password"),
            repeatPassword: localStorage.getItem("nwapp-staff-create-repeatPassword"),
            isActive: localStorage.getItem("nwapp-staff-create-isActive"),
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

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
        this.onPoliceCheckDateChange = this.onPoliceCheckDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // TODO: REPLACE THE FOLLOWING CODE WITH API ENDPOINT CALLING.
        this.setState({
            howHearData: {
                results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                    name: 'Word of mouth',
                    slug: 'word-of-mouth'
                },{
                    name: 'Internet',
                    slug: 'internet'
                }]
            },
            tagsData: {
                results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                    name: 'Health',
                    slug: 'health'
                },{
                    name: 'Security',
                    slug: 'security'
                },{
                    name: 'Fitness',
                    slug: 'fitness'
                }]
            }
        });
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
        // --- Update the GUI ---
        this.setState({ errors: {}, isLoading: true, })

        // --- Update our STORAGE ---
        // Gender.
        for (let i = 0; i < GENDER_CHOICES.length; i++) {
            let option = GENDER_CHOICES[i];
            if (this.state.gender === option.value) {
                localStorage.setItem('nwapp-staff-create-genderLabel', option.label);
            }
        }

        // How did you hear about us?
        for (let i = 0; i < this.state.howHearData.results.length; i++) {
            let option = this.state.howHearData.results[i];
            if (this.state.howHear === option.slug) {
                localStorage.setItem('nwapp-staff-create-howHearLabel', option.name);
            }
        }

        // Street Type
        if (this.state.streetType === "Other") {
            localStorage.setItem('nwapp-staff-create-streetTypeLabel', this.state.streetTypeOther);
        } else {
            localStorage.setItem('nwapp-staff-create-streetTypeLabel', this.state.streetType);
        }

        // Account Types
        for (let i = 0; i < TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES.length; i++) {
            let option = TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES[i];
            if (this.state.accountType === option.value) {
                localStorage.setItem('nwapp-staff-create-accountTypeLabel', option.label);
            }
        }

        // isActive
        for (let i = 0; i < this.state.isActiveOptions.length; i++) {
            let option = this.state.isActiveOptions[i];
            let isSelected = this.state.isActive.toString() === option.value.toString();
            if (isSelected) {
                localStorage.setItem('nwapp-staff-create-isActiveLabel', option.label);
            }
        }

        // --- Move to our next page ---
        this.props.history.push("/staff/add/step-2");
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const key = "nwapp-staff-create-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-staff-create-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-staff-create-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
        console.log(option);
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'nwapp-staff-create-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onDateOfBirthChange(dateObj) {
        this.setState({
            dateOfBirth: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-staff-create-dateOfBirth', dateObj);
    }

    onPoliceCheckDateChange(dateObj) {
        this.setState({
            policeCheckDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-staff-create-policeCheckDate', dateObj);
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }
        localStorage.setItem('nwapp-staff-create-country', value);
    }

    onRegionChange(value) {
        this.setState({ region: value })
        localStorage.setItem('nwapp-staff-create-region', value);
    }

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

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-staff-create-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            firstName, lastName, dateOfBirth, gender, description, howHear, tags, phone, mobile, workEmail, personalEmail,
            streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, locality, region, country, postalCode, emergencyFullName,
            emergencyRelationship, emergencyTelephone, emergencyAlternativeTelephone, additionalComments, accountType, policeCheckDate,
            password, repeatPassword, isActive, isActiveOptions,
            errors, isLoading
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.state.howHearData, "howHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <StaffCreateStep1Component
                firstName={firstName}
                lastName={lastName}
                dateOfBirth={dateOfBirth}
                gender={gender}
                description={description}
                howHear={howHear}
                howHearOptions={howHearOptions}
                tags={tags}
                tagOptions={tagOptions}
                phone={phone}
                mobile={mobile}
                workEmail={workEmail}
                personalEmail={personalEmail}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeOptions={streetTypeOptions}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={streetDirectionOptions}
                locality={locality}
                region={region}
                country={country}
                postalCode={postalCode}
                emergencyFullName={emergencyFullName}
                emergencyRelationship={emergencyRelationship}
                emergencyTelephone={emergencyTelephone}
                emergencyAlternativeTelephone={emergencyAlternativeTelephone}
                additionalComments={additionalComments}
                accountType={accountType}
                policeCheckDate={policeCheckDate}
                password={password}
                repeatPassword={repeatPassword}
                isActive={isActive}
                isActiveOptions={isActiveOptions}
                isLoading={isLoading}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
                onDateOfBirthChange={this.onDateOfBirthChange}
                onPoliceCheckDateChange={this.onPoliceCheckDateChange}
                onCountryChange={this.onCountryChange}
                onRegionChange={this.onRegionChange}
                onRadioChange={this.onRadioChange}
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
)(StaffCreateStep1Container);