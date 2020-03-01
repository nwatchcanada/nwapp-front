import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ItemCreateStep6IncidentComponent from "../../../../../components/items/admin/create/incident/itemCreateStep6IncidentComponent";
import {
    localStorageGetObjectItem,
    localStorageGetDateItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
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


class ItemCreateStep6IncidentContainer extends Component {
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

            // Step 2
            category:localStorage.getItem("nwapp-item-create-incident-category"),
            categoryOption: localStorageGetObjectItem('nwapp-item-create-incident-categoryOption'),
            categoryOther: localStorage.getItem("nwapp-item-create-incident-categoryOther"),

            // Step 3
            notifiedAuthorities: localStorageGetIntegerItem("nwapp-item-create-incident-notifiedAuthorities"),
            acceptAuthorityCooperation: localStorageGetIntegerItem("nwapp-item-create-incident-acceptAuthorityCooperation"),

            // Step 4
            title: localStorage.getItem("nwapp-item-create-incident-title"),
            date: localStorageGetDateItem("nwapp-item-create-incident-date"),
            description: localStorage.getItem("nwapp-item-create-incident-description"),
            location: localStorage.getItem("nwapp-item-create-incident-location"),
            photos: localStorageGetArrayItem("nwapp-item-create-incident-base64Photos"),

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

        const dateMoment = moment(this.state.date);
        postData.date = dateMoment.format("YYYY-MM-DD")

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
        this.setState({ errors: {}, isLoading: false, })
        this.props.setFlashMessage("success", "Item has been successfully created.");
        localStorageRemoveItemsContaining("nwapp-item-create-incident-");
        this.props.history.push("/admin/items");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
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
            prettyIncidentTypeOf,

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
            <ItemCreateStep6IncidentComponent
                // Step 1
                typeOf={typeOf}

                // Step 2
                prettyIncidentTypeOf={prettyIncidentTypeOf}

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
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                isLoading={isLoading}

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
)(ItemCreateStep6IncidentContainer);
