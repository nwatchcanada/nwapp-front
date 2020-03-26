import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAssociateDistrictStep2Component from "../../../../../components/associates/admin/operations/district/step2Component";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullDistrictList } from "../../../../../actions/districtActions";
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
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // postData.about = this.state.id;
        // postData.extraText = this.state.text;

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

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessListCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessListCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessListCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureListCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        e.preventDefault();
        alert("TODO");
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
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateDistrictStep2Container);
