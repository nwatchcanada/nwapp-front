import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import StaffUpdateComponent from "../../../components/staff/update/staffUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import validateInput from "../../../validators/staffValidator";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions } from "../../../actions/howHearAction";
import { getTagReactSelectOptions } from "../../../actions/tagAction";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";


class StaffUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { urlArgument, slug } = this.props.match.params;

        this.state = {
            urlArgument: urlArgument,
            slug: slug,
            firstName: localStorage.getItem("temp-staff-create-firstName"),
            lastName: localStorage.getItem("temp-staff-create-lastName"),
            dateOfBirth: localStorageGetDateItem("temp-staff-create-dateOfBirth"),
            gender: parseInt(localStorage.getItem("temp-staff-create-gender")),
            description: localStorage.getItem("temp-staff-create-description"),
            tags: localStorageGetArrayItem("temp-staff-create-tags"),
            howHear: localStorage.getItem("temp-staff-create-howHear"),
            phone: localStorage.getItem("temp-staff-create-phone"),
            mobile: localStorage.getItem("temp-staff-create-mobile"),
            workEmail: localStorage.getItem("temp-staff-create-workEmail"),
            personalEmail: localStorage.getItem("temp-staff-create-personalEmail"),
            streetNumber: localStorage.getItem("temp-staff-create-streetNumber"),
            streetName: localStorage.getItem("temp-staff-create-streetName"),
            streetType: localStorage.getItem("temp-staff-create-streetType"),
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
            password: localStorage.getItem("temp-staff-create-password"),
            repeatPassword: localStorage.getItem("temp-staff-create-repeatPassword"),
            isActive: localStorage.getItem("temp-staff-create-isActive"),
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

        // --- Make flash message ---
        this.props.setFlashMessage("success", "Staff has been successfully updated.");

        // --- Move to our next page ---
        this.props.history.push("/staff/"+this.state.urlArgument+"/"+this.state.slug+"/full");
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
        const key = "temp-staff-create-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('temp-staff-create-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('temp-staff-create-'+optionKey, option);
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
        const key = 'temp-staff-create-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onDateOfBirthChange(dateObj) {
        this.setState({
            dateOfBirth: dateObj,
        })
        localStorageSetObjectOrArrayItem('temp-staff-create-dateOfBirth', dateObj);
    }

    onCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ country: null, region: null })
        } else {
            this.setState({ country: value, region: null })
        }
        localStorage.setItem('temp-staff-create-country', value);
    }

    onRegionChange(value) {
        this.setState({ region: value })
        localStorage.setItem('temp-staff-create-region', value);
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
        const storageValueKey = "temp-staff-create-"+[e.target.name];
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
            urlArgument, slug,
            firstName, lastName, dateOfBirth, gender, description, howHear, tags, phone, mobile, workEmail, personalEmail,
            streetNumber, streetName, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, locality, region, country, postal, emergencyFullName,
            emergencyRelationship, emergencyTelephone, emergencyAlternativeTelephone, additionalComments, accountType,
            password, repeatPassword, isActive, isActiveOptions,
            errors, isLoading
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.state.howHearData, "howHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <StaffUpdateComponent
                urlArgument={urlArgument}
                slug={slug}
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
                postal={postal}
                emergencyFullName={emergencyFullName}
                emergencyRelationship={emergencyRelationship}
                emergencyTelephone={emergencyTelephone}
                emergencyAlternativeTelephone={emergencyAlternativeTelephone}
                additionalComments={additionalComments}
                accountType={accountType}
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
                onCountryChange={this.onCountryChange}
                onRegionChange={this.onRegionChange}
                onRadioChange={this.onRadioChange}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffUpdateContainer);