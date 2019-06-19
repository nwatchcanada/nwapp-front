import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResourcesListComponent from "../../../components/settings/resources/resourceListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../constants/api";


class ResourcesListContainer extends Component {
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

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
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
            'slug': 'argyle',
            'number': 1,
            'name': 'Argyle',
            'category': 'Emergency',
            'typeOf': LINK_RESOURCE_TYPE_OF,
            'absoluteUrl': '/settings/resource/argyle'
        },{
            'slug': 'byron',
            'number': 2,
            'name': 'Byron',
            'category': 'Municipal',
            'typeOf': YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
            'absoluteUrl': '/settings/resource/byron'
        },{
            'slug': 'carling',
            'number': 3,
            'name': 'Carling',
            'category': 'Housing',
            'typeOf': IMAGE_RESOURCE_TYPE_OF,
            'absoluteUrl': '/settings/resource/carling'
        },{
            'slug': 'darlyn',
            'number': 4,
            'name': 'Darlyn',
            'category': 'Housing',
            'typeOf': FILE_RESOURCE_TYPE_OF,
            'absoluteUrl': '/settings/resource/darlyn'
        }];
        return (
            <ResourcesListComponent
                tableData={tableData}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourcesListContainer);
