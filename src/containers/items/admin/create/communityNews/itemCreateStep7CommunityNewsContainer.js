import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
// import * as moment from 'moment';

import ItemCreateStep7CommunityNewsComponent from "../../../../../components/items/admin/create/communityNews/itemCreateStep7CommunityNewsComponent";
import {
    localStorageGetObjectItem,
    localStorageGetDateItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem
} from '../../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { postItem } from "../../../../../actions/itemActions";


class ItemCreateStep7CommunityNewsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract the type of container.
        const typeOf = parseInt(localStorage.getItem("nwapp-item-create-typeOf"));

        // Set the state.
        this.state = {
            // Step 2
            category:localStorage.getItem("nwapp-item-create-communityNews-category"),
            categoryOption: localStorageGetObjectItem('nwapp-item-create-communityNews-categoryOption'),
            categoryOther: localStorage.getItem("nwapp-item-create-communityNews-categoryOther"),

            // Step 3
            whoNewsFor: localStorageGetIntegerItem("nwapp-item-create-community-news-whoNewsFor"),

            // Step 4
            description: localStorage.getItem("nwapp-item-create-community-news-description"),

            // Step 5
            externalUrl: localStorage.getItem("nwapp-item-create-community-news-externalURL"),

            // Step 6
            photos: localStorageGetArrayItem("nwapp-item-create-community-news-base64Photos"),

            // Common
            typeOf: typeOf,
            errors: {},
            isLoading: false
        }

        // Set the functions.
        this.onTextChange = this.onTextChange.bind(this);
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

        // const dateMoment = moment(this.state.date);
        // postData.date = dateMoment.format("YYYY-MM-DD")
        postData.whoNewsFor = parseInt(this.state.whoNewsFor);

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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Set state to be loading and make the submission to the API webserver.
        this.setState({
            isLoading: true,
        }, ()=> {
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

            // Step 2
            prettyCommunityNewsTypeOf,

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
            <ItemCreateStep7CommunityNewsComponent
                // Step 1
                typeOf={typeOf}

                // Step 2
                prettyCommunityNewsTypeOf={prettyCommunityNewsTypeOf}

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
                isLoading={isLoading}
                onTextChange={this.onTextChange}
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
)(ItemCreateStep7CommunityNewsContainer);
