import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import { Redirect } from "react-router-dom";
import { camelizeKeys } from 'humps';

import { NWAPP_PASSWORD_RESET_API_URL } from '../../../constants/api';
import ResetPasswordComponent from '../../../components/account/auth/resetPasswordComponent';
// import { postResetPassword } from '../../../actions/resetPasswordAction';


class ResetPasswordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordConfirmation: '',
            accessCode: this.props.match.params.code,
            errors: {},
            isLoading: false,
            wasSubmitOK: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidMount() {
        // When this component loads up, we want to clear any previous errors
        // returned in the state so do so now.
        if (this.props.user.errors !== undefined && this.props.user.errors !== null) {
            var keyCount = Object.keys(this.props.user.errors).length;
            if (keyCount > 0) {
                this.props.clearRegister();
            }
        }
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
        // this.props.clearFlashMessage();
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true, })
        axios.post(NWAPP_PASSWORD_RESET_API_URL, {
            'password': this.state.password,
            'password_repeat': this.state.passwordConfirmation,
            'pr_access_code': this.state.accessCode,
        }).then( (successResult) => {
            // const responseData = successResult.data;
            // let profile = camelizeKeys(responseData);
            console.log("Result:", successResult);
            this.setState({
                errors: {},
                isLoading: false,
                referrer: '/send-password-reset-success'
            },()=>{
                this.props.history.push("/reset-password-success");
            })
        }).catch( (errorResult) => {
            const responseData = errorResult.response.data;
            let errors = camelizeKeys(responseData);

            this.setState({
                errors: errors,
                isLoading: false,
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

        }).then( () => {
            // Do nothing.
        });
    }

    render () {
        const { password, passwordConfirmation, accessCode, errors, isLoading, wasSubmitOK } = this.state;
        const { user } = this.props;

        // The following code will check to see what the user details are and
        // if we have a "Your account was been registered" text has been
        // detected then we move the user to the success page.
        if (wasSubmitOK) {
            if (user !== undefined && user !== null) {
                const userLength = Object.keys(user).length;
                if (userLength > 0) {
                    return <Redirect to={"/reset-password-success"} />;
                }
            }
        }

        return (
            <ResetPasswordComponent
                password={password}
                passwordConfirmation={passwordConfirmation}
                accessCode={accessCode}
                errors={errors}
                isLoading={isLoading}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // postResetPassword: (formData, successCallback, failureCallback) => {
        //     dispatch(postResetPassword(formData, successCallback, failureCallback))
        // },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordContainer);
