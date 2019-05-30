import React, { Component } from 'react';

import RegisterComponent from "../../components/account/registerComponent";


class RegisterContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        return (
            <RegisterComponent />
        );
    }
}

export default RegisterContainer;
