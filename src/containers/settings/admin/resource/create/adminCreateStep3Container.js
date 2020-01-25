import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminResourceCreateStep3Component from "../../../../../components/settings/admin/resource/create/adminCreateStep3Component";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import {
    localStorageGetIntegerItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetObjectItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';
import { postResourceItem } from "../../../../../actions/resourceActions";
import { validateInput } from '../../../../../validators/resourceValidator';


class AdminResourceCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const typeOf = localStorageGetIntegerItem("nwapp-resource-add-typeOf");
        let backURL = "";
        if (typeOf === LINK_RESOURCE_TYPE_OF) {
            backURL = "/admin/settings/resource/add/step-2-link";
        } else if (typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
            backURL = "/admin/settings/resource/add/step-2-yt-video";
        } else if (typeOf === IMAGE_RESOURCE_TYPE_OF) {
            backURL = "/admin/settings/resource/add/step-2-image";
        } else if (typeOf === FILE_RESOURCE_TYPE_OF) {
            backURL = "/admin/settings/resource/add/step-2-file";
        }

        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            // Variable used to lock buttons when makig submissions.
            isLoading: false,

            // ALL OUR GENERAL INFORMATION IS STORED HERE.
            backURL: backURL,
            category: localStorageGetIntegerItem("nwapp-resource-add-category"),
            categoryOption: localStorageGetObjectItem('nwapp-register-categoryOption'),
            typeOf: typeOf,
            typeOfOption: localStorageGetObjectItem('nwapp-register-typeOfOption'),
            name: localStorage.getItem('nwapp-resource-add-name'),
            externalUrl: localStorage.getItem('nwapp-resource-add-externalUrl'),
            embedCode: localStorage.getItem('nwapp-resource-add-embedCode'),
            description: localStorage.getItem('nwapp-resource-add-description'),
            file: localStorageGetObjectItem('nwapp-resource-add-file'),
            uploadContent: localStorageGetObjectItem('nwapp-resource-add-file-upload-content'),
            uploadFilename: localStorage.getItem('nwapp-resource-add-file-upload-filename'),
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

        if (this.state.uploadContent === "" || this.state.uploadContent === undefined || isEmpty(this.state.uploadContent) ) {
            postData.uploadContent = null;
        }
        if (this.state.uploadFilename === "" || this.state.uploadFilename === null || this.state.uploadFilename === undefined) {
            postData.uploadFilename = null;
        }

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
                this.props.setFlashMessage("success", "Resource has been successfully created.");
                localStorageRemoveItemsContaining("nwapp-resource-add-");
                this.props.history.push("/admin/settings/resources");
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
                this.props.postResourceItem(
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
            backURL, name, errors, isLoading
        } = this.state;
        return (
            <AdminResourceCreateStep3Component
                backURL={backURL}
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
        postResourceItem: (postData, successCallback, failedCallback) => {
            dispatch(postResourceItem(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminResourceCreateStep3Container);
