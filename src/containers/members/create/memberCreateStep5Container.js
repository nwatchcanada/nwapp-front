import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import MemberCreateStep5Component from "../../../components/members/create/memberCreateStep5Component";
import { validateStep5CreateInput } from "../../../validators/memberValidator";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetDateItem
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class MemberCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("temp-create-member-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/members/add/step-2-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/members/add/step-2-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            dobObj: localStorageGetDateItem("temp-create-member-dobObj"),
            howDidYouHear: localStorage.getItem("temp-create-member-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('temp-create-member-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("temp-create-member-howDidYouHearOther"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onDOBDateTimeChange = this.onDOBDateTimeChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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

    onSuccessfulSubmissionCallback(member) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/members/add/step-6");
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
        })
        localStorage.setItem('temp-create-member-'+[e.target.name], e.target.value);
    }

    onDOBDateTimeChange(dateObj) {
        this.setState({
            dobObj: dateObj,
        })
        localStorageSetObjectOrArrayItem('temp-create-member-dobObj', dateObj);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('temp-create-member-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('temp-create-member-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

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
        const { returnURL, dobObj, howDidYouHear, howDidYouHearOther, errors } = this.state;
        const howDidYouHearOptions = [
            {
                selectName: "howDidYouHear",
                value: "Friend",
                label: "Friend"
            },{
                selectName: "howDidYouHear",
                value: "Workplace",
                label: "Workplace"
            },{
                selectName: "howDidYouHear",
                value: "Social Media",
                label: "Social Media"
            },{
                selectName: "howDidYouHear",
                value: "Family",
                label: "Family"
            },{
                selectName: "howDidYouHear",
                value: "Internt",
                label: "Internet"
            },{
                selectName: "howDidYouHear",
                value: "Other",
                label: "Other"
            }
        ];
        return (
            <MemberCreateStep5Component
                returnURL={returnURL}
                dobObj={dobObj}
                errors={errors}
                onTextChange={this.onTextChange}
                onDOBDateTimeChange={this.onDOBDateTimeChange}
                howDidYouHear={howDidYouHear}
                howDidYouHearOptions={howDidYouHearOptions}
                howDidYouHearOther={howDidYouHearOther}
                onSelectChange={this.onSelectChange}
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
)(MemberCreateStep5Container);
