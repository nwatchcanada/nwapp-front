import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminStaffChangePasswordComponent from "../../../../components/staffs/admin/operations/adminStaffChangePasswordComponent";
import { validateChangePasswordOperationInput } from "../../../../validators/staffValidator";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { putStaffChangePasswordOperation } from '../../../../actions/staffActions';


class AdminStaffChangePasswordContainer extends Component {
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
            slug: slug,
            givenName: this.props.staffDetail.givenName,
            lastName: this.props.staffDetail.lastName,
            password: "",
            repeatPassword: "",
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.staff = this.state.slug;

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
        this.props.setFlashMessage("success", "Staff password has been successfully updated.");
        this.props.history.push("/admin/staff/"+this.state.slug+"/operations");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
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
        // Update our state.
        this.setState({
            [e.target.name]: e.target.value,
        });

        // Update our persistent storage.
        const key = "nwapp-create-staff-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateChangePasswordOperationInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ isLoading: true, errors:{} }, ()=>{
                this.props.putStaffChangePasswordOperation(
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
            slug, givenName, lastName, description, policeCheck, password,
            repeatPassword, errors, isLoading, returnURL
        } = this.state;

        const { user } = this.props;
        return (
            <AdminStaffChangePasswordComponent
                slug={slug}
                givenName={givenName}
                lastName={lastName}

                password={password}
                repeatPassword={repeatPassword}
                onTextChange={this.onTextChange}

                onNextClick={this.onNextClick}
                errors={errors}
                returnURL={returnURL}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        staffDetail: store.staffDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putStaffChangePasswordOperation: (postData, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffChangePasswordOperation(postData, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminStaffChangePasswordContainer);
