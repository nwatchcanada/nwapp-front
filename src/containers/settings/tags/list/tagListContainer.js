import React, { Component } from 'react';
import { connect } from 'react-redux';

import TagListComponent from "../../../../components/settings/tags/list/tagListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";


class TagListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            tags: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterTags = this.filterTags.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        this.setState({
            tags: [{
                'slug': 'Argyle',
                'number': 1,
                'name': 'Argyle',
                'state': 'active',
                'absoluteUrl': '/settings/tag/argyle'
            },{
                'slug': 'byron',
                'number': 2,
                'name': 'Byron',
                'state': 'active',
                'absoluteUrl': '/settings/tag/byron'
            },{
                'slug': 'carling',
                'number': 3,
                'name': 'Carling',
                'state': 'active',
                'absoluteUrl': '/settings/tag/carling'
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

    filterTags() {
        let filteredTags = [];
        if (this.state.tags === undefined || this.state.tags === null) {
            return [];
        }
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            if (tag.state === this.state.filter) {
                filteredTags.push(tag);
            }
        }
        return filteredTags;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <TagListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                tags={this.filterTags()}
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
)(TagListContainer);
