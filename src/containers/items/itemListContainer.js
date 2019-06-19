import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemListComponent from "../../components/items/itemListComponent";
import { clearFlashMessage } from "../../actions/flashMessageActions";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../constants/api";


class ItemListContainer extends Component {
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
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'typeOf': INCIDENT_ITEM_TYPE_OF,
            'absoluteUrl': '/item/argyle'
        },{
            'slug': 'byron',
            'number': 2,
            'name': 'Byron',
            'typeOf': EVENT_ITEM_TYPE_OF,
            'absoluteUrl': '/item/byron'
        },{
            'slug': 'carling',
            'number': 3,
            'name': 'Carling',
            'typeOf': CONCERN_ITEM_TYPE_OF,
            'absoluteUrl': '/item/carling'
        },{
            'slug': 'darlyn',
            'number': 4,
            'name': 'Darlyn',
            'typeOf': INFORMATION_ITEM_TYPE_OF,
            'absoluteUrl': '/item/darlyn'
        }];
        return (
            <ItemListComponent
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
)(ItemListContainer);
