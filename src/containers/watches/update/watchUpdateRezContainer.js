import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import {
    validateResidentialInput, validateResidentialModalSaveInput
} from "../../../validators/watchValidator";
import WatchUpdateRezComponent from "../../../components/watches/update/watchUpdateRezComponent";
import { getAssociateReactSelectOptions } from '../../../actions/watchAction';
import { getDistrictReactSelectOptions } from '../../../actions/districtAction';
import { getAreaCoordinatorReactSelectOptions } from '../../../actions/areaCoordinatorAction';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class WatchUpdateRezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // Page related.
            slug: "carling",
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
            streetDirection: "",
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
        this.setState({
            name: "Hells Kitchen",
            description: "This is a test watch",
            associate: "jc-denton",
            associateOption: {
                selectName: "associate", value: "jc-denton", label: "JC Denton"
            },
            district: "new-york",
            districtOption: {
                selectName: "district", value: "new-york", label: "New York"
            },
            primaryAreaCoordinator: "walter-simons",
            primaryAreaCoordinatorOption: {
                selectName: "primaryAreaCoordinator", value: "walter-simons", label: "Walter Simons"
            },
            secondaryAreaCoordinator: "joseph-manderly",
            secondaryAreaCoordinatorOption: {
                selectName: "secondaryAreaCoordinator", value: "joseph-manderly", label: "Joseph Manderly"
            },
            streetMembership: [
                {
                    streetAddress: "Singleton Avenue N from 1 to 1000",
                    streetDirection: "N",
                    streetName: "Singleton",
                    streetNumberFinish: "1000",
                    streetNumberStart: "1",
                    streetType: "Avenue"
                }
            ],
            errors: {},
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Residential watch has been successfully updated.");
        this.props.history.push("/watch-rez/"+this.state.slug);
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
        const { errors, isValid } = validateResidentialInput(this.state);

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
            // Append our array.
            let a = this.state.streetMembership.slice(); //creates the clone of the state
            const streetAddress = this.state.streetName+" "+this.state.streetType+" "+this.state.streetDirection+" from "+this.state.streetNumberStart+" to "+this.state.streetNumberFinish;
            a.push({
                streetAddress: streetAddress,
                streetNumberStart: this.state.streetNumberStart,
                streetNumberFinish: this.state.streetNumberFinish,
                streetName: this.state.streetName,
                streetType: this.state.streetType,
                streetDirection: this.state.streetDirection,
            });

            // Update our state.
            this.setState({
                showModal: false,
                errors: {},
                streetMembership: a,
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
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Page related.
            slug, name, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, streetMembership, errors,

            // Modal relate.
            streetNumberStart, streetNumberFinish, streetName, streetType, streetDirection, showModal,
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
            <WatchUpdateRezComponent
                slug={slug}
                name={name}
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
                streetDirection={streetDirection}
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
)(WatchUpdateRezContainer);
