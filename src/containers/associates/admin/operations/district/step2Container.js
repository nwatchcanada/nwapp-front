import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAssociateDistrictStep2Component from "../../../../../components/associates/admin/operations/district/step2Component";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { postAssociateDistrictOperation } from "../../../../../actions/associateActions";
import { validateInput } from "../../../../../validators/fileValidator"


class AdminAssociateDistrictStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { associateSlug, districtSlug } = this.props.match.params;
        this.state = {
            associateSlug: associateSlug,
            districtSlug: districtSlug,
            errors: {},
        }
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessPostCallback = this.onSuccessPostCallback.bind(this);
        this.onFailedPostCallback = this.onFailedPostCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.associate = this.state.associateSlug;
        postData.district = this.state.districtSlug;

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

    onSuccessPostCallback(response) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Associate has been successfully assigned to the governing body of a district.");
        this.props.history.push("/admin/associate/"+this.state.associateSlug+"/operations");
    }

    onFailedPostCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false,
        });

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
        this.setState({
            isLoading: true,
            errors: [],
        });

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.postAssociateDistrictOperation(
            this.getPostData(),
            this.onSuccessPostCallback,
            this.onFailedPostCallback
        );
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, associateSlug, districtSlug, errors } = this.state;

        return (
            <AdminAssociateDistrictStep2Component
                associate={this.props.associateDetail}
                associateSlug={associateSlug}
                districtSlug={districtSlug}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        districtList: store.districtListState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postAssociateDistrictOperation: (postData, successCallback, failedCallback) => {
            dispatch(postAssociateDistrictOperation(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateDistrictStep2Container);
