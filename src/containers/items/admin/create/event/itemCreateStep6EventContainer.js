import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ItemCreateStep6EventComponent from "../../../../../components/items/admin/create/event/itemCreateStep6EventComponent";
import {
    localStorageGetObjectItem,
    localStorageGetDateItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageGetBooleanItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../../../constants/api";
import { postItem } from "../../../../../actions/itemActions";


class ItemCreateStep6EventContainer extends Component {
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
            typeOf: typeOf,

            // Event
            eventCategory:localStorage.getItem("nwapp-item-create-event-category"),
            eventCategoryOption: localStorageGetObjectItem('nwapp-item-create-event-categoryOption'),
            eventCategoryOther: localStorage.getItem("nwapp-item-create-event-categoryOther"),
            isAllDayEvent: localStorageGetBooleanItem("nwapp-item-create-event-date-isAllDayEvent"),
            startDateTime: localStorageGetDateItem("nwapp-item-create-event-startDateTime"),
            finishDateTime: localStorageGetDateItem("nwapp-item-create-event-finishDateTime"),
            eventTitle: localStorage.getItem("nwapp-item-create-event-title"),
            eventDescription: localStorage.getItem("nwapp-item-create-event-description"),
            eventExternalURL: localStorage.getItem("nwapp-item-create-event-externalURL"),
            eventLogoImage: localStorageGetArrayItem("nwapp-item-create-event-base64EventLogoImage"),
            photos: localStorageGetArrayItem("nwapp-item-create-event-base64Photos"),
            shownToWhom: localStorageGetIntegerItem("nwapp-item-create-event-shownToWhom"),
            canBePostedOnSocialMedia: localStorageGetIntegerItem("nwapp-item-create-event-canBePostedOnSocialMedia"),

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

        postData.category = this.state.eventCategory;
        postData.categoryOption = this.state.eventCategoryOption;
        postData.eventCategoryOther = this.state.eventCategoryOther;
        delete postData["eventCategory"];
        delete postData["eventCategoryOption"];
        delete postData["eventCategoryOther"];

        const startDateTimeMoment = moment(this.state.startDateTime);
        postData.startDateTime = startDateTimeMoment.format("YYYY-MM-DD hh:mm:ss")

        const finishDateTimeMoment = moment(this.state.finishDateTime);
        postData.finishDateTime = finishDateTimeMoment.format("YYYY-MM-DD hh:mm:ss")

        postData.title = this.state.eventTitle;
        postData.description = this.state.eventDescription;
        postData.externalUrl = this.state.eventExternalURL;

        delete postData["eventTitle"];
        delete postData["eventDescription"];
        delete postData["eventExternalURL"];

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
        localStorageRemoveItemsContaining("nwapp-item-create-event-");
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
            typeOf, errors, isLoading,

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
            eventLogoImage,
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
            <ItemCreateStep6EventComponent
                typeOf={typeOf}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onClick={this.onClick}

                eventTitle={eventTitle}
                eventPrettyEventTypeOf={eventPrettyEventTypeOf}
                eventDate={eventDate}
                eventDescription={eventDescription}
                eventLogoImage={eventLogoImage}
                shownToWhomLabel={shownToWhomLabel}
                canBePostedOnSocialMediaLabel={canBePostedOnSocialMediaLabel}
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
)(ItemCreateStep6EventContainer);
