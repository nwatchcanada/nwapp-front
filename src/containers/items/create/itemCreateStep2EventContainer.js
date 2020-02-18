import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep2EventComponent from "../../../components/items/create/itemCreateStep2EventComponent";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem,
    localStorageGetDateItem, localStorageGetArrayItem,
    localStorageGetBooleanItem, localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateEventInput } from "../../../validators/itemValidator";
import { EVENT_TYPE_CHOICES, OTHER_EVENT_TYPE_OF, EVENT_ITEM_TYPE_OF } from "../../../constants/api";


class ItemCreateStep2EventContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            title: localStorage.getItem("nwapp-item-create-event-title"),
            eventTypeOf:localStorageGetIntegerItem("nwapp-item-create-event-eventTypeOf"),
            eventTypeOfOption: localStorageGetObjectItem('nwapp-item-create-event-eventTypeOfOption'),
            eventTypeOfOther: localStorage.getItem("nwapp-item-create-event-eventTypeOfOther"),
            date: localStorageGetDateItem("nwapp-item-create-event-date"),
            description: localStorage.getItem("nwapp-item-create-event-description"),
            logoPhoto: localStorageGetArrayItem("nwapp-item-create-event-logoPhoto"),
            galleryPhotos: localStorageGetArrayItem("nwapp-item-create-event-galleryPhotos"),
            shownToWhom: localStorageGetIntegerItem("nwapp-item-create-event-shownToWhom"),
            canBePostedOnSocialMedia: localStorageGetIntegerItem("nwapp-item-create-event-canBePostedOnSocialMedia"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);
        this.onGalleryDrop = this.onGalleryDrop.bind(this);
        this.onGalleryRemoveUploadClick = this.onGalleryRemoveUploadClick.bind(this);
        this.onLogoDrop = this.onLogoDrop.bind(this);
        this.onLogoRemoveUploadClick = this.onLogoRemoveUploadClick.bind(this);
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
        const key = "nwapp-item-create-event-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-item-create-event-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-item-create-event-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
    }

    onDateTimeChange(dateObj) {
        this.setState({
            date: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-item-create-event-date', dateObj);
    }

    /**
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onGalleryDrop(acceptedFiles) {
        const file = acceptedFiles[0];

        // // For debuging purposes only.
        // console.log("DEBUG | onDrop | file", file);

        const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file)
        });

        // Append our array.
        let a = this.state.galleryPhotos.slice(); //creates the clone of the state
        a.push(fileWithPreview);

        // // For debugging purposes.
        // console.log("DEBUG | onDrop | fileWithPreview", fileWithPreview);
        // console.log("DEBUG |", a, "\n");

        // Update our local state to update the GUI.
        this.setState({
            galleryPhotos: a
        })

        // Save our photos data.
        localStorageSetObjectOrArrayItem("nwapp-item-create-event-galleryPhotos", a);
    }

    onGalleryRemoveUploadClick(e, name) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Iterate through all the photos.
        const photos = this.state.galleryPhotos;
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
                    galleryPhotos: filteredPhotos
                });

                // Save our table data.
                localStorageSetObjectOrArrayItem("nwapp-item-create-event-galleryPhotos", filteredPhotos);

                // Terminate our for-loop.
                return;
            }
        }
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

            // For debugging purposes.
            console.log("DEBUG | onLogoDrop | fileWithPreview", fileWithPreview);

            // Save to local storage our OBJECT.
            localStorageSetObjectOrArrayItem("nwapp-item-create-event-logoPhoto", fileWithPreview);

            // Update our local state to update the GUI.
            this.setState({
                logoPhoto: fileWithPreview
            })
        }
    }

    onLogoRemoveUploadClick(e) {
        this.setState({
            logoPhoto: null
        })
        localStorageSetObjectOrArrayItem("nwapp-item-create-event-logoPhoto", null);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateEventInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {

            // Save for convinence the event type depending on if the user
            // chose a standard option or the `other` option.
            if (this.state.eventTypeOf.value === OTHER_EVENT_TYPE_OF) {
                localStorage.setItem('nwapp-item-create-event-pretty-event-type', this.state.eventTypeOfOther);
            } else {
                localStorage.setItem('nwapp-item-create-event-pretty-event-type', this.state.eventTypeOfOption.label);
            }

            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
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
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

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

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { title, eventTypeOf, eventTypeOfOther, date, description, logoPhoto, galleryPhotos, shownToWhom, canBePostedOnSocialMedia, errors } = this.state;
        return (
            <ItemCreateStep2EventComponent
                title={title}
                eventTypeOf={eventTypeOf}
                eventTypeOfOptions={EVENT_TYPE_CHOICES}
                eventTypeOfOther={eventTypeOfOther}
                date={date}
                description={description}
                logoPhoto={logoPhoto}
                galleryPhotos={galleryPhotos}
                shownToWhom={shownToWhom}
                canBePostedOnSocialMedia={canBePostedOnSocialMedia}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onLogoDrop={this.onLogoDrop}
                onLogoRemoveUploadClick={this.onLogoRemoveUploadClick}
                onGalleryDrop={this.onGalleryDrop}
                onGalleryRemoveUploadClick={this.onGalleryRemoveUploadClick}
                onClick={this.onClick}
                onDateTimeChange={this.onDateTimeChange}
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
)(ItemCreateStep2EventContainer);
