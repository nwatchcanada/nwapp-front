import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminMemberCreateStep1Component from "../../../../components/members/admin/create/adminCreateStep1Component";
import { validateStep1CreateInput } from "../../../../validators/memberValidator";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';


class AdminMemberCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
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
        localStorageSetObjectOrArrayItem("nwapp-create-member-search-criteria", this.state);
        this.props.history.push("/admin/members/add/step-2");
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
        const key = "nwapp-create-member-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep1CreateInput(this.state);

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
        const { name, errors } = this.state;
        return (
            <AdminMemberCreateStep1Component
                name={name}
                errors={errors}
                onTextChange={this.onTextChange}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberCreateStep1Container);
