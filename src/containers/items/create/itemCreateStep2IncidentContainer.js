import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep2IncidentComponent from "../../../components/items/create/itemCreateStep2IncidentComponent";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateIncidentInput } from "../../../validators/itemValidator";


class ItemCreateStep2IncidentContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            title: localStorage.getItem("temp-item-create-title"),
            date: localStorageGetDateItem("temp-item-create-date"),
            description: localStorage.getItem("temp-item-create-description"),
            location: localStorage.getItem("temp-item-create-location"),
            errors: {},
            isLoading: false,
            photos: localStorageGetArrayItem("temp-item-create-photos"),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onRemoveUploadClick = this.onRemoveUploadClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

    onSuccessfulSubmissionCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Item has been successfully created.");
        this.props.history.push("/item/add/step-3");
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
        const key = "temp-item-create-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('temp-item-create-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('temp-item-create-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
    }

    onDateTimeChange(dateObj) {
        this.setState({
            date: dateObj,
        })
        localStorageSetObjectOrArrayItem('temp-item-create-date', dateObj);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateIncidentInput(this.state);

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

        // // For debuging purposes only.
        // console.log("DEBUG | onDrop | file", file);

        const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file)
        });

        // Append our array.
        let a = this.state.photos.slice(); //creates the clone of the state
        a.push(fileWithPreview);

        // // For debugging purposes.
        // console.log("DEBUG | onDrop | fileWithPreview", fileWithPreview);
        // console.log("DEBUG |", a, "\n");

        // Update our local state to update the GUI.
        this.setState({
            photos: a
        })
    }

    onRemoveUploadClick(e, name) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Iterate through all the photos.
        const photos = this.state.photos;
        for (let i = 0; i < photos.length; i++) {
            let row = photos[i];

            // // For debugging purposes only.
            // console.log(row);
            // console.log(photos);

            if (row.name === name) {
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredPhotos = photos.slice(
                    0, i
                ).concat(
                    photos.slice(
                        i + 1, photos.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState({
                    photos: filteredPhotos
                });

                // Save our table data.
                localStorageSetObjectOrArrayItem("temp-item-create-photos", filteredPhotos);

                // Terminate our for-loop.
                return;
            }
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { title, date, description, location, photos, errors } = this.state;
        return (
            <ItemCreateStep2IncidentComponent
                title={title}
                date={date}
                description={description}
                location={location}
                photos={photos}
                errors={errors}
                onTextChange={this.onTextChange}
                onDateTimeChange={this.onDateTimeChange}
                onClick={this.onClick}
                onDrop={this.onDrop}
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
)(ItemCreateStep2IncidentContainer);
