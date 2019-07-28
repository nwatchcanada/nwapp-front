import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResourceListComponent from "../../../../components/settings/resources/list/resourceListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../constants/api";


class ResourceListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            resources: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterResources = this.filterResources.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        this.setState({
            resources: [{
                'slug': 'argyle',
                'number': 1,
                'name': 'Argyle',
                'category': 'Emergency',
                'typeOf': LINK_RESOURCE_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/settings/resource/argyle'
            },{
                'slug': 'byron',
                'number': 2,
                'name': 'Byron',
                'category': 'Municipal',
                'typeOf': YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/settings/resource/byron'
            },{
                'slug': 'carling',
                'number': 3,
                'name': 'Carling',
                'category': 'Housing',
                'typeOf': IMAGE_RESOURCE_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/settings/resource/carling'
            },{
                'slug': 'darlyn',
                'number': 4,
                'name': 'Darlyn',
                'category': 'Housing',
                'typeOf': FILE_RESOURCE_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/settings/resource/darlyn'
            }],
        });
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

    onFilterClick(e, filter) {
        e.preventDefault();
        this.setState({
            filter: filter,
        })
    }

    filterResources() {
        let filteredResources = [];
        if (this.state.resources === undefined || this.state.resources === null) {
            return [];
        }
        for (let i = 0; i < this.state.resources.length; i++) {
            let resource = this.state.resources[i];
            if (resource.state === this.state.filter) {
                filteredResources.push(resource);
            }
        }
        return filteredResources;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <ResourceListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                resources={this.filterResources()}
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
)(ResourceListContainer);
