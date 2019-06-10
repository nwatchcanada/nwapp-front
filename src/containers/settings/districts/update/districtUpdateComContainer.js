import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import DistrictUpdateComComponent from "../../../../components/settings/districts/update/districtUpdateComComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateCommunityCaresInput, validateCommunityCaresModalSaveInput } from "../../../../validators/districtValidator";


class DistrictUpdateComContainer extends Component {
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
            // Save the slug.
            slug: slug,

            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            // Variable used to lock buttons when makig submissions.
            isLoading: false,

            // Variable used to indicate if the modal should appear.
            isShowingModal: false,

            // ALL OUR GENERAL INFORMATION IS STORED HERE.
            name: null,
            description: null,

            // ALL OUR OBJECTS ARE STORED HERE.
            streetsArray: [],

            // DEVELOPERS NOTE: The following state objects are used to store
            // the data from the modal.
            streetNumber: null,
            streetName: null,
            streetType: null,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // THIS IS WHERE THE API GETS THE DATA ON INITIAL LOAD.
        this.setState({
            slug: 'Argyle',
            icon: 'university',
            number: 1,
            name: 'Argyle',
            description: 'This is a community cares district.',
            streetsArray: [
                {
                    streetAddress: '240 First Street',
                    streetNumber: '240',
                    streetName: 'First',
                    streetType: 'Street',
                },{
                    streetAddress: '51 Downtown Avenue',
                    streetNumber: '51',
                    streetName: 'Downtown',
                    streetType: 'Avenue',
                }
            ]
        })
    };

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
        this.props.setFlashMessage("success", "District has been successfully updated.");
        this.props.history.push("/settings/district-cc/"+this.state.slug);
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
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateCommunityCaresInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onAddClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Load the modal.
        this.setState({isShowingModal: true});
    }

    onSaveClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateCommunityCaresModalSaveInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Append our array.
            let a = this.state.streetsArray.slice(); //creates the clone of the state
            const streetAddress = this.state.streetNumber+" "+this.state.streetName+" "+this.state.streetType;
            a.push({
                streetAddress: streetAddress,
                streetNumber: this.state.streetNumber,
                streetName: this.state.streetName,
                streetType: this.state.streetType,
            });

            // Update our state.
            this.setState({
                isShowingModal: false,
                errors: {},
                streetsArray: a,
            })

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                errors: errors
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onCloseClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Load the modal.
        this.setState({isShowingModal: false});
    }

    onRemoveClick(streetAddress) {
        const streetsArray = this.state.streetsArray;
        for (let i = 0; i < streetsArray.length; i++) {
            let row = streetsArray[i];

            // // For debugging purposes only.
            // console.log(row);
            // console.log(streetAddress);

            if (row.streetAddress === streetAddress) {
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = streetsArray.slice(
                    0, i
                ).concat(
                    streetsArray.slice(
                        i + 1, streetsArray.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState({
                    streetsArray: filteredItems
                });

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
        const { slug, name, description, streetNumber, streetName, streetType, errors, isShowingModal, streetsArray } = this.state;
        return (
            <DistrictUpdateComComponent
                slug={slug}
                isShowingModal={isShowingModal}
                name={name}
                description={description}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                onAddClick={this.onAddClick}
                onSaveClick={this.onSaveClick}
                onCloseClick={this.onCloseClick}
                onRemoveClick={this.onRemoveClick}
                streetsArray={streetsArray}
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
)(DistrictUpdateComContainer);
