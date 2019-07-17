import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import DistrictCreateStep2ComComponent from "../../../../components/settings/districts/create/districtCreateStep2ComComponent";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateCommunityCaresInput, validateCommunityCaresModalSaveInput } from "../../../../validators/districtValidator";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";


class DistrictCreateStep2CommunityCareContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract our plants array (which is used to populate the table) from
        // the users's local storage.
        const stringStreetsArr = localStorage.getItem("nwapp-district-com-streets");
        let streetsArr = JSON.parse(stringStreetsArr);
        if (streetsArr  === undefined || streetsArr === null) {
            streetsArr = [];
        }

        this.state = {
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
            name: localStorage.getItem('nwapp-district-com-name'),
            description: localStorage.getItem('nwapp-district-com-description'),

            // ALL OUR OBJECTS ARE STORED HERE.
            streetsArray: streetsArr,

            // DEVELOPERS NOTE: The following state objects are used to store
            // the data from the modal.
            streetNumber: "",
            streetName: "",
            streetType: "",
            streetTypeOption: localStorageGetObjectItem('nwapp-district-com-streetTypeOption'),
            streetTypeOther: "",
            streetDirection: "",
            streetDirectionOption: localStorageGetObjectItem('nwapp-district-com-streetDirectionOption'),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
        this.props.history.push("/settings/district/step-3-create-cc");
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
        localStorage.setItem('nwapp-district-com-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-district-com-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-district-com-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
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

            // Generate our new address.
            const actualStreetType = this.state.streetType === "Other" ? this.state.streetTypeOther : this.state.streetType;
            let streetAddress = this.state.streetNumber+" "+this.state.streetName+" "+actualStreetType;
            if (this.state.streetDirection) {
                streetAddress += " " + this.state.streetDirection;
            }

            // Append our array.
            let a = this.state.streetsArray.slice(); //creates the clone of the state
            a.push({
                streetAddress: streetAddress,
                streetNumber: this.state.streetNumber,
                streetName: this.state.streetName,
                streetType: actualStreetType,
                streetDirection: this.state.streetDirection,
            });

            // Update our state.
            this.setState({
                isShowingModal: false,
                errors: {},
                streetsArray: a,
                streetNumber: "", // Clear fields.
                streetName: "",
                streetType: "",
                streetTypeOther: "",
                streetDirection: "",
            });

            // Save our table data.
            localStorage.setItem("nwapp-district-com-streets", JSON.stringify(a))

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
        this.setState({
            isShowingModal: false,
            errors:{},
            streetNumber: "",  // Clear fields.
            streetName: "",
            streetType: "",
            streetTypeOther: "",
            streetDirection: ""
        });
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

                // Save our table data.
                localStorage.setItem("nwapp-district-com-streets", JSON.stringify(filteredItems))

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
        const { name, description, streetNumber, streetName, streetType, streetTypeOther, streetDirection, errors, isShowingModal, streetsArray } = this.state;
        return (
            <DistrictCreateStep2ComComponent
                isShowingModal={isShowingModal}
                name={name}
                description={description}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
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
)(DistrictCreateStep2CommunityCareContainer);
