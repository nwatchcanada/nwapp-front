import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminResourceCreateStep2ImageComponent from "../../../../../components/settings/admin/resource/create/adminCreateStep2ImageComponent";
import { validateInput } from "../../../../../validators/resourceValidator";
import {
    RESOURCE_CATEGORY_CHOICES,
    IMAGE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import {
    localStorageGetIntegerItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetObjectItem
} from '../../../../../helpers/localStorageUtility';


class AdminResourceCreateStep2ImageContainer extends Component {
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
            category: localStorageGetIntegerItem("nwapp-resource-add-category"),
            categoryOption: localStorageGetObjectItem('nwapp-register-categoryOption'),
            typeOf: IMAGE_RESOURCE_TYPE_OF,
            name: localStorage.getItem('nwapp-resource-add-name'),
            imageFile: null,
            description: localStorage.getItem('nwapp-resource-add-description'),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.onRemoveImageUploadClick = this.onRemoveImageUploadClick.bind(this);
        this.onClick = this.onClick.bind(this);
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
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onImageDrop(acceptedFiles) {
        console.log("DEBUG | onImageDrop | acceptedFiles", acceptedFiles);
        const file = acceptedFiles[0];

        // For debuging purposes only.
        console.log("DEBUG | onImageDrop | file", file);

        if (file !== undefined && file !== null) {
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });

            // For debugging purposes.
            console.log("DEBUG | onImageDrop | fileWithPreview", fileWithPreview);

            // Update our local state to update the GUI.
            this.setState({
                imageFile: fileWithPreview
            })
        }
    }

    onRemoveImageUploadClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Clear image.
        this.setState({
            imageFile: null
        })
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
        const { category, name, imageFile, description, errors } = this.state;
        return (
            <AdminResourceCreateStep2ImageComponent
                category={category}
                categoryOptions={RESOURCE_CATEGORY_CHOICES}
                name={name}
                imageFile={imageFile}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onImageDrop={this.onImageDrop}
                onRemoveImageUploadClick={this.onRemoveImageUploadClick}
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
)(AdminResourceCreateStep2ImageContainer);
