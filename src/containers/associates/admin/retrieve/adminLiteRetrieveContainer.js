import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminAssociateLiteRetrieveComponent from "../../../../components/associates/admin/retrieve/adminLiteRetrieveComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAssociateDetail } from '../../../../actions/associateActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminAssociateLiteRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const associate = localStorageGetObjectItem("nwapp-admin-retrieve-associate-"+slug.toString() );
        const isLoading = isEmpty(associate);

        // Update state.
        this.state = {
            slug: slug,
            associate: associate,
            isLoading: isLoading,
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        // this.onClientClick = this.onClientClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullAssociateDetail(
            this.state.slug,
            this.onSuccessCallback,
            this.onFailureCallback
        );
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    // onClientClick(e) {
    //     e.preventDefault();
    //     localStorage.setItem("nwapp-create-order-clientId", this.props.clientDetail.id);
    //     localStorage.setItem("nwapp-create-order-clientGivenName", this.props.clientDetail.givenName);
    //     localStorage.setItem("nwapp-create-order-clientLastName", this.props.clientDetail.lastName);
    //     this.props.history.push("/orders/add/step-3");
    // }

    onSuccessCallback(response) {
        console.log("onSuccessCallback |", response);
        this.setState({ isLoading: false, associate: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-associate-"+this.state.slug.toString(), response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, isLoading } = this.state;
        const associate = isEmpty(this.state.associate) ? {} : this.state.associate;
        return (
            <AdminAssociateLiteRetrieveComponent
                slug={slug}
                associate={associate}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        associate: store.associateDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAssociateDetail: (slug, successCallback, failedCallback) => {
            dispatch(pullAssociateDetail(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateLiteRetrieveContainer);
