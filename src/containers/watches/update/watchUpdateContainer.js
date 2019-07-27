import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import {
    validateResidentialUpdateInput, validateResidentialModalSaveInput
} from "../../../validators/watchValidator";
import WatchUpdateComponent from "../../../components/watches/update/watchUpdateComponent";
import { getAssociateReactSelectOptions } from '../../../actions/watchAction';
import { getDistrictReactSelectOptions } from '../../../actions/districtAction';
import { getAreaCoordinatorReactSelectOptions } from '../../../actions/areaCoordinatorAction';
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";


class WatchUpdateBizContainer extends Component {
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
            // Page related.
            slug: slug,
            icon: "",
            name: "",
            associate: "",
            associateOption: "",
            district: "",
            districtOption: "",
            primaryAreaCoordinator: "",
            primaryAreaCoordinatorOption: "",
            secondaryAreaCoordinator: "",
            secondaryAreaCoordinatorOption: "",
            streetMembership: [],
            errors: {},

            // Modal related.
            streetNumberStart: "",
            streetNumberFinish: "",
            streetName: "",
            streetType: "",
            streetTypeOption: {},
            streetTypeOther: "",
            streetDirection: "",
            streetDirectionOption: {},
            showModal: false, // Variable used to indicate if the modal should appear.
        }

        // Page related.
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

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

        // REPLACE THIS WITH API ENDPOINT.
        //TODO: REPLACE WITH API.
        if (this.state.slug === "argyle") {
            this.setState({
                icon: "home",
                tags: ["fitness",],
                tagsOptions: [{"selectName":"tags","value":"fitness","label":"Fitness"}],
                name: "Argyle",
                description: "This is a test description for `Argyle`.",
                associate: "bob-page",
                associateOption: {"selectName":"associate","value":"bob-page","label":"Bob Page"},
                district: "wanchai",
                programLabel: "Resident",
                districtOption: {"selectName":"district","value":"wanchai","label":"Wanchai Market"},
                primaryAreaCoordinator: "tracer-tong",
                primaryAreaCoordinatorOption: {"selectName":"primaryAreaCoordinator","value":"tracer-tong","label":"Tracer Tong"},
                secondaryAreaCoordinator: "icarus",
                secondaryAreaCoordinatorOption: {"selectName":"secondaryAreaCoordinator","value":"icarus","label":"Icarus"},
                streetMembership: [{"streetAddress":"Singleton Avenue from 23 to 25","streetNumberStart":"23","streetNumberFinish":"25","streetName":"Singleton","streetType":"Avenue","streetDirection":""}],
            });
        } else if (this.state.slug === "byron") {
            this.setState({
                icon: "building",
                tags: ["fitness",],
                tagsOptions: [{"selectName":"tags","value":"fitness","label":"Fitness"}],
                name: "Byron",
                description: "This is a test description for `Byron`.",
                associate: "bob-page",
                associateOption: {"selectName":"associate","value":"bob-page","label":"Bob Page"},
                district: "wanchai",
                programLabel: "Business",
                districtOption: {"selectName":"district","value":"wanchai","label":"Wanchai Market"},
                primaryAreaCoordinator: "tracer-tong",
                primaryAreaCoordinatorOption: {"selectName":"primaryAreaCoordinator","value":"tracer-tong","label":"Tracer Tong"},
                secondaryAreaCoordinator: "icarus",
                secondaryAreaCoordinatorOption: {"selectName":"secondaryAreaCoordinator","value":"icarus","label":"Icarus"},
                streetMembership: [{"streetAddress":"Singleton Avenue from 23 to 25","streetNumberStart":"23","streetNumberFinish":"25","streetName":"Singleton","streetType":"Avenue","streetDirection":""}],
            });
        } else if (this.state.slug === "carling") {
            this.setState({
                icon: "university",
                tags: ["fitness",],
                tagsOptions: [{"selectName":"tags","value":"fitness","label":"Fitness"}],
                name: "Carling",
                description: "This is a test description for `Byron`.",
                associate: "bob-page",
                associateOption: {"selectName":"associate","value":"bob-page","label":"Bob Page"},
                district: "wanchai",
                programLabel: "Community Cares",
                districtOption: {"selectName":"district","value":"wanchai","label":"Wanchai Market"},
                primaryAreaCoordinator: "tracer-tong",
                primaryAreaCoordinatorOption: {"selectName":"primaryAreaCoordinator","value":"tracer-tong","label":"Tracer Tong"},
                secondaryAreaCoordinator: "icarus",
                secondaryAreaCoordinatorOption: {"selectName":"secondaryAreaCoordinator","value":"icarus","label":"Icarus"},
                streetMembership: [{"streetAddress":"Singleton Avenue from 23 to 25","streetNumberStart":"23","streetNumberFinish":"25","streetName":"Singleton","streetType":"Avenue","streetDirection":""}],
            });
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", this.state.programLabel+" watch has been successfully updated.");
        this.props.history.push("/watch/"+this.state.slug);
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
        const optionKey = [option.selectName].toString().concat("Option");
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });

        // For debugging purposes only.
        console.log("SELECTED\noptionKey", optionKey, "\noption", option, "\n");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialUpdateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
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

                // Terminate our for-loop.
                return;
            }
        }
    }

    onSaveClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialModalSaveInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Generate our new address.
            const actualStreetType = this.state.streetType === "Other" ? this.state.streetTypeOther : this.state.streetType;
            let streetAddress = this.state.streetName+" "+actualStreetType;
            if (this.state.streetDirection) {
                streetAddress += " " + this.state.streetDirection;
            }
            streetAddress += " from "+this.state.streetNumberStart+" to "+this.state.streetNumberFinish;

            // Append our array.
            let a = this.state.streetMembership.slice(); //creates the clone of the state
            a.push({
                streetAddress: streetAddress,
                streetNumberStart: this.state.streetNumberStart,
                streetNumberFinish: this.state.streetNumberFinish,
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
                streetNumberFinish: "",
                streetName: "",
                streetType: "",
                streetTypeOther: "",
                streetDirection: "",
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

    onCloseClick() {
        this.setState({
            showModal: false,
            errors: {},
            streetNumberStart: "", // Clear fields.
            streetNumberFinish: "",
            streetName: "",
            streetType: "",
            streetTypeOther: "",
            streetDirection: ""
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Page related.
            icon, slug, name, description, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, streetMembership, errors,

            // Modal relate.
            streetNumberStart, streetNumberFinish, streetName, streetType, streetTypeOther, streetDirection, showModal,
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
                {'slug': 'area-51', 'name': 'Area 51'},
                {'slug': 'new-york', 'name': 'New York'}
            ]
        }; // TODO: REPLACTE WITH API DATA.

        const areaCoordinatorListObject = {
            results: [
                {'slug': 'tracer-tong', 'name': 'Tracer Tong'},
                {'slug': 'icarus', 'name': 'Icarus'},
                {'slug': 'datalus', 'name': 'Datalus'},
                {'slug': 'walter-simons', 'name': 'Walter Simons'},
                {'slug': 'joseph-manderly', 'name': 'Joseph Manderly'}
            ]
        }; // TODO: REPLACTE WITH API DATA.

        return (
            <WatchUpdateComponent
                icon={icon}
                slug={slug}
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
                showModal={showModal}
                streetNumberStart={streetNumberStart}
                streetNumberFinish={streetNumberFinish}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchUpdateBizContainer);
