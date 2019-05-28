import React, { Component } from 'react';

import HomeComponent from "../../components/general/homeComponent";


class HomeContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        return (
            <HomeComponent />
        );
    }
}

export default HomeContainer;
