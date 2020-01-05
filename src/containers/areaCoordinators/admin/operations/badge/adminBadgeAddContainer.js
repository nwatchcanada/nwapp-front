import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorBadgeAddComponent from "../../../../../components/areaCoordinators/admin/operations/badge/adminBadgeAddComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { postBadge } from "../../../../../actions/badgeActions";
import { validateBadgeInput } from "../../../../../validators/areaCoordinatorValidator"
import { getTagReactSelectOptions, pullTagList } from "../../../../../actions/tagActions";


class AdminAreaCoordinatorBadgeAddContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;
        this.state = {
            isLoading: false,
            typeOf: 0,
            typeOfOther: "",
            descriptionOther: "",
            amount: "",
            tags: [],
            isTagSetsLoading: true,
            is_archived: false,

            // Everything else...
            areaCoordinator: slug,
            slug: slug,
            text: "",
            errors: {},
        }
        this.getPostData = this.getPostData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
        this.onSuccessPostCallback = this.onSuccessPostCallback.bind(this);
        this.onFailurePostCallback = this.onFailurePostCallback.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onTagFetchSuccessCallback = this.onTagFetchSuccessCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (1) Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

        // (2) User
        postData.user = this.state.slug;

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

        // DEVELOPERS NOTE: Fetch our skillset list.
        this.props.pullTagList(1, 1000, new Map(), this.onTagFetchSuccessCallback);
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
                this.props.setFlashMessage("success", "Badge has been successfully added to area coordinator.");
                this.props.history.push("/admin/area-coordinator/"+this.state.slug+"/community/badges");
            }
        )
    }

    onFailurePostCallback(errors) {
        console.log("onFailurePostCallback |", errors);
        this.setState({ isLoading: false, errors: errors, });
    }

    onTagFetchSuccessCallback(response) {
        this.setState({ isTagSetsLoading: false, });
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

    onSelectChange(option) {
        const key = [option.selectName].toString();
        const value = option.value;
        const optionKey = key + "Option";

        this.setState({
            [option.selectName]: value,
            optionKey: option,
        });
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });
    }

    onSubmitClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateBadgeInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // Once our state has been validated `client-side` then we will
                // make an API request with the server to create our new production.
                this.props.postBadge(
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
        const { isLoading, slug, typeOf, typeOfOther, descriptionOther, amount, tags, isTagSetsLoading, is_archived, errors } = this.state;
        const areaCoordinator = this.props.areaCoordinatorDetail ? this.props.areaCoordinatorDetail : {};
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        return (
            <AdminAreaCoordinatorBadgeAddComponent
                slug={slug}
                typeOf={typeOf}
                typeOfOther={typeOfOther}
                descriptionOther={descriptionOther}
                amount={amount}
                tags={tags}
                tagOptions={tagOptions}
                is_archived={is_archived}
                areaCoordinator={areaCoordinator}
                flashMessage={this.props.flashMessage}
                onTextChange={this.onTextChange}
                isLoading={isLoading}
                errors={errors}
                onSubmitClick={this.onSubmitClick}
                onMultiChange={this.onMultiChange}
                isTagSetsLoading={isTagSetsLoading}
                onSelectChange={this.onSelectChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
        flashMessage: store.flashMessageState,
        areaCoordinatorFileList: store.badgeListState,
        areaCoordinatorDetail: store.areaCoordinatorDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postBadge: (postData, successCallback, failedCallback) => {
            dispatch(postBadge(postData, successCallback, failedCallback))
        },
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorBadgeAddContainer);
