import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import RegisterStep6Component from "../../../components/account/register/registerStep6Component";
import { validateStep6CreateInput } from "../../../validators/registerValidator";
import { localStorageGetBooleanItem } from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class RegisterStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-register-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/register/step-2-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/register/step-2-biz";
        }

        const agreement = localStorageGetBooleanItem("nwapp-register-agreement");

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            agreement: agreement,
            errors: {},
            isLoading: false
        }

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
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
        this.props.history.push("/register/step-7");
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

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
        localStorage.setItem('nwapp-register-'+[e.target.name], e.target.checked);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep6CreateInput(this.state);

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
        const { returnURL, errors, agreement } = this.state;

        return (
            <RegisterStep6Component
                agreement={agreement}
                returnURL={returnURL}
                errors={errors}
                onCheckboxChange={this.onCheckboxChange}
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
)(RegisterStep6Container);
