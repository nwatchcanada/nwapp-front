import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep5EventComponent from "../../../../components/items/create/event/itemCreateStep5EventComponent";
import {
    localStorageGetObjectItem, localStorageGetDateItem, localStorageGetArrayItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF
} from "../../../../constants/api";


class ItemCreateStep5EventContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract the type of container.
        const typeOf = parseInt(localStorage.getItem("nwapp-item-create-typeOf"));
        let returnURL;
        if (typeOf === INCIDENT_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-incident";
        } else if (typeOf === EVENT_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-event";
        } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-concern";
        } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
            returnURL = "/item/add/step-2-information";
        }

        // Set the state.
        this.state = {
            typeOf: typeOf,
            returnURL: returnURL,

            // Concern Type
            concernTitle: localStorage.getItem("nwapp-item-create-concern-title"),
            concernDescription: localStorage.getItem("nwapp-item-create-concern-description"),
            concernLocation: localStorage.getItem("nwapp-item-create-concern-location"),
            concernPhotos: localStorageGetArrayItem("nwapp-item-create-concern-photos"),

            // Event
            eventTitle: localStorage.getItem("nwapp-item-create-event-title"),
            eventDate: localStorageGetDateItem("nwapp-item-create-event-date"),
            eventDescription: localStorage.getItem("nwapp-item-create-event-description"),
            logoPhoto: localStorageGetArrayItem("nwapp-item-create-event-logoPhoto"),
            galleryPhotos: localStorageGetArrayItem("nwapp-item-create-event-galleryPhotos"),
            shownToWhom: localStorageGetIntegerItem("nwapp-item-create-event-shownToWhom"),
            shownToWhomLabel: localStorage.getItem("nwapp-item-create-event-shownToWhom-label"),
            canBePostedOnSocialMedia: localStorageGetIntegerItem("nwapp-item-create-event-canBePostedOnSocialMedia"),
            canBePostedOnSocialMediaLabel: localStorage.getItem("nwapp-item-create-event-canBePostedOnSocialMedia-label"),

            // Incident
            title: localStorage.getItem("nwapp-item-create-incident-title"),
            date: localStorageGetDateItem("nwapp-item-create-incident-date"),
            description: localStorage.getItem("nwapp-item-create-incident-description"),
            location: localStorage.getItem("nwapp-item-create-incident-location"),
            photos: localStorageGetArrayItem("nwapp-item-create-incident-photos"),

            // Information
            informationDescription: localStorage.getItem("nwapp-item-create-information-description"),

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
        this.props.history.push("/items");
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Simply submit.
        this.onSuccessfulSubmissionCallback();
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
            <ItemCreateStep5EventComponent
                typeOf={typeOf}
                returnURL={returnURL}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}

                eventTitle={eventTitle}
                eventPrettyEventTypeOf={eventPrettyEventTypeOf}
                eventDate={eventDate}
                eventDescription={eventDescription}
                logoPhoto={logoPhoto}
                galleryPhotos={galleryPhotos}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep5EventContainer);
