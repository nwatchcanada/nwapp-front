import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import ItemRetrieveComponent from "../../../../components/items/admin/retrieve/itemRetrieveComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullItem } from '../../../../actions/itemActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class ItemRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const item = localStorageGetObjectItem("nwapp-admin-retrieve-item-"+slug.toString() );
        const isLoading = isEmpty(item);

        // Update state.
        this.state = {
            slug: slug,
            item: item,
            isLoading: isLoading,
        }

        this.onClick = this.onClick.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullItem(
            this.state.slug,
            this.onSuccessCallback,
            this.onFailureCallback
        );
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

     onSuccessCallback(response) {
         console.log("onSuccessCallback |", response);
         this.setState({ isLoading: false, item: response, });

         // The following code will save the object to the browser's local
         // storage to be retrieved later more quickly.
         localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-item-"+this.state.slug.toString(), response);
     }

     onFailureCallback(errors) {
         console.log("onFailureCallback | errors:", errors);
     }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

    }

    onArchiveClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/admin/item/"+this.state.slug+"/archive");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, isLoading } = this.state;
        const item = isEmpty(this.state.item) ? {} : this.state.item;
        return (
            <ItemRetrieveComponent
                slug={slug}
                item={item}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        item: store.itemDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullItem: (slug, successCallback, failedCallback) => {
            dispatch(pullItem(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemRetrieveContainer);
