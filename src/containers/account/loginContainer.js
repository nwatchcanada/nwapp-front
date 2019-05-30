import React, { Component } from 'react';

import LoginComponent from "../../components/account/loginComponent";


class LoginContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        return (
            <LoginComponent />
        );
    }
}

export default LoginContainer;
