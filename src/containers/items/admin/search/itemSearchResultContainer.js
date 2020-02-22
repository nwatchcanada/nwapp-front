import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemSearchResultComponent from "../../../../components/items/admin/search/itemSearchResultComponent";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../../constants/api";


class ItemSearchResultContainer extends Component {
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
                'icon': 'fire',
                'number': 1,
                'name': 'Argyle',
                'typeOf': INCIDENT_ITEM_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/item/argyle'
            },{
                'slug': 'byron',
                'icon': 'glass-cheers',
                'number': 2,
                'name': 'Byron',
                'typeOf': EVENT_ITEM_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/item/byron'
            },{
                'slug': 'carling',
                'icon': 'exclamation-circle',
                'number': 3,
                'name': 'Carling',
                'typeOf': CONCERN_ITEM_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/item/carling'
            },{
                'slug': 'darlyn',
                'icon': 'info-circle',
                'number': 4,
                'name': 'Darlyn',
                'typeOf': INFORMATION_ITEM_TYPE_OF,
                'state': 'active',
                'absoluteUrl': '/item/darlyn'
            }]
        })
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
            <ItemSearchResultComponent
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
)(ItemSearchResultContainer);
