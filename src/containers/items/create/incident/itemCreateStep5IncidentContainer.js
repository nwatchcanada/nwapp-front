import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep5IncidentComponent from "../../../../components/items/create/incident/itemCreateStep5IncidentComponent";
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


class ItemCreateStep5IncidentContainer extends Component {
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
            incidentTypeOf:localStorageGetIntegerItem("nwapp-item-create-incident-incidentTypeOf"),
            incidentTypeOfOption: localStorageGetObjectItem('nwapp-item-create-incident-incidentTypeOfOption'),
            incidentTypeOfOther: localStorage.getItem("nwapp-item-create-incident-incidentTypeOfOther"),
            prettyIncidentTypeOf: localStorage.getItem('nwapp-item-create-incident-pretty-incident-type'),

            // Step 3
            notifiedAuthorities: localStorageGetIntegerItem("nwapp-item-create-incident-notifiedAuthorities"),
            acceptAuthorityCooperation: localStorageGetIntegerItem("nwapp-item-create-incident-acceptAuthorityCooperation"),
            notifiedAuthoritiesLabel: localStorage.getItem("nwapp-item-create-incident-notifiedAuthorities-label"),
            acceptAuthorityCooperationLabel: localStorage.getItem("nwapp-item-create-incident-acceptAuthorityCooperation-label"),

            // Step 4
            title: localStorage.getItem("nwapp-item-create-incident-title"),
            date: localStorageGetDateItem("nwapp-item-create-incident-date"),
            description: localStorage.getItem("nwapp-item-create-incident-description"),
            location: localStorage.getItem("nwapp-item-create-incident-location"),
            photos: localStorageGetArrayItem("nwapp-item-create-incident-photos"),

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
            errors
        } = this.state;

        return (
            <ItemCreateStep5IncidentComponent
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep5IncidentContainer);
