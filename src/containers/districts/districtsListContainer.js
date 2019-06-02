import React, { Component } from 'react';

import DistrictsListComponent from "../../components/districts/districtsListComponent";


class DistrictsListContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        const tableData = [{
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'absoluteUrl': '/district/argyle'
        },{
            'slug': 'byron',
            'number': 2,
            'name': 'Byron',
            'absoluteUrl': '/district/byron'
        }];
        return (
            <DistrictsListComponent
                tableData={tableData}
            />
        );
    }
}

export default DistrictsListContainer;
