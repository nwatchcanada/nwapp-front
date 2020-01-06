import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminStaffCreateStep7Component from "../../../../components/staffs/admin/create/adminCreateStep7Component";
import { validateStep7CreateInput } from "../../../../validators/staffValidator";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../../actions/howHearActions";
import { getMeaningReactSelectOptions, pullMeaningList } from "../../../../actions/meaningActions";
import { getExpectationReactSelectOptions, pullExpectationList } from "../../../../actions/expectationActions";
import { getTagReactSelectOptions, pullTagList } from "../../../../actions/tagActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


class AdminStaffCreateStep7Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-create-staff-typeOf"),
            isTagsLoading: true,
            tags: localStorageGetArrayItem("nwapp-create-staff-tags"),
            yearOfBirth: localStorage.getItem("nwapp-create-staff-yearOfBirth"),
            gender: localStorage.getItem("nwapp-create-staff-gender"),
            isHowHearLoading: true,
            howDidYouHear: localStorageGetIntegerItem("nwapp-create-staff-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-create-staff-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-create-staff-howDidYouHearOther"),
            isMeaningLoading: true,
            meaning: localStorageGetIntegerItem("nwapp-create-staff-meaning"),
            meaningOther: localStorage.getItem("nwapp-create-staff-meaningOther"),
            isExpectationLoading: true,
            expectation: localStorageGetIntegerItem("nwapp-create-staff-expectation"),
            expectationOther: localStorage.getItem("nwapp-create-staff-expectationOther"),
            willingToVolunteer: localStorageGetIntegerItem("nwapp-create-staff-willingToVolunteer"),
            anotherHouseholdMemberRegistered: localStorageGetIntegerItem("nwapp-create-staff-anotherHouseholdMemberRegistered"),
            totalHouseholdCount: localStorageGetIntegerItem("nwapp-create-staff-totalHouseholdCount"),
            under18YearsHouseholdCount: localStorageGetIntegerItem("nwapp-create-staff-under18YearsHouseholdCount"),
            organizationEmployeeCount: localStorageGetIntegerItem("nwapp-create-staff-under18YearsHouseholdCount"),
            organizationFoundingYear: localStorageGetIntegerItem("nwapp-create-staff-organizationFoundingYear"),
            organizationTypeOf: localStorageGetIntegerItem("nwapp-create-staff-organizationTypeOf"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onTagsSuccessFetch = this.onTagsSuccessFetch.bind(this);
        this.onHowHearSuccessFetch = this.onHowHearSuccessFetch.bind(this);
        this.onExpectationsSuccessFetch = this.onExpectationsSuccessFetch.bind(this);
        this.onMeaningSuccessFetch = this.onMeaningSuccessFetch.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Fetch all our GUI drop-down options which are populated by the API.
        const parametersMap = new Map()
        parametersMap.set("isArchived", 3)
        this.props.pullHowHearList(1,1000, parametersMap, this.onHowHearSuccessFetch);
        this.props.pullTagList(1, 1000, parametersMap, this.onTagsSuccessFetch);
        this.props.pullExpectationList(1, 1000, parametersMap, this.onExpectationsSuccessFetch);
        this.props.pullMeaningList(1,1000, parametersMap, this.onMeaningSuccessFetch);
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
        this.props.history.push("/admin/staffs/add/step-8");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTagsSuccessFetch(tags) {
        this.setState({ isTagsLoading: false, });
    }

    onHowHearSuccessFetch(howHearList) {
        this.setState({ isHowHearLoading: false, });
    }

    onExpectationsSuccessFetch(tags) {
        this.setState({ isExpectationLoading: false, });
    }

    onMeaningSuccessFetch(howHearList) {
        this.setState({ isMeaningLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        localStorage.setItem('nwapp-create-staff-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-staff-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-staff-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-staff-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-staff-"+[e.target.name];
        const storageLabelKey =  "nwapp-create-staff-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

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

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'nwapp-create-staff-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform client-side validation.
        const { errors, isValid } = validateStep7CreateInput(this.state);

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
            typeOf, isTagsLoading, tags, yearOfBirth, gender, isHowHearLoading, howDidYouHear, howDidYouHearOther,  isMeaningLoading, meaning, meaningOther, isExpectationLoading, expectation, expectationOther,
            willingToVolunteer, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount,
            organizationEmployeeCount, organizationFoundingYear, organizationTypeOf,
            errors
        } = this.state;

        const howDidYouHearOptions = getHowHearReactSelectOptions(this.props.howHearList, "howDidYouHear");
        const tagOptions = getTagReactSelectOptions(this.props.tagList, "tags");
        const meaningOptions = getMeaningReactSelectOptions(this.props.meaningList, "meaning");
        const expectationOptions = getExpectationReactSelectOptions(this.props.expectationList, "expectation");

        // // For debugging purposes only.
        // console.log("Tag Options:", tagOptions);
        // console.log("HHI Options:", howDidYouHearOptions);
        // console.log("Exp Options:", expectationOptions);
        // console.log("Mea Options:", meaningOptions);

        return (
            <AdminStaffCreateStep7Component
                typeOf={typeOf}
                isTagsLoading={isTagsLoading}
                tags={tags}
                tagOptions={tagOptions}
                yearOfBirth={yearOfBirth}
                gender={gender}
                errors={errors}
                onTextChange={this.onTextChange}
                isHowHearLoading={isHowHearLoading}
                howDidYouHear={howDidYouHear}
                howDidYouHearOptions={howDidYouHearOptions}
                howDidYouHearOther={howDidYouHearOther}
                isMeaningLoading={isMeaningLoading}
                meaning={meaning}
                meaningOptions={meaningOptions}
                meaningOther={meaningOther}
                isExpectationLoading={isExpectationLoading}
                expectation={expectation}
                expectationOptions={expectationOptions}
                expectationOther={expectationOther}
                expectationOther={expectationOther}
                willingToVolunteer={willingToVolunteer}
                anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                totalHouseholdCount={totalHouseholdCount}
                under18YearsHouseholdCount={under18YearsHouseholdCount}
                organizationEmployeeCount={organizationEmployeeCount}
                organizationFoundingYear={organizationFoundingYear}
                organizationTypeOf={organizationTypeOf}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onMultiChange={this.onMultiChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
        howHearList: store.howHearListState,
        meaningList: store.meaningListState,
        expectationList: store.expectationListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullHowHearList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullHowHearList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullMeaningList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullMeaningList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullExpectationList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullExpectationList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminStaffCreateStep7Container);
