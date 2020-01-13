import React, { Component } from 'react';
import { connect } from 'react-redux';

import DistrictSearchResultComponent from "../../../../components/settings/districts/search/districtSearchResultComponent";


class DistrictSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */
    constructor(props) {
        super(props)

        this.state = {
            results: [],
            errors: {},
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

        this.setState({
            results: [{
                'slug': 'argyle',
                'icon': 'building',
                'number': 1,
                'name': 'Argyle (Biz)',
                'state': 'active',
                'typeOf': 'residential',
                'absoluteUrl': '/settings/district-biz/argyle'
            },{
                'slug': 'byron',
                'icon': 'university',
                'number': 2,
                'name': 'Byron (Com)',
                'state': 'active',
                'typeOf': 'business',
                'absoluteUrl': '/settings/district-cc/byron'
            },{
                'slug': 'carling',
                'icon': 'home',
                'number': 3,
                'name': 'Carling (Rez)',
                'state': 'active',
                'typeOf': 'community-cares',
                'absoluteUrl': '/settings/district-rez/carling'
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
        return (
            <DistrictSearchResultComponent
                results={this.state.results}
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
)(DistrictSearchResultContainer);
