import React, { Component } from 'react';

import DistrictsListComponent from "../../components/districts/districtsListComponent";


class DistrictsListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

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
        },{
            'slug': 'carling',
            'number': 3,
            'name': 'Carling',
            'absoluteUrl': '/district/carling'
        }];
        return (
            <DistrictsListComponent
                tableData={tableData}
            />
        );
    }
}

export default DistrictsListContainer;
