import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AdminMemberWatchUpdateComponent from "../../../../components/members/admin/update/adminWatchUpdateComponent";
import { localStorageGetIntegerItem } from '../../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { pullWatchList } from '../../../../actions/watchActions';


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
        let nearbyAddress = this.state.streetNumber+","+this.state.streetName;
        nearbyAddress += ","+this.state.streetType+","+this.state.streetTypeOther;
        this.state.parametersMap.set("searchNearbyAddress", nearbyAddress);

        this.props.pullWatchList(
            this.state.page,
            this.state.sizePerPage,
            this.state.parametersMap,
            this.onSuccessfulGETCallback,
            this.onFailedGETCallback
        );

        // Set our event handling.
        this.onTableRowClick = this.onTableRowClick.bind(this);
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTableRowClick(e, typeOf, slug, icon, name) {
        e.preventDefault();
        console.log(typeOf, slug, icon, name);
        // this.setState({
        //     isLoading: true
        // });
        // localStorage.setItem('nwapp-create-member-watch-typeOf', typeOf);
        // localStorage.setItem('nwapp-create-member-watch-slug', slug);
        // localStorage.setItem('nwapp-create-member-watch-icon', icon);
        // localStorage.setItem('nwapp-create-member-watch-name', name);
        // this.props.history.push("/admin/members/add/step-7");
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberCreateStep6Container);
