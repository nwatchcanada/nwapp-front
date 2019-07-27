import React, { Component } from 'react';
import { connect } from 'react-redux';

import DistrictListComponent from "../../../../components/settings/districts/list/districtListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";


class DistrictListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            districts: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterDistricts = this.filterDistricts.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        const districts = [{
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
        }];
        this.setState({
            districts: districts,
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

    filterDistricts() {
        let filteredDistricts = [];
        if (this.state.districts === undefined || this.state.districts === null) {
            return [];
        }
        for (let i = 0; i < this.state.districts.length; i++) {
            let district = this.state.districts[i];
            if (district.state === this.state.filter) {
                filteredDistricts.push(district);
            }
        }
        return filteredDistricts;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <DistrictListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                districts={this.filterDistricts()}
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
)(DistrictListContainer);
