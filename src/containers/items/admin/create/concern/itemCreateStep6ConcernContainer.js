import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
// import * as moment from 'moment';

import ItemCreateStep6ConcernComponent from "../../../../../components/items/admin/create/concern/itemCreateStep6ConcernComponent";
import {
    localStorageGetObjectItem,
    localStorageGetDateItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem
} from '../../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { postItem } from "../../../../../actions/itemActions";


class ItemCreateStep6ConcernContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Set the state.
        this.state = {
            // STEP 2
            typeOf: localStorageGetIntegerItem("nwapp-item-create-typeOf"),

            // STEP 3
            category:localStorage.getItem("nwapp-item-create-concern-category"),
            categoryOption: localStorageGetObjectItem('nwapp-item-create-concern-categoryOption'),
            categoryOther: localStorage.getItem("nwapp-item-create-concern-categoryOther"),

            // STEP 4
            title: localStorage.getItem("nwapp-item-create-concern-title"),
            description: localStorage.getItem("nwapp-item-create-concern-description"),
            location: localStorage.getItem("nwapp-item-create-concern-location"),

            // STEP 5
            photos: localStorageGetArrayItem("nwapp-item-create-concern-base64Photos"),

            // COMMON
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
        this.props.history.push("/admin/items");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
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
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.postItem(
            this.getPostData(),
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            typeOf, returnURL, errors,

            // Concern Type
            concernTitle,
            concernDescription,
            concernLocation,
            concernPhotos,

            // Event
            eventTitle,
            eventPrettyEventTypeOf,
            eventDate,
            eventDescription,
            logoPhoto,
            galleryPhotos,
            shownToWhomLabel,
            canBePostedOnSocialMediaLabel,

            // Incident
            title,
            date,
            description,
            location,
            photos,

            // Information
            informationDescription
        } = this.state;

        return (
            <ItemCreateStep6ConcernComponent
                typeOf={typeOf}
                returnURL={returnURL}
                errors={errors}
                onClick={this.onClick}

                concernTitle={concernTitle}
                concernDescription={concernDescription}
                concernLocation={concernLocation}
                concernPhotos={concernPhotos}
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
)(ItemCreateStep6ConcernContainer);
