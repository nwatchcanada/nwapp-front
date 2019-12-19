import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminMemberCreateStep2Component from "../../../../components/members/admin/create/adminMemberCreateStep2Component";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { pullMemberList } from "../../../../actions/memberActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";


class AdminMemberCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            givenName: localStorage.getItem("workery-create-member-givenName"),
            lastName: localStorage.getItem("workery-create-member-lastName"),
            email: localStorage.getItem("workery-create-member-email"),
            phone: localStorage.getItem("workery-create-member-phone"),
            isLoading: true,
            errors: {},
            page: 1,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const parametersMap = new Map();
        if (this.state.givenName !== undefined && this.state.givenName !== null) {
            parametersMap.set('givenName', this.state.givenName);
        }
        if (this.state.lastName !== undefined && this.state.lastName !== null) {
            parametersMap.set('lastName', this.state.lastName);
        }
        if (this.state.email !== undefined && this.state.email !== null) {
            parametersMap.set('email', this.state.email);
        }
        if (this.state.phone !== undefined && this.state.phone !== null) {
            parametersMap.set('phone', this.state.phone);
        }
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullMemberList(1, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
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

    onNextClick(e) {
        const page = this.state.page + 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullMemberList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    onPreviousClick(e) {
        const page = this.state.page - 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullMemberList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading, errors } = this.state;
        const members = (this.props.memberList && this.props.memberList.results) ? this.props.memberList.results : [];
        const hasNext = this.props.memberList.next !== null;
        const hasPrevious = this.props.memberList.previous !== null;
        return (
            <AdminMemberCreateStep2Component
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                members={members}
                isLoading={isLoading}
                errors={errors}
                onTextChange={this.onTextChange}
                hasNext={hasNext}
                onNextClick={this.onNextClick}
                hasPrevious={hasPrevious}
                onPreviousClick={this.onPreviousClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        memberList: store.memberListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullMemberList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullMemberList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMemberCreateStep2Container);
