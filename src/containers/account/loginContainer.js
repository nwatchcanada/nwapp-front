import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import LoginComponent from '../../components/account/loginComponent';
import validateInput from "../../validators/loginValidator";
// import { attemptLoginRestForm, attemptLogin } from "../../actions/loginAction";
import { clearFlashMessage } from "../../actions/flashMessageActions";


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

    onSuccessfulSubmissionCallback() {
        this.setState({ errors: {}, });
        alert("TODO");
        // this.props.history.push(this.props.productionDetail.absoluteUrl+"/inspection");
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
        // attemptLogin: (email, password) => {
        //     dispatch(attemptLogin(email, password))
        // },
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
