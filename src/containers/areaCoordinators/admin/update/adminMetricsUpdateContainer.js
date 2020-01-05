import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorMetricUpdateComponent from "../../../../components/areaCoordinators/admin/update/adminMetricsUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateStep7CreateInput } from "../../../../validators/areaCoordinatorValidator";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../../actions/howHearActions";
import { getMeaningReactSelectOptions, pullMeaningList } from "../../../../actions/meaningActions";
import { getExpectationReactSelectOptions, pullExpectationList } from "../../../../actions/expectationActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../../actions/tagActions";
import { putAreaCoordinatorMetricsDetail } from "../../../../actions/areaCoordinatorActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


class AdminAreaCoordinatorMetricUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        const transcodedTags = getPickedTagReactSelectOptions(this.props.areaCoordinatorDetail.tags, this.props.tagList)
        const anotherHouseholdMemberRegistered = this.props.areaCoordinatorDetail.anotherHouseholdMemberRegistered === true ? 1 : 0;

        this.state = {
            slug: slug,
            typeOf: this.props.areaCoordinatorDetail.typeOf,
            isTagsLoading: true,
            tags: transcodedTags,
            yearOfBirth: this.props.areaCoordinatorDetail.yearOfBirth,
            gender: this.props.areaCoordinatorDetail.gender,
            isHowHearLoading: true,
            howDidYouHear: this.props.areaCoordinatorDetail.howDidYouHear,
            // howDidYouHearOption: localStorageGetObjectItem('nwapp-create-areaCoordinator-howDidYouHearOption'),
            howDidYouHearOther: this.props.areaCoordinatorDetail.howDidYouHearOther,
            isMeaningLoading: true,
            meaning: this.props.areaCoordinatorDetail.meaning,
            meaningOther: this.props.areaCoordinatorDetail.meaningOther,
            isExpectationLoading: true,
            expectation: this.props.areaCoordinatorDetail.expectation,
            expectationOther: this.props.areaCoordinatorDetail.expectationOther,
            willingToVolunteer: this.props.areaCoordinatorDetail.willingToVolunteer,
            anotherHouseholdMemberRegistered: anotherHouseholdMemberRegistered,
            totalHouseholdCount: this.props.areaCoordinatorDetail.totalHouseholdCount,
            under18YearsHouseholdCount: this.props.areaCoordinatorDetail.under18YearsHouseholdCount,
            organizationEmployeeCount: this.props.areaCoordinatorDetail.organizationEmployeeCount,
            organizationFoundingYear: this.props.areaCoordinatorDetail.organizationFoundingYear,
            organizationTypeOf: this.props.areaCoordinatorDetail.organizationTypeOf,
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
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
            postData.streetDirection = 0;
        }

        // BUGFIX: Phone numbers
        // postData.primaryPhone = this.state.primaryPhone.replace("+1 ", "").replace("(", "").replace(")", "").replace("-", "").replace(" ", "")
        // postData.primaryPhone = this.state.primaryPhone.replace("+1 ", "")

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

        try { // Convert to boolean type.
            postData.anotherHouseholdMemberRegistered = parseInt(this.state.anotherHouseholdMemberRegistered) === 1;
        } catch (error) {} // Do nothing.

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

    onSuccessfulSubmissionCallback(areaCoordinator) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Area coordinator has been successfully updated.");
        this.props.history.push("/admin/area-coordinator/"+this.state.slug+"/full");
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
        localStorage.setItem('nwapp-create-areaCoordinator-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-areaCoordinator-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-areaCoordinator-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-areaCoordinator-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-areaCoordinator-"+[e.target.name];
        const storageLabelKey =  "nwapp-create-areaCoordinator-"+[e.target.name].toString()+"-label";
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
        const key = 'nwapp-create-areaCoordinator-' + args[1].name;
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
            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putAreaCoordinatorMetricsDetail(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailedSubmissionCallback
                );
            });

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
            <AdminAreaCoordinatorMetricUpdateComponent
                slug={this.state.slug}
                areaCoordinator={this.props.areaCoordinatorDetail}
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
                anotherHouseholdMemberRegistered={parseInt(anotherHouseholdMemberRegistered)}
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
        areaCoordinatorDetail: store.areaCoordinatorDetailState,
        tagList: store.tagListState,
        howHearList: store.howHearListState,
        meaningList: store.meaningListState,
        expectationList: store.expectationListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
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
        putAreaCoordinatorMetricsDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putAreaCoordinatorMetricsDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorMetricUpdateContainer);
