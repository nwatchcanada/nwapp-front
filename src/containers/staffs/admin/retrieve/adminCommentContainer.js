import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminStaffCommentComponent from "../../../../components/staffs/admin/retrieve/adminCommentComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullStaffCommentList, postStaffComment } from "../../../../actions/staffCommentActions";
import { validateInput } from "../../../../validators/commentValidator"


class AdminStaffCommentContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;
        const parametersMap = new Map();
        parametersMap.set("staff", slug);
        parametersMap.set("o", "-created_at");
        this.state = {
            // Pagination
            page: 1,
            sizePerPage: 10000,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,

            // Everything else...
            slug: slug,
            text: "",
            errors: {},
        }
        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
        this.onSuccessPostCallback = this.onSuccessPostCallback.bind(this);
        this.onFailurePostCallback = this.onFailurePostCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.staff = this.state.slug;

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

        // Get our data.
        this.props.pullStaffCommentList(
            this.state.page,
            this.state.sizePerPage,
            this.state.parametersMap,
            this.onSuccessListCallback,
            this.onFailureListCallback
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

    onSuccessListCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
                text: "", // Clear the textfield.
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

    onSuccessPostCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessPostCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessPostCallback | State (Post-Fetch):", this.state);
                // Get our data.
                this.props.pullStaffCommentList(
                    this.state.page,
                    this.state.sizePerPage,
                    this.state.parametersMap,
                    this.onSuccessListCallback,
                    this.onFailureListCallback
                );
            }
        )
    }

    onFailurePostCallback(errors) {
        console.log("onFailurePostCallback |", errors);
        this.setState({ isLoading: false, errors: errors, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();

                // Once our state has been validated `staff-side` then we will
                // make an API request with the server to create our new production.
                this.props.postStaffComment(
                    this.getPostData(),
                    this.onSuccessPostCallback,
                    this.onFailurePostCallback
                );
            });
        } else {
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
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, slug, text, errors } = this.state;
        const staff = this.props.staffDetail ? this.props.staffDetail : {};
        const staffComments = this.props.staffCommentList ? this.props.staffCommentList.results : [];
        return (
            <AdminStaffCommentComponent
                slug={slug}
                text={text}
                staff={staff}
                staffComments={staffComments}
                flashMessage={this.props.flashMessage}
                onTextChange={this.onTextChange}
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
        staffCommentList: store.staffCommentListState,
        staffDetail: store.staffDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullStaffCommentList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullStaffCommentList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
        postStaffComment: (postData, successCallback, failedCallback) => {
            dispatch(postStaffComment(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminStaffCommentContainer);
