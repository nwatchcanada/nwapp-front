import React, { Component } from 'react';
import { connect } from 'react-redux';

import HowHearListComponent from "../../../../components/settings/howHear/list/howHearListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";


class HowHearListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            howHears: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterHowHears = this.filterHowHears.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        this.setState({
            howHears: [{
                'slug': 'argyle',
                'number': 1,
                'name': 'Argyle',
                'state': 'active',
                'absoluteUrl': '/settings/howHear/argyle'
            },{
                'slug': 'byron',
                'number': 2,
                'name': 'Byron',
                'state': 'active',
                'absoluteUrl': '/settings/howHear/byron'
            },{
                'slug': 'carling',
                'number': 3,
                'name': 'Carling',
                'state': 'active',
                'absoluteUrl': '/settings/howHear/carling'
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

    filterHowHears() {
        let filteredHowHears = [];
        if (this.state.howHears === undefined || this.state.howHears === null) {
            return [];
        }
        for (let i = 0; i < this.state.howHears.length; i++) {
            let howHear = this.state.howHears[i];
            if (howHear.state === this.state.filter) {
                filteredHowHears.push(howHear);
            }
        }
        return filteredHowHears;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <HowHearListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                howHears={this.filterHowHears()}
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
)(HowHearListContainer);
