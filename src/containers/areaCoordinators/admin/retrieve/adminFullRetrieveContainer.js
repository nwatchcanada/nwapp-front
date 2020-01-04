import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminAreaCoordinatorFullRetrieveComponent from "../../../../components/areaCoordinators/admin/retrieve/adminFullRetrieveComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAreaCoordinatorDetail } from '../../../../actions/areaCoordinatorActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';


class AdminAreaCoordinatorFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const areaCoordinator = localStorageGetObjectItem("nwapp-admin-retrieve-areaCoordinator-"+slug.toString() );
        const isLoading = isEmpty(areaCoordinator);

        // Update state.
        this.state = {
            slug: slug,
            areaCoordinator: areaCoordinator,
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
        this.props.pullAreaCoordinatorDetail(
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
        this.setState({ isLoading: false, areaCoordinator: response, });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-areaCoordinator-"+this.state.slug.toString(), response);
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
        const areaCoordinator = isEmpty(this.state.areaCoordinator) ? {} : this.state.areaCoordinator;
        return (
            <AdminAreaCoordinatorFullRetrieveComponent
                slug={slug}
                areaCoordinator={areaCoordinator}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        areaCoordinator: store.areaCoordinatorDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAreaCoordinatorDetail: (slug, successCallback, failedCallback) => {
            dispatch(pullAreaCoordinatorDetail(slug, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorFullRetrieveContainer);
