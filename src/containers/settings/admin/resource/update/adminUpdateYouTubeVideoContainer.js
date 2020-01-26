import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import AdminResourceUpdateYouTubeVideoComponent from "../../../../../components/settings/admin/resource/update/adminUpdateYouTubeVideoComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullResourceItem, putResourceItem } from '../../../../../actions/resourceActions';
import { validateInput } from "../../../../../validators/resourceValidator";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';
import {
    RESOURCE_CATEGORY_CHOICES,
    RESOURCE_TYPE_OF_CHOICES,
    LINK_RESOURCE_TYPE_OF
} from "../../../../../constants/api";


class AdminResourceUpdateYouTubeVideoContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our financial data from the local
        // storage if the financial data was previously saved.
        const resource = localStorageGetObjectItem("nwapp-admin-retrieve-resource-"+slug.toString() );
        const isLoading = isEmpty(resource);

        this.state = {
            typeOf: LINK_RESOURCE_TYPE_OF,
            slug: slug,
            typeOf: resource.typeOf,
            category: resource.category,
            name: resource.name,
            embedCode: resource.embedCode,
            description: resource.description,
            isArchived: resource.isArchived,
            errors: {},
            resource: resource,
            isLoading: isLoading,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onFailureSubmissionCallback = this.onFailureSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

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
        this.props.pullResourceItem(
            this.state.slug,
            this.onSuccessCallback,
            this.onFailureCallback
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

    onSuccessfulSubmissionCallback(resource) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Resource has been successfully updated.");
        this.props.history.push("/admin/settings/resource/"+this.state.slug);
    }

    onFailureSubmissionCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessCallback(resource) {
        console.log("onSuccessCallback |", resource);
        this.setState({
            isLoading: false,
            resource: resource,
            slug: resource.slug,
            typeOf: resource.typeOf,
            category: resource.category,
            name: resource.name,
            embedCode: resource.embedCode,
            description: resource.description,
            isArchived: resource.isArchived,
        });

        // The following code will save the object to the browser's local
        // storage to be retrieved later more quickly.
        localStorageSetObjectOrArrayItem("nwapp-admin-retrieve-resource-"+this.state.slug.toString(), resource);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
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

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({
                isLoading: true,
                error: {},
            },()=>{
                // Once our state has been validated `client-side` then we will
                // make an API request with the server to create our new production.
                this.props.putResourceItem(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailureSubmissionCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
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
        const { slug, typeOf, category, name, embedCode, description, errors, isLoading } = this.state;
        return (
            <AdminResourceUpdateYouTubeVideoComponent
                slug={slug}
                typeOf={typeOf}
                category={category}
                categoryOptions={RESOURCE_CATEGORY_CHOICES}
                name={name}
                embedCode={embedCode}
                description={description}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        resource: store.resourceDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullResourceItem: (slug, successCallback, failedCallback) => {
            dispatch(pullResourceItem(slug, successCallback, failedCallback))
        },
        putResourceItem: (data, successCallback, failedCallback) => {
            dispatch(putResourceItem(data, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminResourceUpdateYouTubeVideoContainer);
