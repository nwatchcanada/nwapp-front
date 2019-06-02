import React, { Component } from 'react';

import DistrictsListComponent from "../../components/districts/districtsListComponent";


class DistrictsListContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        return (
            <DistrictsListComponent />
        );
    }
}

export default DistrictsListContainer;
