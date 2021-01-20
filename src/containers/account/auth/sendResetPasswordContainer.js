import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import { camelizeKeys } from 'humps';

import { NWAPP_SEND_PASSWORD_RESET_API_URL } from '../../../constants/api';
import SendResetPasswordComponent from '../../../components/account/auth/sendResetPasswordComponent';


class SendResetPasswordContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            errors: {},
            isLoading: false,
            referrer: null,
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
        axios.post(NWAPP_SEND_PASSWORD_RESET_API_URL, {
            'email': this.state.email,
        }).then( (successResult) => {
            // const responseData = successResult.data;
            // let profile = camelizeKeys(responseData);
            console.log("Result:", successResult);
            this.setState({
                errors: {},
                isLoading: false,
                referrer: '/send-password-reset-success'
            },()=>{
                this.props.history.push("/send-password-reset-success");
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
        const { email, errors, isLoading } = this.state;
        return (
            <SendResetPasswordComponent
                email={email}
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
        // user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SendResetPasswordContainer);
