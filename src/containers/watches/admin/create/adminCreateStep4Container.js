import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminWatchCreateStep4Component from "../../../../components/watches/admin/create/adminCreateStep4Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from "../../../../constants/api";
import {
    localStorageGetIntegerItem,
    localStorageSetObjectOrArrayItem,
    localStorageRemoveItemsContaining,
    localStorageGetArrayItem,
    localStorageGetObjectItem
} from '../../../../helpers/localStorageUtility';
import { postWatch } from "../../../../actions/watchActions";


class AdminWatchCreateStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            isLoading: false,

            typeOf: localStorageGetIntegerItem("nwapp-watch-typeOf"),
            tags: localStorageGetArrayItem("nwapp-watch-tags"),
            name: localStorage.getItem('nwapp-watch-name'),
            description: localStorage.getItem('nwapp-watch-description'),
            associate: localStorage.getItem('nwapp-watch-associate'),
            associateOption: localStorageGetObjectItem('nwapp-watch-associateOption'),
            district: localStorage.getItem('nwapp-watch-district'),
            districtOption: localStorageGetObjectItem('nwapp-watch-districtOption'),
            streetMembership: localStorageGetArrayItem('nwapp-watch-streetMembership'),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (3) Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                this.props.setFlashMessage("success", "Watch has been successfully created.");
                localStorageRemoveItemsContaining("nwapp-watch-");
                this.props.history.push("/admin/watches");
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false,
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        e.preventDefault();

        this.setState({
            errors: {},
            isLoading: true,
        }, ()=>{
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.postWatch(
                this.getPostData(),
                this.onSuccessCallback,
                this.onFailureCallback
            );
        });
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            name, errors, isLoading
        } = this.state;
        return (
            <AdminWatchCreateStep4Component
                name={name}
                errors={errors}
                onClick={this.onClick}
                onDrop={this.onDrop}
                isLoading={isLoading}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postWatch: (postData, successCallback, failedCallback) => {
            dispatch(postWatch(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchCreateStep4Container);
