import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import {
    validateResidentialStep3Input, validateModalSaveInput
} from "../../../../validators/watchValidator";
import AdminWatchCreateStep3Component from "../../../../components/watches/admin/create/adminCreateStep3Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { getAssociateReactSelectOptions } from '../../../../actions/watchActions';
import { getDistrictReactSelectOptions } from '../../../../actions/districtActions';
import { getAreaCoordinatorReactSelectOptions } from '../../../../actions/areaCoordinatorActions';
import { getTagReactSelectOptions } from "../../../../actions/tagActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";


class AdminWatchCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            streetMembership: localStorageGetArrayItem('nwapp-watch-streetMembership'),
            errors: {},
            streetNumberStart: "",
            streetNumberEnd: "",
            streetName: "",
            streetType: "",
            streetTypeOption: localStorageGetObjectItem('nwapp-watch-streetTypeOption'),
            streetTypeOther: "",
            streetDirection: "",
            streetDirectionOption: localStorageGetObjectItem('nwapp-watch-streetDirectionOption'),
            showModal: false, // Variable used to indicate if the modal should appear.
        }

        // Page related.
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);

        // Modal related.
        this.onAddClick = this.onAddClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
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
        })
        localStorage.setItem('nwapp-watch-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-watch-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-watch-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'nwapp-watch-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialStep3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, });
            this.props.history.push("/admin/watches/step-4-create");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors, });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onAddClick(e) {
        e.preventDefault();  // Prevent the default HTML form submit code to run on the browser side.
        this.setState({
            showModal: true,
            errors: {},
        });  // Load the modal.
    }

    onRemoveClick(streetAddress) {
        const streetMembership = this.state.streetMembership;
        for (let i = 0; i < streetMembership.length; i++) {
            let row = streetMembership[i];

            // // For debugging purposes only.
            // console.log(row);
            // console.log(streetAddress);

            if (row.streetAddress === streetAddress) {
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = streetMembership.slice(
                    0, i
                ).concat(
                    streetMembership.slice(
                        i + 1, streetMembership.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState({
                    streetMembership: filteredItems
                });

                // Save our table data.
                localStorageSetObjectOrArrayItem("nwapp-watch-streetMembership", filteredItems);

                // Terminate our for-loop.
                return;
            }
        }
    }

    onSaveClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateModalSaveInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Get our `streetDirection` value and label.
            let streetDirectionOverride;
            let streetDirectionLabelOverride;
            if (this.state.streetDirection === undefined || this.state.streetDirection === null || this.state.streetDirection === "" || isNaN(this.state.streetDirection)) {
                streetDirectionOverride = 0;
                streetDirectionLabelOverride = "-";
            } else {
                streetDirectionOverride = this.state.streetDirection;
                streetDirectionLabelOverride = STREET_DIRECTION_CHOICES[this.state.streetDirection]['label'];
            }

            // Get our `streetType` value and label.
            let streetTypeOverride;
            let streetTypeLabelOverride;
            let streetTypeChoice;
            for (streetTypeChoice of BASIC_STREET_TYPE_CHOICES) {
                if (this.state.streetType === streetTypeChoice['value']) {
                    streetTypeOverride = streetTypeChoice['value'];
                    streetTypeLabelOverride = streetTypeChoice['label'];
                    break;
                }
            }

            // Override `Other` option inside the `streetType`.
            if (this.state.streetType === 1) {
                streetTypeLabelOverride = this.state.streetTypeOther;
            }

            // Generate our new address.
            let streetAddress = this.state.streetName+" "+streetTypeLabelOverride;
            if (streetDirectionOverride) {
                streetAddress += " " + streetDirectionOverride;
            }
            streetAddress += " from "+this.state.streetNumberStart+" to "+this.state.streetNumberEnd;

            // Append our array.
            let a = this.state.streetMembership.slice(); //creates the clone of the state
            a.push({
                streetAddress: streetAddress,
                streetNumberStart: this.state.streetNumberStart,
                streetNumberEnd: this.state.streetNumberEnd,
                streetName: this.state.streetName,
                streetType: streetTypeOverride,
                streetTypeLabel: streetTypeLabelOverride,
                streetTypeOther: this.state.streetTypeOther,
                streetDirection: streetDirectionOverride,
                streetDirectionLabel: streetDirectionLabelOverride,
            });

            // Update the state.
            this.setState({
                showModal: false,
                errors: {},
                streetMembership: a,
                streetNumberStart: "", // Clear fields.
                streetNumberEnd: "",
                streetName: "",
                streetType: "",
                streetTypeLabel: "",
                streetTypeOther: "",
                streetDirection: "",
                streetDirectionLabel: "",
            },()=>{
                // For debugging purposes only.
                console.log("onSaveClick |",this.state.streetMembership);
            })

            // Save our table data.
            localStorageSetObjectOrArrayItem("nwapp-watch-streetMembership", a);

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

    onCloseClick() {
        this.setState({
            showModal: false,
            errors: {},
            streetNumberStart: "", // Clear fields.
            streetNumberEnd: "",
            streetName: "",
            streetType: "",
            streetTypeOther: "",
            streetDirection: ""
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Page related.
            streetMembership, errors,

            // Modal relate.
            streetNumberStart, streetNumberEnd, streetName, streetType, streetTypeOther, streetDirection, showModal,
        } = this.state;

        return (
            <AdminWatchCreateStep3Component
                streetMembership={streetMembership}
                errors={errors}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
                showModal={showModal}
                streetNumberStart={streetNumberStart}
                streetNumberEnd={streetNumberEnd}
                streetName={streetName}
                streetType={streetType}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                onAddClick={this.onAddClick}
                onRemoveClick={this.onRemoveClick}
                onSaveClick={this.onSaveClick}
                onCloseClick={this.onCloseClick}
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
)(AdminWatchCreateStep3Container);
