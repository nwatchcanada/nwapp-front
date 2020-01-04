import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminAreaCoordinatorOperationsComponent from "../../../../components/areaCoordinators/admin/retrieve/adminOperationsComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";


class AdminAreaCoordinatorOperationsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
            isLoading: false,
            invoice: {}
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onAddJobClick = this.onAddJobClick.bind(this);
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

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessCallback(response) {
        // console.log(response);
        this.setState({ isLoading: false, })
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onAddJobClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-areaCoordinatorId", this.props.areaCoordinatorDetail.id);
        localStorage.setItem("workery-create-order-areaCoordinatorGivenName", this.props.areaCoordinatorDetail.givenName);
        localStorage.setItem("workery-create-order-areaCoordinatorLastName", this.props.areaCoordinatorDetail.lastName);
        this.props.history.push("/admin/areaCoordinator/"+this.state.slug+"/promote/step-1");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAreaCoordinatorOperationsComponent
                slug={this.state.slug}
                isLoading={this.state.isLoading}
                flashMessage={this.props.flashMessage}
                onAddJobClick={this.onAddJobClick}
                areaCoordinator={this.props.areaCoordinatorDetail}
                user={this.props.user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        areaCoordinatorDetail: store.areaCoordinatorDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorOperationsContainer);
