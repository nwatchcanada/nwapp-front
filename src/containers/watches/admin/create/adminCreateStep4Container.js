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
    localStorageRemoveItemsContaining
} from '../../../../helpers/localStorageUtility';
import { postHowHear } from "../../../../actions/howHearActions";
import { validateInput } from '../../../../validators/howHearValidator';


class AdminWatchCreateStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            text: localStorage.getItem('nwapp-howHear-add-text'),
            errors: {},
            isLoading: false
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
                this.props.setFlashMessage("success", "HowHear has been successfully created.");
                localStorageRemoveItemsContaining("nwapp-howHear-add-");
                this.props.history.push("/admin/settings/how-hears");
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

        const { errors, isValid } = validateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // Once our state has been validated `client-side` then we will
                // make an API request with the server to create our new production.
                this.props.postHowHear(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            });
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
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
        postHowHear: (postData, successCallback, failedCallback) => {
            dispatch(postHowHear(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchCreateStep4Container);
