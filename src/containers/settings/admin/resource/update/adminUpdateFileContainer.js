import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminResourceUpdateFileComponent from "../../../../../components/settings/admin/resource/update/adminUpdateFileComponent";
import { validateInput } from "../../../../../validators/resourceValidator";
import {
    RESOURCE_CATEGORY_CHOICES,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullResourceItem, putResourceItem } from '../../../../../actions/resourceActions';


class AdminResourceUpdateFileContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            // Variable used to lock buttons when makig submissions.
            isLoading: false,

            // ALL OUR GENERAL INFORMATION IS STORED HERE.
            slug: slug,
            category: this.props.resource.category,
            // categoryOption: localStorageGetObjectItem('nwapp-register-categoryOption'),
            typeOf: FILE_RESOURCE_TYPE_OF,
            name: this.props.resource.name,
            // file: null,
            description: this.props.resource.description,

            // DJANGO-REACT UPLOAD: STEP 1 OF 5.
            fileReader: new FileReader(), // 1 of 5 - (a)
            file: this.props.resource.fileUrl, // 1 of 4 - (b)
            // uploadContent:
            // uploadFilename:
            isArchived: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailureSubmissionCallback = this.onFailureSubmissionCallback.bind(this);

        // DJANGO-REACT UPLOAD: STEP 2 OF 5.
        this.handleFile = this.handleFile.bind(this); // 2 of 5 - (a)
        this.onDrop = this.onDrop.bind(this); // 2 of 5 - (b)
        this.onRemoveUploadClick = this.onRemoveUploadClick.bind(this);
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

    /**
     *  DJANGO-REACT UPLOAD: STEP 3 OF 5.
     *
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onDrop(acceptedFiles) {
        const file = acceptedFiles[0];

        // For debuging purposes only.
        console.log("DEBUG | onDrop | file", file);

        if (file !== undefined && file !== null) {
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });

            // For debugging purposes.
            console.log("DEBUG | onDrop | fileWithPreview", fileWithPreview);

            // Update our local state to update the GUI.
            this.setState({
                file: fileWithPreview
            },()=>{

                // DJANGO-REACT UPLOAD: STEP 4 OF 5.
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

            });
        }
    }

    onRemoveUploadClick(e) {
        this.setState({
            fileReader: new FileReader(),
            file: null
        });
    }

    /*
     * DJANGO-REACT UPLOAD: STEP 5 OF 5.
     */
    handleFile(e) {
        const content = this.state.fileReader.result;
        console.log(this.state.fileReader);
        this.setState({
            errors: {},
            isLoading: false,
            upload_content: content,
            upload_filename: this.state.file.name,
            // upload_filename: this.state.fileReader
        }, ()=>{
            console.log("\n\n\n");
            console.log(this.state);
            console.log("\n\n\n");
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, });

            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putResourceItem(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailureSubmissionCallback
            );

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                errors: errors, isLoading: false,
            })

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
        const { slug, category, name, file, description, errors } = this.state;
        return (
            <AdminResourceUpdateFileComponent
                slug={slug}
                category={category}
                categoryOptions={RESOURCE_CATEGORY_CHOICES}
                name={name}
                file={file}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onDrop={this.onDrop}
                onRemoveUploadClick={this.onRemoveUploadClick}
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
        putResourceItem: (data, successCallback, failedCallback) => {
            dispatch(putResourceItem(data, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminResourceUpdateFileContainer);
