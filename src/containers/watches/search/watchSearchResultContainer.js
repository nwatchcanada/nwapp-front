import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchSearchResultComponent from "../../../components/watches/search/watchSearchResultComponent";


class WatchSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            watches: [],
        }
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        this.setState({
            watches: [{
                'slug': 'argyle',
                'icon': 'home',
                'name': "Argyle",
                'district': "Capital",
                "typeOf": "active",
            },{
                'slug': 'byron',
                'icon': 'building',
                'name': "Byron",
                'district': "District 13",
                "typeOf": "active",
            },{
                'slug': 'carling',
                'icon': 'university',
                'name': "Carling",
                'district': "District 10",
                "typeOf": "active",
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
        const { watches } = this.state;
        if ( watches === null || watches === undefined ) {
            return (null);
        }
        return (
            <WatchSearchResultComponent
                watches={watches}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchSearchResultContainer);
