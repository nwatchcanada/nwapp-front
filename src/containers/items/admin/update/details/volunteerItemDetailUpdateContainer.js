import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import VolunteerItemDetailUpdateComponent from "../../../../../components/items/admin/update/details/communityNewsItemDetailUpdateComponent";
import { localStorageGetObjectItem } from '../../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { putItemDetail } from "../../../../../actions/itemActions";
import convertBinaryFileToBase64String from "../../../../../helpers/base64Helper";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF,
    COMMUNITY_NEWS_ITEM_TYPE_OF,
    VOLUNTEER_ITEM_TYPE_OF,
    RESOURCE_ITEM_TYPE_OF
 } from "../../../../../constants/api";


class VolunteerItemDetailUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our data from the local
        // storage if the data was previously saved.
        const item = localStorageGetObjectItem("nwapp-admin-retrieve-item-"+slug.toString() );

        this.state = {
            slug: slug,
            errors: {},
            isLoading: false,
            item: item,
            typeOf: item.typeOfCategory,
            description: item.description,                           // Volunteer | Event |
            externalUrl: item.externalUrl,                           // xxxxxxxx | Event |
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onLogoDrop = this.onLogoDrop.bind(this);
        this.onLogoDropSaveAsBase64ContentCallback = this.onLogoDropSaveAsBase64ContentCallback.bind(this);
        this.onLogoRemoveUploadClick = this.onLogoRemoveUploadClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulPutCallback = this.onSuccessfulPutCallback.bind(this);
        this.onFailurePutCallback = this.onFailurePutCallback.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
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
                isItemTypeLoading: false,
                errors: []
            },
            ()=>{
                console.log("onSuccessListCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessListCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureListCallback(errors) {
        console.log(errors);
        this.setState({ isItemTypeLoading: false });
    }

    onSuccessfulPutCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Item has been successfully updated.");
        this.props.history.push("/admin/item/"+this.state.slug);
    }

    onFailurePutCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Volunteer handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState(
            {
                [option.selectName]: option.value,
                [optionKey]: option,
            },
            ()=>{
                console.log(this.state);
            }
        );
    }

    onLogoDropSaveAsBase64ContentCallback(base64Content, fileName) {
        const base64EventLogoImage = { // Save our base64 string.
            fileName: fileName,
            data: base64Content
        };

        this.setState({ // Update our local state to update the GUI.
            base64EventLogoImage: base64EventLogoImage
        });
    }

    /**
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onLogoDrop(acceptedFiles) {
        const file = acceptedFiles[0];

        // For debuging purposes only.
        console.log("DEBUG | onLogoDrop | file", file);

        if (file !== undefined && file !== null) {
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });

            convertBinaryFileToBase64String(
                file,
                this.onLogoDropSaveAsBase64ContentCallback,
                function(error) {
                    alert(error);
                }
            );

            // For debugging purposes.
            console.log("DEBUG | onLogoDrop | fileWithPreview", fileWithPreview);

            // Update our local state to update the GUI.
            this.setState({
                eventLogoImage: fileWithPreview
            });
        }
    }

    onLogoRemoveUploadClick(e) {
        this.setState({
            eventLogoImage: null
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-item-create-event-"+[e.target.name];
        const storageLabelKey =  "nwapp-item-create-event-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onClick(e) {
        // Princident the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true, }, ()=>{
            this.props.putItemDetail(
                this.getPostData(),
                this.onSuccessfulPutCallback,
                this.onFailurePutCallback
            );
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            typeOf, description, slug, errors, isLoading,
            externalUrl
        } = this.state;
        return (
            <VolunteerItemDetailUpdateComponent
                slug={slug}
                errors={errors}
                typeOf={typeOf}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onLogoDrop={this.onLogoDrop}
                onLogoRemoveUploadClick={this.onLogoRemoveUploadClick}
                onClick={this.onClick}
                isLoading={isLoading}
                description={description}
                externalUrl={externalUrl}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putItemDetail: (data, onSuccessfulPutCallback, onFailurePutCallback) => {
            dispatch(
                putItemDetail(data, onSuccessfulPutCallback, onFailurePutCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VolunteerItemDetailUpdateContainer);
