import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import OrderListComponent from "../../../../../components/areaCoordinators/admin/retrieve/fileUpload/adminFileUploadAddComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { postPrivateFileUpload } from "../../../../../actions/privateFileUploadActions";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { validateInput } from "../../../../../validators/fileValidator"
import { getTagReactSelectOptions, pullTagList } from "../../../../../actions/tagActions";


class AdminAreaCoordinatorFileUploadAddContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;
        this.state = {
            isLoading: false,
            title: "",
            description: "",
            fileReader: new FileReader(), // DJANGO-REACT UPLOAD: STEP 1 OF 4.
            tags: [],
            isTagSetsLoading: true,
            is_archived: false,

            // Everything else...
            areaCoordinator: slug,
            file: null,
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
        this.onFileDrop = this.onFileDrop.bind(this);
        this.onRemoveFileUploadClick = this.onRemoveFileUploadClick.bind(this);
        this.handleFile = this.handleFile.bind(this); // DJANGO-REACT UPLOAD: STEP 2 OF 4.
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
                this.props.setFlashMessage("success", "AreaCoordinator file has been successfully created.");
                this.props.history.push("/admin/areaCoordinator/"+this.state.slug+"/files");
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

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });
    }

    handleFile(e) { // DJANGO-REACT UPLOAD: STEP 3 OF 4.
        const content = this.state.fileReader.result;
        this.setState({
            errors: {},
            isLoading: true,
            upload_content: content,
            upload_filename: this.state.file.name,
            // upload_filename: this.state.fileReader
        }, ()=>{
            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

            // Once our state has been validated `areaCoordinator-side` then we will
            // make an API request with the server to create our new production.
            this.props.postPrivateFileUpload(
                this.getPostData(),
                this.onSuccessPostCallback,
                this.onFailurePostCallback
            );
        });
    }

    onClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            // DJANGO-REACT UPLOAD: STEP 4 OF 4.
            // DEVELOPERS NOTE:
            // (1) http://jsbin.com/piqiqecuxo/1/edit?js,console,output
            // (2) https://stackoverflow.com/questions/51272255/how-to-use-filereader-in-react
            var fileReader = new FileReader();
            fileReader.readAsDataURL(this.state.file);
            fileReader.onload = this.handleFile;
            fileReader.onerror = function (error) {
                console.log('Error: ', error);
            };
            this.setState({
                fileReader: fileReader,
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
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onFileDrop(acceptedFiles) {
        console.log("DEBUG | onFileDrop | acceptedFiles", acceptedFiles);
        const file = acceptedFiles[0];

        // For debuging purposes only.
        console.log("DEBUG | onFileDrop | file", file);

        if (file !== undefined && file !== null) {
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });

            // For debugging purposes.
            console.log("DEBUG | onFileDrop | fileWithPreview", fileWithPreview);

            // Update our local state to update the GUI.
            this.setState({
                file: fileWithPreview
            })
        }
    }

    onRemoveFileUploadClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Clear uploaded file.
        this.setState({
            file: null
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, slug, title, description, tags, isTagSetsLoading, is_archived, errors, file } = this.state;
        const areaCoordinator = this.props.areaCoordinatorDetail ? this.props.areaCoordinatorDetail : {};
        const areaCoordinatorFiles = this.props.areaCoordinatorFileList ? this.props.areaCoordinatorFileList.results : [];
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        return (
            <OrderListComponent
                slug={slug}
                title={title}
                description={description}
                tags={tags}
                tagOptions={tagOptions}
                is_archived={is_archived}
                areaCoordinator={areaCoordinator}
                areaCoordinatorFiles={areaCoordinatorFiles}
                flashMessage={this.props.flashMessage}
                onTextChange={this.onTextChange}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
                file={file}
                onFileDrop={this.onFileDrop}
                onRemoveFileUploadClick={this.onRemoveFileUploadClick}
                onMultiChange={this.onMultiChange}
                isTagSetsLoading={isTagSetsLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
        flashMessage: store.flashMessageState,
        areaCoordinatorFileList: store.privateFileUploadListState,
        areaCoordinatorDetail: store.areaCoordinatorDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        postPrivateFileUpload: (postData, successCallback, failedCallback) => {
            dispatch(postPrivateFileUpload(postData, successCallback, failedCallback))
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
)(AdminAreaCoordinatorFileUploadAddContainer);
