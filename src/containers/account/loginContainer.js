import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import { EXECUTIVE_GROUP_ID } from '../../constants/api';
import LoginComponent from '../../components/account/loginComponent';
import validateInput from "../../validators/loginValidator";
import { postLogin } from "../../actions/loginAction";
import { clearFlashMessage } from "../../actions/flashMessageActions";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '../../helpers/tokenUtility';


class LoginContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors: {},
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Function will redirect the user, using the browsers redirect function,
     *  to the user's respected dashboard belonging to the tenant they belong to.
     */
    onSuccessfulSubmissionCallback(profile) {
        this.setState({ errors: {}, });
        const { schema, groupMembershipId } = profile;
        if (groupMembershipId === EXECUTIVE_GROUP_ID) {
            const location = process.env.REACT_APP_PROTOCOL + "://" + process.env.REACT_APP_DOMAIN + "/organizations";
            window.location = location; // Do not use `react-router-dom` library.
        } else {
            const accessToken = getAccessTokenFromLocalStorage();
            const refreshToken = getRefreshTokenFromLocalStorage();
            const location = process.env.REACT_APP_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_DOMAIN + "/dashboard-redirect/"+accessToken.token+"/"+accessToken.expires+"/"+refreshToken.token;
            window.location = location; // Do not use `react-router-dom` library.
        }
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false,
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

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Clear any and all flash messages in our queue to be rendered.
            this.props.clearFlashMessage();

            this.setState({ errors: {}, isLoading: true, })
            this.props.postLogin(
                this.state.email,
                this.state.password,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

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
        const { email, password, errors, isLoading } = this.state;
        return (
            <LoginComponent
                email={email}
                password={password}
                errors={errors}
                isLoading={isLoading}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
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
        postLogin: (email, password, successCallback, failureCallback) => {
            dispatch(postLogin(email, password, successCallback, failureCallback))
        },
        // attemptLoginRestForm: () => {
        //     dispatch(attemptLoginRestForm())
        // },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
