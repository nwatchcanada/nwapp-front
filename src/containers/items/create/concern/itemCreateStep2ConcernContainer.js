import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep2ConcernComponent from "../../../../components/items/admin/create/concern/itemCreateStep2ConcernComponent";
import {
    localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateConcernInput } from "../../../../validators/itemValidator";
import { OTHER_CONCERN_TYPE_OF, CONCERN_ITEM_TYPE_OF } from "../../../../constants/api";
import { pullItemTypeList, getItemTypeReactSelectOptions } from "../../../../actions/itemTypeActions";


class ItemCreateStep2ConcernContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const parametersMap = new Map();
        // parametersMap.set("is_archived", 3); // 3 = TRUE | 2 = FALSE
        parametersMap.set("o", "-created_at");
        parametersMap.set("category", CONCERN_ITEM_TYPE_OF);

        this.onClick = this.onClick.bind(this);
    }

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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.props.history.push("/item/add/step-3-concern");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <ItemCreateStep2ConcernComponent
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        itemTypeList: store.itemTypeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullItemTypeList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullItemTypeList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep2ConcernContainer);
