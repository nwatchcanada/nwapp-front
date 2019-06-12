import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import DistrictCreateStep2BizComponent from "../../../../components/settings/districts/create/districtCreateStep2BizComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateBusinessInput } from "../../../../validators/districtValidator";


class DistrictCreateStep2BusinessContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('temp-district-biz-name'),
            description: localStorage.getItem('temp-district-biz-description'),
            websiteURL: localStorage.getItem('temp-district-biz-websiteURL'),
            logo: JSON.parse(localStorage.getItem('temp-district-biz-logo')),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        // this.props.setFlashMessage("success", "District has been successfully created.");
        this.props.history.push("/settings/district/step-3-create-biz");
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
        localStorage.setItem('temp-district-biz-'+[e.target.name], e.target.value);
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
            localStorage.setItem('temp-district-biz-logo', JSON.stringify(fileWithPreview));

            // Update our local state to update the GUI.
            this.setState({
                logo: fileWithPreview
            })
        }
    }

    onRemoveUploadClick(e) {
        this.setState({
            logo: null
        })
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { name, description, websiteURL, logo, errors, isLoading } = this.state;
        return (
            <DistrictCreateStep2BizComponent
                name={name}
                description={description}
                websiteURL={websiteURL}
                logo={logo}
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
)(DistrictCreateStep2BusinessContainer);
