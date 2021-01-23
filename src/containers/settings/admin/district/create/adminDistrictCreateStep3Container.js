import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminDistrictCreateStep3Component from "../../../../../components/settings/admin/district/create/adminDistrictCreateStep3Component";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from "../../../../../constants/api";
import {
    localStorageGetIntegerItem,
    localStorageSetObjectOrArrayItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';
import { postDistrict } from "../../../../../actions/districtActions";
import { validateInput } from '../../../../../validators/districtValidator';


class AdminDistrictCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const typeOf = localStorageGetIntegerItem('nwapp-district-add-typeOf');
        let step2URL = "";
        if (typeOf === RESIDENCE_TYPE_OF) {
            step2URL = "/admin/settings/district/add/step-2-rez";
        } else if (typeOf === BUSINESS_TYPE_OF) {
            step2URL = "/admin/settings/district/add/step-2-biz";
        } else {
            step2URL = "/admin/settings/district/add/step-2-cc";
        }

        this.state = {
            name: localStorage.getItem('nwapp-district-add-name'),
            description: localStorage.getItem('nwapp-district-add-description'),
            websiteURL: localStorage.getItem('nwapp-district-add-websiteURL'),
            counselorName: localStorage.getItem('nwapp-district-add-counselorName'),
            counselorEmail: localStorage.getItem('nwapp-district-add-counselorEmail'),
            counselorPhone: localStorage.getItem('nwapp-district-add-counselorPhone'),
            typeOf: typeOf,
            step2URL: step2URL,
            errors: {},
            isLoading: false,
            uploadContent: localStorage.getItem('nwapp-district-add-file-upload-content'),
            uploadFilename: localStorage.getItem('nwapp-district-add-file-upload-filename'),
            facebookUrl: "",
        }

        // localStorageSetObjectOrArrayItem('nwapp-district-add-file-upload-content', this.state.upload_content);
        // localStorage.setItem("nwapp-district-add-file-upload-filename", this.state.upload_filename)


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
                this.props.setFlashMessage("success", "District has been successfully created.");
                localStorageRemoveItemsContaining("nwapp-district-add-");
                this.props.history.push("/admin/settings/districts");
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
                this.props.postDistrict(
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
            name, description, websiteURL, logo, errors, isLoading, step2URL
        } = this.state;
        return (
            <AdminDistrictCreateStep3Component
                name={name}
                description={description}
                websiteURL={websiteURL}
                logo={logo}
                errors={errors}
                onClick={this.onClick}
                onDrop={this.onDrop}
                isLoading={isLoading}
                step2URL={step2URL}
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
        postDistrict: (postData, successCallback, failedCallback) => {
            dispatch(postDistrict(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDistrictCreateStep3Container);
