import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorPromoteOperationStep1Component from "../../../../components/areaCoordinators/admin/operations/adminPromoteOperationStep1Component";


class AdminAreaCoordinatorPromoteOperationStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
        }

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

    onSuccessfulSubmissionCallback(areaCoordinator) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "AreaCoordinator has been successfully created.");
        this.props.history.push("/admin/areaCoordinators");
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

    onClick(e, roleId) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Set our promotion group id.
        localStorage.setItem("nwapp-areaCoordinator-promote-group-id", roleId);

        this.props.history.push("/admin/areaCoordinator/"+this.state.slug+"/promote/step-2");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        console.log(this.props.areaCoordinator)
        return (
            <AdminAreaCoordinatorPromoteOperationStep1Component
                slug={this.state.slug}
                areaCoordinator={this.props.areaCoordinator}
                onBack={this.onBack}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        areaCoordinator: store.areaCoordinatorDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorPromoteOperationStep1Container);
