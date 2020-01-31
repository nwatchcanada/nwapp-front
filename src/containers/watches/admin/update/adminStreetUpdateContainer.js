import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import {
    validateResidentialStep3Input, validateModalSaveInput
} from "../../../../validators/watchValidator";
import AdminWatchStreetUpdateComponent from "../../../../components/watches/admin/update/adminStreetUpdateComponent";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { getAssociateReactSelectOptions } from '../../../../actions/watchActions';
import { getDistrictReactSelectOptions } from '../../../../actions/districtActions';
import { getAreaCoordinatorReactSelectOptions } from '../../../../actions/areaCoordinatorActions';
import { getTagReactSelectOptions } from "../../../../actions/tagActions";
import { putWatchStreetMembership } from "../../../../actions/watchActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../../constants/api";


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

            // Generate our new address.
            const actualStreetType = this.state.streetType === "Other" ? this.state.streetTypeOther : this.state.streetType;
            let streetAddress = this.state.streetName+" "+actualStreetType;
            if (this.state.streetDirection) {
                streetAddress += " " + this.state.streetDirection;
            }
            streetAddress += " from "+this.state.streetNumberStart+" to "+this.state.streetNumberEnd;

            // Append our array.
            let a = this.state.streetMembership.slice(); //creates the clone of the state
            a.push({
                streetAddress: streetAddress,
                streetNumberStart: this.state.streetNumberStart,
                streetNumberEnd: this.state.streetNumberEnd,
                streetName: this.state.streetName,
                streetType: actualStreetType,
                streetDirection: this.state.streetDirection,
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
                streetTypeOther: "",
                streetDirection: "",
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
            slug, tags, name, description, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, streetMembership, errors,

            // Modal relate.
            streetNumberStart, streetNumberEnd, streetName, streetType, streetTypeOther, streetDirection, showModal,
        } = this.state;

        const associateListObject = {
            results: [
                {'slug': 'bob-page', 'name': 'Bob Page'},
                {'slug': 'jc-denton', 'name': 'JC Denton'},
                {'slug': 'paul-denton', 'name': 'Paul Denton'},
                {'slug': 'gunter-herman', 'name': 'Gunter Herman'}
            ]
        }; // TODO: REPLACTE WITH API DATA.

        const districtListObject = {
            results: [
                {'slug': 'wanchai', 'name': 'Wanchai Market'},
                {'slug': 'versalife', 'name': 'VersaLife'},
                {'slug': 'battery-park', 'name': 'Battery Park'},
                {'slug': 'area-51', 'name': 'Area 51'}
            ]
        }; // TODO: REPLACTE WITH API DATA.

        const areaCoordinatorListObject = {
            results: [
                {'slug': 'tracer-tong', 'name': 'Tracer Tong'},
                {'slug': 'icarus', 'name': 'Icarus'},
                {'slug': 'datalus', 'name': 'Datalus'},
            ]
        }; // TODO: REPLACTE WITH API DATA.

        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <AdminWatchStreetUpdateComponent
                slug={slug}
                tags={tags}
                tagOptions={tagOptions}
                name={name}
                description={description}
                associate={associate}
                associateOptions={getAssociateReactSelectOptions(associateListObject)}
                district={district}
                districtOptions={getDistrictReactSelectOptions(districtListObject)}
                primaryAreaCoordinator={primaryAreaCoordinator}
                primaryAreaCoordinatorOptions={getAreaCoordinatorReactSelectOptions(areaCoordinatorListObject, "primaryAreaCoordinator")}
                secondaryAreaCoordinator={secondaryAreaCoordinator}
                secondaryAreaCoordinatorOptions={getAreaCoordinatorReactSelectOptions(areaCoordinatorListObject, "secondaryAreaCoordinator")}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchStreetUpdateContainer);
