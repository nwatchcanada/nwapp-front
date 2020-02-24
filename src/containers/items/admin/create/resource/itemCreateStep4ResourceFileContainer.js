import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep4ResourceFileComponent from "../../../../../components/items/admin/create/resource/itemCreateStep4ResourceFileComponent";
import { validateInput } from "../../../../../validators/resourceValidator";
import {
    RESOURCE_CATEGORY_CHOICES,
    IMAGE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import {
    localStorageSetObjectOrArrayItem,
    localStorageGetObjectItem,
    localStorageRemoveItemsContaining
} from '../../../../../helpers/localStorageUtility';


class ItemCreateStep4ResourceFileContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

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
            typeOf: IMAGE_RESOURCE_TYPE_OF,
            name: localStorage.getItem('nwapp-resource-add-name'),
            // file: null,
            description: localStorage.getItem('nwapp-resource-add-description'),

            // DJANGO-REACT UPLOAD: STEP 1 OF 5.
            fileReader: new FileReader(), // 1 of 5 - (a)
            file: localStorageGetObjectItem('nwapp-resource-add-file'), // 1 of 4 - (b)
            upload_content: localStorageGetObjectItem('nwapp-resource-add-file-upload-content'),
            upload_filename: localStorage.getItem("nwapp-resource-add-file-upload-filename"),
            uploadContent: localStorageGetObjectItem('nwapp-resource-add-file-upload-content'),
            uploadFilename: localStorage.getItem("nwapp-resource-add-file-upload-filename"),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);

        // DJANGO-REACT UPLOAD: STEP 2 OF 5.
        this.handleFile = this.handleFile.bind(this); // 2 of 5 - (a)
        this.onDrop = this.onDrop.bind(this); // 2 of 5 - (b)
        this.onRemoveUploadClick = this.onRemoveUploadClick.bind(this);
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        localStorage.setItem('nwapp-resource-add-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log("optionKey", optionKey);
        localStorage.setItem('nwapp-resource-add-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-resource-add-'+optionKey, option);
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
            localStorageSetObjectOrArrayItem('nwapp-resource-add-file', fileWithPreview);

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
        localStorageRemoveItemsContaining("nwapp-resource-add-file-upload-");
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
            localStorageSetObjectOrArrayItem('nwapp-resource-add-file-upload-content', this.state.upload_content);
            localStorage.setItem("nwapp-resource-add-file-upload-filename", this.state.upload_filename)
        });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            console.log("STATE:\n",this.state,"\n\n");
            this.props.history.push("/admin/settings/resource/add/step-3");

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
        const { name, file, description, errors } = this.state;
        return (
            <ItemCreateStep4ResourceFileComponent
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
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep4ResourceFileContainer);
