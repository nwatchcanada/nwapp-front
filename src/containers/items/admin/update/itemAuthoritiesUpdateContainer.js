import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemAuthoritiesUpdateComponent from "../../../../components/items/admin/update/itemAuthoritiesUpdateComponent";
import { localStorageGetObjectItem } from '../../../../helpers/localStorageUtility';
import { validateIncidentStep3Input } from "../../../../validators/itemValidator";
import { OTHER_INCIDENT_TYPE_OF, INCIDENT_TYPE_CHOICES } from "../../../../constants/api";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { putItemAuthorities } from "../../../../actions/itemActions";


class ItemAuthoritiesUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our data from the local
        // storage if the data was previously saved.
        const item = localStorageGetObjectItem("nwapp-admin-retrieve-item-"+slug.toString() );

        this.state = {
            slug: slug,
            showModal: false,
            errors: {},
            isLoading: false,
            item: item,
            hasNotifiedAuthorities: item.hasNotifiedAuthorities ? 1 : 0,
            hasAcceptAuthorityCooperation: 1, //item.hasAcceptAuthorityCooperation,
        }

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulPutCallback = this.onSuccessfulPutCallback.bind(this);
        this.onFailurePutCallback = this.onFailurePutCallback.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onAgreeModalClick = this.onAgreeModalClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.hasNotifiedAuthorities = parseInt(this.state.hasNotifiedAuthorities);
        postData.hasAcceptAuthorityCooperation = parseInt(this.state.hasAcceptAuthorityCooperation);

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

    onSuccessfulPutCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Item has been updated.");
        this.props.history.push("/admin/item/"+this.state.slug);
    }

    onFailurePutCallback(errors) {
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

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-item-create-incident-"+[e.target.name];
        const storageLabelKey =  "nwapp-item-create-incident-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onClick(e) {
        // Princident the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateIncidentStep3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            console.log("Selected Choice: ", this.state.hasAcceptAuthorityCooperation );

            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putItemAuthorities(
                    this.getPostData(),
                    this.onSuccessfulPutCallback,
                    this.onFailurePutCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailurePutCallback(errors);
        }
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    onAgreeModalClick(e) {
        e.preventDefault();
        this.props.setFlashMessage("danger", "Incident item has been aborted.");
        this.props.history.push("/admin/items");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            slug,
            hasNotifiedAuthorities,
            hasAcceptAuthorityCooperation,
            showModal,
            errors
        } = this.state;
        return (
            <ItemAuthoritiesUpdateComponent
                slug={slug}
                hasNotifiedAuthorities={hasNotifiedAuthorities}
                hasAcceptAuthorityCooperation={hasAcceptAuthorityCooperation}
                onRadioChange={this.onRadioChange}
                errors={errors}
                onClick={this.onClick}
                onCloseModalClick={this.onCloseModalClick}
                showModal={showModal}
                onAgreeModalClick={this.onAgreeModalClick}
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
        putItemAuthorities: (data, onSuccessfulPutCallback, onFailurePutCallback) => {
            dispatch(
                putItemAuthorities(data, onSuccessfulPutCallback, onFailurePutCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemAuthoritiesUpdateContainer);
