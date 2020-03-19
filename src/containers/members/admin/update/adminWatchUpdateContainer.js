import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminMemberWatchUpdateComponent from "../../../../components/members/admin/update/adminWatchUpdateComponent";
import { localStorageGetIntegerItem } from '../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { pullWatchList } from '../../../../actions/watchActions';
import { putMemberWatch } from '../../../../actions/memberActions';


class AdminMemberCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Force active users as per issue via https://github.com/over55/nwapp-front/issues/296
        var parametersMap = new Map();
        parametersMap.set("isArchived", false);

        this.state = {
            // Pagination
            page: 1,
            sizePerPage: 1000,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,

            // Data
            slug: slug,
            typeOf: this.props.memberDetail.typeOf,
            watchSlug: this.props.memberDetail.watchSlug,
            watchIcon: "",
            watchName: this.props.memberDetail.watchName,

            streetNumber: this.props.memberDetail.streetNumber,
            streetName: this.props.memberDetail.streetName,
            streetType: this.props.memberDetail.streetType,
            streetTypeOther: this.props.memberDetail.streetTypeOther,
            streetDirection: this.props.memberDetail.streetDirection,
        }
        this.onSuccessfulGETCallback = this.onSuccessfulGETCallback.bind(this);
        this.onFailedGETCallback = this.onFailedGETCallback.bind(this);
        this.onSuccessfulPUTCallback = this.onSuccessfulPUTCallback.bind(this);
        this.onFailedPUTCallback = this.onFailedPUTCallback.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onTableRowClick = this.onTableRowClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // Assign our watch.
        postData.watch = this.state.watchSlug;

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

        // The following code will generate a `url parameter` specific to
        // our API endpoint which will list all the nearest watches based
        // on the specified address.
        let nearbyAddress = this.state.typeOf+","+this.state.streetNumber+","+this.state.streetName.replace(",", "COMMA");
        nearbyAddress += ","+this.state.streetType+","+this.state.streetTypeOther;
        this.state.parametersMap.set("searchNearbyAddress", nearbyAddress);

        console.log("nearbyAddress |", nearbyAddress);

        this.props.pullWatchList(
            this.state.page,
            this.state.sizePerPage,
            this.state.parametersMap,
            this.onSuccessfulGETCallback,
            this.onFailedGETCallback
        );
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

    onSuccessfulGETCallback(response) {
        console.log("onSuccessfulGETCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessfulGETCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessfulGETCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailedGETCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false });
    }

    onSuccessfulPUTCallback(response) {
        console.log("onSuccessfulPUTCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessfulPUTCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessfulPUTCallback | State (Post-Fetch):", this.state);
                this.props.setFlashMessage("success", "Member has been successfully updated.");
                this.props.history.push("/admin/member/"+response['slug']+"/full");
            }
        )
    }

    onFailedPUTCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTableRowClick(e, typeOf, slug, icon, name) {
        e.preventDefault();
        console.log("onTableRowClick |", typeOf, slug, icon, name);

        this.setState({
            errors: {},
            isLoading: true,
            watchSlug: slug,
            watchName: name,
        }, ()=>{
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putMemberWatch(
                this.getPostData(),
                this.onSuccessfulPUTCallback,
                this.onFailedPUTCallback
            );
        });
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            returnURL, isLoading
        } = this.state;
        const watchItems = isEmpty(this.props.watchList) ? [] : this.props.watchList.results;
        return (
            <AdminMemberWatchUpdateComponent
                slug={this.state.slug}
                member={this.props.memberDetail}
                watchItems={watchItems}
                returnURL={returnURL}
                isLoading={isLoading}
                onTableRowClick={this.onTableRowClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        memberDetail: store.memberDetailState,
        watchList: store.watchListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullWatchList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullWatchList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        putMemberWatch: (postData, successCallback, failedCallback) => {
            dispatch(putMemberWatch(postData, successCallback, failedCallback))
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberCreateStep6Container);
