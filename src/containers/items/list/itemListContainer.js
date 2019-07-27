import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemListComponent from "../../../components/items/list/itemListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


class ItemListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            filter: "active",
            items: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
        this.filterItems = this.filterItems.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Load from API...
        const items = [{
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
        }];
        this.setState({
            items: items,
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

    filterItems() {
        let filteredItems = [];
        if (this.state.items === undefined || this.state.items === null) {
            return [];
        }
        for (let i = 0; i < this.state.items.length; i++) {
            let item = this.state.items[i];
            if (item.state === this.state.filter) {
                filteredItems.push(item);
            }
        }
        return filteredItems;
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <ItemListComponent
                filter={this.state.filter}
                onFilterClick={this.onFilterClick}
                items={this.filterItems()}
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
