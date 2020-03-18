import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import {
    validateResidentialStep3Input, validateModalSaveInput
} from "../../../../validators/watchValidator";
import AdminWatchStreetUpdateComponent from "../../../../components/watches/admin/update/adminStreetUpdateComponent";
// import {
//     localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
// } from '../../../../helpers/localStorageUtility';
import { getAssociateReactSelectOptions } from '../../../../actions/watchActions';
import { getDistrictReactSelectOptions } from '../../../../actions/districtActions';
import { getAreaCoordinatorReactSelectOptions } from '../../../../actions/areaCoordinatorActions';
import { getTagReactSelectOptions } from "../../../../actions/tagActions";
import { putWatchStreetMembership } from "../../../../actions/watchActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";
import { setFlashMessage } from "../../../../actions/flashMessageActions";


class AdminWatchStreetUpdateContainer extends Component {
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
            streetMembership: this.props.watchDetail.streetMembership,
            errors: {},
            isLoading: false,
            streetAddress: "",
            streetNumberStart: "",
            streetNumberEnd: "",
            streetName: "",
            streetType: "",
            streetTypeLabel: "",
            streetTypeOther: "",
            streetDirection: "",
            streetDirectionLabel: "",
            showAddModal: false, // Variable used to indicate if the modal should appear.
            showEditModal: false,
        }

        // Page related.
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);

        // Modal related.
        this.onAddClick = this.onAddClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onSaveAddClick = this.onSaveAddClick.bind(this);
        this.onSaveEditClick = this.onSaveEditClick.bind(this);
        this.onModalCloseClick = this.onModalCloseClick.bind(this);

        // API related.
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessfulPutCallback = this.onSuccessfulPutCallback.bind(this);
        this.onFailurePutCallback = this.onFailurePutCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.streetDirection = parseInt(this.state.streetDirection);
        const streetDirection = parseInt(this.state.streetDirection);
        if (streetDirection === undefined || streetDirection === null || streetDirection === "" || isNaN(streetDirection) ) {
            postData.streetDirection = 0; // This will set it to be "-".
        }

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
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

    onSuccessfulPutCallback(response) {
        this.setState({ errors: {}, });
        this.props.setFlashMessage("success", "Watch has been successfully updated.");
        this.props.history.push("/admin/watch/"+this.state.slug);
    }

    onFailurePutCallback(errors) {
        this.setState({ errors: errors, isLoading: false, }, ()=>{
            console.log("onFailurePutCallback: Failed putting watch details.");
        });

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
        localStorage.setItem('nwapp-watch-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        // localStorage.setItem('nwapp-watch-'+[option.selectName], option.value);
        // localStorageSetObjectOrArrayItem('nwapp-watch-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // // Set all the tags we have selected to the STORAGE.
        // const key = 'nwapp-watch-' + args[1].name;
        // localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialStep3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, });

            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putWatchStreetMembership(
                this.getPostData(),
                this.onSuccessfulPutCallback,
                this.onFailurePutCallback
            );

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
            showAddModal: true,
            errors: {},
        });  // Load the modal.
    }

    onEditClick(streetAddress) {
        let streetMembershipObj;

        // Iterate through all the street memberships and find the correct object.
        const streetMembership = this.state.streetMembership;
        for (let i = 0; i < streetMembership.length; i++) {
            let row = streetMembership[i];

            if (row.streetAddress === streetAddress) {
                streetMembershipObj = row;
                break;
            }
        }

        this.setState({
            showEditModal: true,
            errors: {},
            streetAddress: streetAddress,
            streetNumberStart: streetMembershipObj.streetNumberStart,
            streetNumberEnd: streetMembershipObj.streetNumberEnd,
            streetName: streetMembershipObj.streetName,
            streetType: streetMembershipObj.streetType,
            streetTypeLabel: streetMembershipObj.streetTypeLabel,
            streetTypeOther: streetMembershipObj.streetTypeOther,
            streetDirection: streetMembershipObj.streetDirection,
            streetDirectionLabel: streetMembershipObj.streetDirectionLabel,
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
                // localStorageSetObjectOrArrayItem("nwapp-watch-streetMembership", filteredItems);

                // Terminate our for-loop.
                return;
            }
        }
    }

    onSaveAddClick(e) {
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

            // // For debugging purposes only.
            // console.log("Street Address", streetAddress);

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
                showAddModal: false,
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
            })

            // // Save our table data.
            // localStorageSetObjectOrArrayItem("nwapp-watch-streetMembership", a);

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

    onSaveEditClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Get our values.
        const {
            streetAddress,
            streetNumberStart,
            streetNumberEnd,
            streetName,
            streetType,
            streetTypeOther,
            streetDirection
        } = this.state;

        // Iterate through all the street memberships and find the correct object.
        const streetMembership = this.state.streetMembership;
        for (let i = 0; i < streetMembership.length; i++) {
            let row = streetMembership[i];

            if (row.streetAddress === streetAddress) {
                row.streetNumberStart = streetNumberStart;
                row.streetNumberEnd = streetNumberEnd;
                row.streetName = streetName;
                row.streetType = streetType;
                row.streetTypeOther = streetTypeOther;
                row.streetDirection = streetDirection;
                this.setState({
                    showEditModal: false,
                    streetMembership: streetMembership,
                }, ()=>{
                    console.log("onSaveEditClick | state: ", streetMembership);
                });
                return;
            }
        }
    }

    onModalCloseClick() {
        this.setState({
            showAddModal: false,
            showEditModal: false,
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
            slug, tags, name, description, associate, district, streetMembership, errors, isLoading,

            // Modal relate.
            streetNumberStart, streetNumberEnd, streetName, streetType, streetTypeOther, streetDirection, showAddModal, showEditModal,
        } = this.state;

        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <AdminWatchStreetUpdateComponent
                watchDetail={this.props.watchDetail}
                slug={slug}
                tags={tags}
                tagOptions={tagOptions}
                name={name}
                description={description}
                district={district}
                streetMembership={streetMembership}
                errors={errors}
                isLoading={isLoading}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
                showAddModal={showAddModal}
                showEditModal={showEditModal}
                streetNumberStart={streetNumberStart}
                streetNumberEnd={streetNumberEnd}
                streetName={streetName}
                streetType={streetType}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                onAddClick={this.onAddClick}
                onEditClick={this.onEditClick}
                onRemoveClick={this.onRemoveClick}
                onSaveAddClick={this.onSaveAddClick}
                onSaveEditClick={this.onSaveEditClick}
                onModalCloseClick={this.onModalCloseClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        watchDetail: store.watchDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        putWatchStreetMembership: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putWatchStreetMembership(data, onSuccessCallback, onFailureCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchStreetUpdateContainer);
