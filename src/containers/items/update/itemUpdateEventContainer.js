import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemUpdateEventComponent from "../../../components/items/admin/update/itemUpdateEventComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/itemValidator";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF,
   EVENT_TYPE_CHOICES
} from "../../../constants/api";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetDateItem,
    localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';


class ItemUpdateEventContainer extends Component {
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
            slug: slug,
            title: "",
            description: "",
            location: "",
            date: new Date(),
            eventTypeOf: "",
            eventTypeOfOption: {},
            eventTypeOfOther: "",
            logoPhoto: {},
            galleryPhotos: [],
            shownToWhom: "",
            canBePostedOnSocialMedia: "",
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onGalleryDrop = this.onGalleryDrop.bind(this);
        this.onGalleryRemoveUploadClick = this.onGalleryRemoveUploadClick.bind(this);
        this.onLogoDrop = this.onLogoDrop.bind(this);
        this.onLogoRemoveUploadClick = this.onLogoRemoveUploadClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.setState({
            'typeOf': EVENT_ITEM_TYPE_OF,
            'icon': 'glass-cheers',
            'slug': 'byron',
            'number': 2,
            'title': 'Byron Weekend Garage Sale',
            'description': 'This is the description for byron.',
            'eventTypeOf': 2,
            'eventTypeOfOption': {selectName: "eventTypeOf", value: 2, label: "Garage Sale"},
            'eventPrettyEventTypeOf': "Garage Sale",
            'shownToWhom': 1,
            'canBePostedOnSocialMedia': 1,
            'logoPhoto': {
                'path': 'Test File #1',
                'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
            },
            'galleryPhotos': [
                {
                    'path': 'Test File #1',
                    'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
                },{
                    'path': 'Test File #2',
                    'preview': 'https://nwapp.ca/img/nwl-compressed-logo.png',
                }
            ],
            'absoluteUrl': '/item/byron'
        });
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
        this.props.setFlashMessage("success", "Item has been successfully updated.");
        this.props.history.push("/item/"+this.state.slug);
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
        })
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log("onSelectChange | optionKey", optionKey);
        console.log("onSelectChange | state", this.state);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-item-update-event-"+[e.target.name];
        const storageLabelKey =  "nwapp-item-update-event-"+[e.target.name].toString()+"-label";
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

    onDateTimeChange(dateObj) {
        this.setState({
            date: dateObj,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

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

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            slug,
            typeOf,
            title,
            description,
            date,
            location,
            eventTypeOf,
            eventTypeOfOption,
            eventTypeOfOther,
            logoPhoto,
            galleryPhotos,
            shownToWhom,
            canBePostedOnSocialMedia,
            errors,
            isLoading
        } = this.state;
        return (
            <ItemUpdateEventComponent
                slug={slug}
                typeOf={typeOf}
                title={title}
                description={description}
                date={date}
                location={location}
                eventTypeOf={eventTypeOf}
                eventTypeOfOptions={EVENT_TYPE_CHOICES}
                eventTypeOfOption={eventTypeOfOption}
                eventTypeOfOther={eventTypeOfOther}
                logoPhoto={logoPhoto}
                galleryPhotos={galleryPhotos}
                shownToWhom={shownToWhom}
                canBePostedOnSocialMedia={canBePostedOnSocialMedia}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onDateTimeChange={this.onDateTimeChange}
                onClick={this.onClick}
                onLogoDrop={this.onLogoDrop}
                onLogoRemoveUploadClick={this.onLogoRemoveUploadClick}
                onGalleryDrop={this.onGalleryDrop}
                onGalleryRemoveUploadClick={this.onGalleryRemoveUploadClick}
                onRadioChange={this.onRadioChange}
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
)(ItemUpdateEventContainer);
