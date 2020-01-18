import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminDistrictCreateStep2BizComponent from "../../../../../components/settings/admin/district/create/adminDistrictCreateStep2BizComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { validateBusinessInput } from "../../../../../validators/districtValidator";import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem
} from '../../../../../helpers/localStorageUtility';



class AdminDistrictCreateStep2BusinessContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('nwapp-district-add-name'),
            description: localStorage.getItem('nwapp-district-add-description'),
            websiteURL: localStorage.getItem('nwapp-district-add-websiteURL'),
            errors: {},
            isLoading: false,

            // DJANGO-REACT UPLOAD: STEP 1 OF 5.
            fileReader: new FileReader(), // 1 of 5 - (a)
            file: localStorageGetObjectItem('nwapp-district-add-file'), // 1 of 4 - (b)
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onRemoveUploadClick = this.onRemoveUploadClick.bind(this);

        // DJANGO-REACT UPLOAD: STEP 2 OF 5.
        this.handleFile = this.handleFile.bind(this); // 2 of 5 - (a)
        this.onDrop = this.onDrop.bind(this); // 2 of 5 - (b)
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        // this.props.setFlashMessage("success", "District has been successfully created.");
        this.props.history.push("/admin/settings/district/add/step-3");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
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
        localStorage.setItem('nwapp-district-add-'+[e.target.name], e.target.value);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateBusinessInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
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

            // Save to local storage our OBJECT.
            localStorageSetObjectOrArrayItem('nwapp-district-add-file', fileWithPreview);

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
            file: null
        })
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
            // Save to local storage our OBJECT.
            localStorageSetObjectOrArrayItem('nwapp-district-add-file-upload-content', this.state.upload_content);
            localStorage.setItem("nwapp-district-add-file-upload-filename", this.state.upload_filename)
        });
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { name, description, websiteURL, file, errors, isLoading } = this.state;
        return (
            <AdminDistrictCreateStep2BizComponent
                name={name}
                description={description}
                websiteURL={websiteURL}
                file={file}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                onDrop={this.onDrop}
                isLoading={isLoading}
                onRemoveUploadClick={this.onRemoveUploadClick}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDistrictCreateStep2BusinessContainer);
