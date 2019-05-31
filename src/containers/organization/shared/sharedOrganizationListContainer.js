import React, { Component } from 'react';
import { connect } from 'react-redux';

import SharedOrganizationListComponent from "../../../components/organizations/shared/sharedOrganizationListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


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
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        // device: store.deviceState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // pullDevice: (user, deviceSlug) => {
        //     dispatch(
        //         pullDevice(user, deviceSlug)
        //     )
        // },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationListContainer);
