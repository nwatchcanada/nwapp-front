import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminWatchInfoUpdateComponent from "../../../../components/watches/admin/update/adminInfoUpdateComponent";
import { validateStep2CreateInput } from "../../../../validators/watchValidator";
import { getAssociateReactSelectOptions } from '../../../../actions/watchActions';
import { pullDistrictList, getDistrictReactSelectOptions } from '../../../../actions/districtActions';
import { getAreaCoordinatorReactSelectOptions } from '../../../../actions/areaCoordinatorActions';
import { pullTagList, getTagReactSelectOptions, getPickedTagReactSelectOptions } from "../../../../actions/tagActions";
import { putWatchInformation } from "../../../../actions/watchActions";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    BASIC_STREET_TYPE_CHOICES,
    STREET_DIRECTION_CHOICES,
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from "../../../../constants/api";



class AdminWatchInfoUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        const transcodedTags = getPickedTagReactSelectOptions(this.props.watchDetail.tags, this.props.tagList)

        this.state = {
            slug: slug,
            typeOf: this.props.watchDetail.typeOf,
            tags: transcodedTags,
            isTagLoading: true,
            name: this.props.watchDetail.name,
            description: this.props.watchDetail.description,
            // associate: localStorage.getItem('nwapp-watch-associate'),
            // associateOption: localStorageGetObjectItem('nwapp-watch-associateOption'),
            district: this.props.watchDetail.districtSlug,
            // districtOption: localStorageGetObjectItem('nwapp-watch-districtOption'),
            isDistrictLoading: true,
            isVirtual: this.props.watchDetail.isVirtual,
            errors: {},
            isLoading: false,
        }

        // Page related.
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onDistrictSuccessCallback = this.onDistrictSuccessCallback.bind(this);
        this.onDistrictFailureCallback = this.onDistrictFailureCallback.bind(this);
        this.onTagSuccessCallback = this.onTagSuccessCallback.bind(this);
        this.onTagFailureCallback = this.onTagFailureCallback.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessfulPutCallback = this.onSuccessfulPutCallback.bind(this);
        this.onFailurePutCallback = this.onFailurePutCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (3) Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

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
        const parametersMap = new Map();
        parametersMap.set("is_archived", 3); // 3 = TRUE | 2 = FALSE
        parametersMap.set("o", "-created_at");
        this.props.pullTagList(
            1,
            10000,
            parametersMap,
            this.onTagSuccessCallback,
            this.onTagFailureCallback
        );
        parametersMap.set("type_of", this.state.typeOf);
        this.props.pullDistrictList(
            1,
            10000,
            parametersMap,
            this.onDistrictSuccessCallback,
            this.onDistrictFailureCallback
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

    onDistrictSuccessCallback(response) {
        console.log(response);
        this.setState({ isDistrictLoading: false, }, ()=>{
            console.log("onDistrictSuccessCallback: Successfully loaded the districts list.");
        });
    }

    onDistrictFailureCallback(errors) {
        this.setState({ errors: errors, isDistrictLoading: false, }, ()=>{
            console.log("onDistrictSuccessCallback: Failed loading the districts list.");
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTagSuccessCallback(response) {
        console.log(response);
        this.setState({ isTagLoading: false, }, ()=>{
            console.log("onTagSuccessCallback: Successfully loaded the districts list.");
        });
    }

    onTagFailureCallback(errors) {
        this.setState({ errors: errors, isTagLoading: false, }, ()=>{
            console.log("onTagSuccessCallback: Failed loading the districts list.");
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessfulPutCallback(response) {
        this.setState({ errors: {}, });
        this.props.setFlashMessage("success", "Watch has been successfully updated.");
        this.props.history.push("/admin/watch/"+this.state.slug);
    }

    onFailurePutCallback(errors) {
        this.setState({ errors: errors, isTagLoading: false, }, ()=>{
            console.log("onFailurePutCallback: Failed putting watch details.");
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
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

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep2CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, });

            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putWatchInformation(
                this.getPostData(),
                this.onSuccessfulPutCallback,
                this.onFailurePutCallback
            );

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors });

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
        const {
            slug, tags, isTagLoading, name, description, district, isDistrictLoading, isVirtual, errors, isLoading
        } = this.state;

        const districtOptions = getDistrictReactSelectOptions(this.props.districtList, "district");
        const tagOptions = getTagReactSelectOptions(this.props.tagList, "tags");

        // // For debugging purposes only.
        // console.log("districtOptions", districtOptions);
        // console.log("tagOptions", tagOptions);

        return (
            <AdminWatchInfoUpdateComponent
                watchDetail={this.props.watchDetail}
                slug={slug}
                tags={tags}
                isTagLoading={isTagLoading}
                tagOptions={tagOptions}
                name={name}
                description={description}
                district={district}
                isDistrictLoading={isDistrictLoading}
                isVirtual={isVirtual}
                districtOptions={districtOptions}
                errors={errors}
                isLoading={isLoading}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
                onCheckboxChange={this.onCheckboxChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        watchDetail: store.watchDetailState,
        districtList: store.districtListState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDistrictList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullDistrictList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
        pullTagList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
        putWatchInformation: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putWatchInformation(data, onSuccessCallback, onFailureCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchInfoUpdateContainer);
