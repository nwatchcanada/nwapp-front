import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ItemCreateStep5ResourceComponent from "../../../../../components/items/admin/create/resource/itemCreateStep5ResourceComponent";
import {
    localStorageGetObjectItem,
    localStorageGetDateItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import { postItem } from "../../../../../actions/itemActions";


class ItemCreateStep5ResourceContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Set the state.
        this.state = {
            // Common
            typeOf: localStorageGetIntegerItem("nwapp-item-create-typeOf"),
            returnURL: localStorage.getItem("nwapp-item-create-resource-returnURL"),

            // Step 2
            category:localStorage.getItem("nwapp-item-create-resource-category"),
            categoryOption: localStorageGetObjectItem('nwapp-item-create-resource-categoryOption'),
            categoryOther: localStorage.getItem("nwapp-item-create-resource-categoryOther"),

            // Step 3
            formatType: localStorageGetIntegerItem("nwapp-item-create-resource-formatType"),

            // Step 4 - Details
            name: localStorage.getItem('nwapp-item-create-resource-name'),
            externalUrl: localStorage.getItem('nwapp-item-create-resource-externalUrl'),
            description: localStorage.getItem('nwapp-item-create-resource-description'),
            embedCode: localStorage.getItem('nwapp-item-create-resource-embedCode'),
            resourceImage: localStorageGetArrayItem("nwapp-item-create-resource-base64Image"),
            resourceFile: localStorageGetArrayItem("nwapp-item-create-resource-base64File"),

            // All
            errors: {},
            isLoading: false
        }

        // Set the functions.
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        if (this.state.typeOf === LINK_RESOURCE_TYPE_OF) {
            postData.title = this.state.name;
        }

        // const dateMoment = moment(this.state.date);
        // postData.date = dateMoment.format("YYYY-MM-DD")

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

    onSuccessfulSubmissionCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Item has been successfully created.");
        localStorageRemoveItemsContaining("nwapp-item-create-resource-");
        this.props.history.push("/admin/items");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

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
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({
            isLoading: true,
        }, ()=>{
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.postItem(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        });
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Step 1
            typeOf,
            returnURL,

            // Step 2
            prettyResourceTypeOf,

            // Step 3
            notifiedAuthorities,
            notifiedAuthoritiesLabel,
            acceptAuthorityCooperation,
            acceptAuthorityCooperationLabel,

            // Step 4
            title,
            date,
            description,
            location,
            photos,

            // All
            errors,
            isLoading
        } = this.state;

        return (
            <ItemCreateStep5ResourceComponent
                // Step 1
                typeOf={typeOf}

                // Step 2
                prettyResourceTypeOf={prettyResourceTypeOf}

                // Step 3
                notifiedAuthorities={notifiedAuthorities}
                notifiedAuthoritiesLabel={notifiedAuthoritiesLabel}
                acceptAuthorityCooperation={acceptAuthorityCooperation}
                acceptAuthorityCooperationLabel={acceptAuthorityCooperationLabel}

                // Step 4
                title={title}
                date={date}
                description={description}
                location={location}
                photos={photos}

                // All
                errors={errors}
                returnURL={returnURL}
                isLoading={isLoading}
                onClick={this.onClick}

                title={title}
                date={date}
                description={description}
                location={location}
                photos={photos}
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
        postItem: (postData, successCallback, failedCallback) => {
            dispatch(postItem(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep5ResourceContainer);
