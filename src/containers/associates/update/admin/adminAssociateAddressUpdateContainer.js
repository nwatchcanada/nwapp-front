import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAssociateAddressUpdateComponent from "../../../../components/associates/update/admin/adminAssociateAddressUpdateComponent";
import { validateStep4BizCreateInput } from "../../../../validators/memberValidator";
import { BUSINESS_TYPE_OF } from '../../../../constants/api';


class MemberCreateStep4BizContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        this.state = {
            companyName: localStorage.getItem("nwapp-create-member-biz-companyName"),
            contactFirstName: localStorage.getItem("nwapp-create-member-biz-contactFirstName"),
            contactLastName: localStorage.getItem("nwapp-create-member-biz-contactLastName"),
            primaryPhone: localStorage.getItem("nwapp-create-member-biz-primaryPhone"),
            secondaryPhone: localStorage.getItem("nwapp-create-member-biz-secondaryPhone"),
            email: localStorage.getItem("nwapp-create-member-biz-email"),
            errors: {},
            isLoading: false,
            slug: slug,
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

        // DEVELOPERS NOTE:
        // Since we are in this page, we need to assign the user to be
        // a business type user.
        localStorage.setItem("nwapp-create-member-typeOf", BUSINESS_TYPE_OF);
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
        this.props.setFlashMessage("success", "Associate has been successfully updated.");
        this.props.history.push("/associate/"+this.state.id+"/full");
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
        const key = "nwapp-create-member-biz-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep4BizCreateInput(this.state);

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
        const { companyName, contactFirstName, contactLastName, primaryPhone, secondaryPhone, email, errors, slug } = this.state;
        return (
            <AdminAssociateAddressUpdateComponent
                companyName={companyName}
                contactFirstName={contactFirstName}
                contactLastName={contactLastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                slug={slug}
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
)(MemberCreateStep4BizContainer);
