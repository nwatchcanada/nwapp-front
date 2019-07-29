import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemUpdateComponent from "../../../components/items/update/itemUpdateComponent";
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


class ItemUpdateContainer extends Component {
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
            eventTypeOf: "",
            eventTypeOfOption: {},
            eventTypeOfOther: "",
            logoPhoto: {},
            galleryPhotos: [],
            date: new Date(),
            photos: [],
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onRemoveUploadClick = this.onRemoveUploadClick.bind(this);
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

        //TODO: REPLACE THIS CODE WITH API FETCHING CODE.
        const itemsArray = [{
            'typeOf': INCIDENT_ITEM_TYPE_OF,
            'icon': 'fire',
            'slug': 'argyle',
            'number': 1,
            'title': 'Argyle',
            'description': 'This is the description for argyle.',
            'location': 'London',
            'photos': [
                {
                    'path': 'Test File #1',
                    'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
                },{
                    'path': 'Test File #2',
                    'preview': 'https://nwapp.ca/img/nwl-compressed-logo.png',
                }
            ],
            'absoluteUrl': '/item/argyle'
        },{
            'typeOf': EVENT_ITEM_TYPE_OF,
            'icon': 'glass-cheers',
            'slug': 'byron',
            'number': 2,
            'title': 'Byron Weekend Garage Sale',
            'description': 'This is the description for byron.',
            'eventTypeOf': 2,
            'eventTypeOfOption': {selectName: "eventTypeOf", value: 2, label: "Garage Sale"},
            'eventPrettyEventTypeOf': "Garage Sale",
            'absoluteUrl': '/item/byron'
        },{
            'typeOf': CONCERN_ITEM_TYPE_OF,
            'icon': 'exclamation-circle',
            'slug': 'carling',
            'number': 3,
            'title': 'Carling',
            'description': 'This is the description for carling.',
            'location': 'London',
            'photos': [
                {
                    'path': 'Test File #1',
                    'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
                },{
                    'path': 'Test File #2',
                    'preview': 'https://nwapp.ca/img/nwl-compressed-logo.png',
                }
            ],
            'absoluteUrl': '/item/carling'
        },{
            'typeOf': INFORMATION_ITEM_TYPE_OF,
            'icon': 'info-circle',
            'slug': 'darlyn',
            'number': 4,
            'title': null,
            'description': 'What is the contact information for my area coordinator, I need to speak with her, this is in regards to a private matter.',
            'absoluteUrl': '/item/darlyn'
        }];
        for (let i = 0; i < itemsArray.length; i++) {
            const itemData = itemsArray[i];
            if (itemData['slug'] === this.state.slug) {
                this.setState({
                    'typeOf': itemData.typeOf,
                    'title': itemData.title,
                    'slug': itemData.slug,
                    'number': itemData.number,
                    'name': itemData.name,
                    'description': itemData.description,
                    'location': itemData.location,
                    'eventTypeOf': itemData.eventTypeOf,
                    'eventTypeOfOption': itemData.eventTypeOfOption,
                    'eventPrettyEventTypeOf': itemData.eventPrettyEventTypeOf,
                    'photos': itemData.photos,
                    'absoluteUrl': itemData.absoluteUrl,
                });
            }
        }
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

                // Terminate our for-loop.
                return;
            }
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
            location,
            eventTypeOf,
            eventTypeOfOption,
            eventTypeOfOther,
            logoPhoto,
            galleryPhotos,
            date,
            photos,
            errors,
            isLoading
        } = this.state;
        return (
            <ItemUpdateComponent
                slug={slug}
                typeOf={typeOf}
                title={title}
                description={description}
                location={location}
                eventTypeOf={eventTypeOf}
                eventTypeOfOptions={EVENT_TYPE_CHOICES}
                eventTypeOfOption={eventTypeOfOption}
                eventTypeOfOther={eventTypeOfOther}
                logoPhoto={logoPhoto}
                galleryPhotos={galleryPhotos}
                date={date}
                photos={photos}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onDateTimeChange={this.onDateTimeChange}
                onClick={this.onClick}
                onDrop={this.onDrop}
                onRemoveUploadClick={this.onRemoveUploadClick}
                onLogoDrop={this.onLogoDrop}
                onLogoRemoveUploadClick={this.onLogoRemoveUploadClick}
                onGalleryDrop={this.onGalleryDrop}
                onGalleryRemoveUploadClick={this.onGalleryRemoveUploadClick}
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
)(ItemUpdateContainer);
