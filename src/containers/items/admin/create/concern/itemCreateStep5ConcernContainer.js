import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep5ConcernComponent from "../../../../../components/items/admin/create/concern/itemCreateStep5ConcernComponent";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../../../helpers/localStorageUtility';
import convertBinaryFileToBase64String from "../../../../../helpers/base64Helper";


class ItemCreateStep5ConcernContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            photos: localStorageGetArrayItem("nwapp-item-create-concern-photos"),
            base64Photos: localStorageGetArrayItem("nwapp-item-create-concern-base64Photos"),
        }

        this.onDrop = this.onDrop.bind(this);
        this.onDropSaveAsBase64ContentCallback = this.onDropSaveAsBase64ContentCallback.bind(this);
        this.onRemoveUploadClick = this.onRemoveUploadClick.bind(this);
        this.runGarbageCollectionOnBase64PhotosOnLocalStorage = this.runGarbageCollectionOnBase64PhotosOnLocalStorage.bind(this);
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.runGarbageCollectionOnBase64PhotosOnLocalStorage();

        this.setState({ errors: {}, })
        this.props.history.push("/admin/item/add/step-6-concern");
    }

    onDropSaveAsBase64ContentCallback(base64Content, fileName) {
        let a = this.state.base64Photos.slice(); //creates the clone of the state
        a.push({ // Save our base64 string.
            fileName: fileName,
            data: base64Content
        });
        this.setState({ // Update our local state to update the GUI.
            base64Photos: a
        })

        // Save our photos data.
        localStorageSetObjectOrArrayItem("nwapp-item-create-concern-base64Photos", a);
    }

    /**
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onDrop(acceptedFiles) {
        const file = acceptedFiles[0];

        //
        convertBinaryFileToBase64String(
            file,
            this.onDropSaveAsBase64ContentCallback,
            function(error) {
                alert(error);
            }
        );

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

        // Save our photos data.
        localStorageSetObjectOrArrayItem("nwapp-item-create-concern-photos", a);
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
                localStorageSetObjectOrArrayItem("nwapp-item-create-concern-photos", filteredPhotos);

                // Terminate our for-loop.
                return;
            }
        }
    }

    /**
     *  Function will iterate through the `photos` array and the `base64Photos`
     *  array and update the `localStorage` to have the `base64Photos` saved
     *  which belong to the `photos` array. If any `base64Photos` do not exist
     *  in `photos` array then the `base64Photos` will not be saved.
     */
    runGarbageCollectionOnBase64PhotosOnLocalStorage() {
        let base64Photo;
        let binPhoto;
        let newBase64Photos = [];
        for (base64Photo of this.state.base64Photos) {
            for (binPhoto of this.state.photos) {
                if (binPhoto.path === base64Photo.fileName) {
                    newBase64Photos.push(base64Photo);
                    break;
                }
            }
        }
        localStorageSetObjectOrArrayItem("nwapp-item-create-concern-base64Photos", newBase64Photos);
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { photos, errors } = this.state;
        return (
            <ItemCreateStep5ConcernComponent
                photos={photos}
                errors={errors}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep5ConcernContainer);
