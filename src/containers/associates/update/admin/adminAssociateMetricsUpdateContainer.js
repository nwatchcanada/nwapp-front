import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAssociateMetricsUpdateComponent from "../../../../components/associates/update/admin/adminAssociateMetricsUpdateComponent";
import { validateStep7CreateInput } from "../../../../validators/memberValidator";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { getHowHearReactSelectOptions } from "../../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../../actions/tagActions";
import { getMeaningReactSelectOptions } from "../../../../actions/meaningAction";
import { getExpectationReactSelectOptions } from "../../../../actions/expectationAction";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


class AdminAssociateMetricsUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-create-member-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/members/add/step-4-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/members/add/step-4-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            tags: localStorageGetArrayItem("nwapp-create-member-tags"),
            birthYear: localStorage.getItem("nwapp-create-member-birthYear"),
            gender: parseInt(localStorage.getItem("nwapp-create-member-gender")),
            howDidYouHear: localStorage.getItem("nwapp-create-member-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-create-member-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-create-member-howDidYouHearOther"),
            meaning: localStorage.getItem("nwapp-create-member-meaning"),
            meaningOther: localStorage.getItem("nwapp-create-member-meaningOther"),
            expectation: localStorage.getItem("nwapp-create-member-expectation"),
            expectationOther: localStorage.getItem("nwapp-create-member-expectationOther"),
            willingToVolunteer: parseInt(localStorage.getItem("nwapp-create-member-willingToVolunteer")),
            anotherHouseholdMemberRegistered: parseInt(localStorage.getItem("nwapp-create-member-anotherHouseholdMemberRegistered")),
            totalHouseholdCount: parseInt(localStorage.getItem("nwapp-create-member-totalHouseholdCount")),
            under18YearsHouseholdCount: parseInt(localStorage.getItem("nwapp-create-member-under18YearsHouseholdCount")),
            companyEmployeeCount: parseInt(localStorage.getItem("nwapp-create-member-under18YearsHouseholdCount")),
            companyYearsInOperation: parseInt(localStorage.getItem("nwapp-create-member-companyYearsInOperation")),
            companyType: localStorage.getItem("nwapp-create-member-companyType"),
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
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // TODO: REPLACE THE FOLLOWING CODE WITH API ENDPOINT CALLING.
        this.setState({
            howDidYouHearData: {
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
            },
            meaningData: {
                results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                    name: 'Crime & Safety Resources',
                    slug: "2"
                },{
                    name: 'Greater access to Police services',
                    slug: "3"
                },{
                    name: 'Community Events',
                    slug: "4"
                },{
                    name: 'Volunteer opportunities',
                    slug: "5"
                },{
                    name: 'Other',
                    slug: "1"
                }]
            },
            expectationData: {
                results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                    name: 'Some reason #1',
                    slug: "2"
                },{
                    name: 'Some reason #2',
                    slug: "3"
                },{
                    name: 'Some reason #3',
                    slug: "4"
                },{
                    name: 'Some reason #4',
                    slug: "5"
                },{
                    name: 'Other',
                    slug: "1"
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

    onSuccessfulSubmissionCallback(member) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/members/add/step-8");
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        localStorage.setItem('nwapp-create-member-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-member-'+[option.selectName].toString(), option.value);
        localStorage.setItem('nwapp-create-member-'+[option.selectName].toString()+"Label", option.label);
        localStorageSetObjectOrArrayItem('nnwapp-create-member-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-member-"+[e.target.name];
        const storageLabelKey =  "nwapp-create-member-"+[e.target.name].toString()+"-label";
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
        const key = 'nwapp-create-member-' + args[1].name;
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
            typeOf, returnURL, tags, birthYear, gender, howDidYouHear, howDidYouHearOther, meaning, meaningOther, expectation, expectationOther,
            willingToVolunteer, anotherHouseholdMemberRegistered, totalHouseholdCount, under18YearsHouseholdCount,
            companyEmployeeCount, companyYearsInOperation, companyType,
            errors
        } = this.state;

        const howDidYouHearOptions = getHowHearReactSelectOptions(this.state.howDidYouHearData, "howDidYouHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");
        const meaningOptions = getMeaningReactSelectOptions(this.state.meaningData, "meaning");
        const expectationOptions = getMeaningReactSelectOptions(this.state.expectationData, "expectation");

        return (
            <AdminAssociateMetricsUpdateComponent
                typeOf={typeOf}
                returnURL={returnURL}
                tags={tags}
                tagOptions={tagOptions}
                birthYear={birthYear}
                gender={gender}
                errors={errors}
                onTextChange={this.onTextChange}
                howDidYouHear={howDidYouHear}
                howDidYouHearOptions={howDidYouHearOptions}
                howDidYouHearOther={howDidYouHearOther}
                meaning={meaning}
                meaningOptions={meaningOptions}
                meaningOther={meaningOther}
                expectation={expectation}
                expectationOptions={expectationOptions}
                expectationOther={expectationOther}
                willingToVolunteer={willingToVolunteer}
                anotherHouseholdMemberRegistered={anotherHouseholdMemberRegistered}
                totalHouseholdCount={totalHouseholdCount}
                under18YearsHouseholdCount={under18YearsHouseholdCount}
                companyEmployeeCount={companyEmployeeCount}
                companyYearsInOperation={companyYearsInOperation}
                companyType={companyType}
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
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateMetricsUpdateContainer);
