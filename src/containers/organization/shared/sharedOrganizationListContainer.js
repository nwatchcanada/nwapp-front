import React, { Component } from 'react';

import SharedOrganizationListComponent from "../../../components/organizations/shared/sharedOrganizationListComponent";


class SharedOrganizationListContainer extends Component {
    render() {
        // Return our GUI.
        const sampleData = [
            {
                "schema": "london",
                "name": "City of London Neigbhourhood Watch",
                "absoluteUrl": "http://london."+process.env.REACT_APP_DOMAIN+"/dashboard"
            },{
                "schema": "toronto",
                "name": "City of Toronto Neigbhourhood Watch",
                "absoluteUrl": "http://toronto."+process.env.REACT_APP_DOMAIN+"/dashboard"
            }
        ]
        return (
            <SharedOrganizationListComponent
                tableData={sampleData}
            />
        );
    }
}

export default SharedOrganizationListContainer;
