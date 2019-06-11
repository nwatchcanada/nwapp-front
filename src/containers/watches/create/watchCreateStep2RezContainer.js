import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import { validateResidentialInput } from "../../../validators/watchValidator";
import WatchCreateStep2RezComponent from "../../../components/watches/create/watchCreateStep2RezComponent";
import { localStorageGetObjectItem, localStorageSetObjectItem } from '../../../helpers/localStorageUtility';
import { getAssociateReactSelectOptions } from '../../../actions/watchAction';
import { getDistrictReactSelectOptions } from '../../../actions/districtAction';
import { getAreaCoordinatorReactSelectOptions } from '../../../actions/areaCoordinatorAction';


class WatchCreateStep2RezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // Page related.
            name: localStorage.getItem('temp-watch-rez-name'),
            associate: localStorage.getItem('temp-watch-rez-associate'),
            associateOption: localStorageGetObjectItem('temp-watch-rez-associateOption'),
            district: localStorage.getItem('temp-watch-rez-district'),
            districtOption: localStorageGetObjectItem('temp-watch-rez-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('temp-watch-rez-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-rez-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('temp-watch-rez-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-rez-secondaryAreaCoordinatorOption'),
            streetMembershipArray: localStorageGetObjectItem('temp-watch-rez-streetMembershipArray'),
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
        this.props.setFlashMessage("success", "District has been successfully created.");
        this.props.history.push("/settings/district/step-3-create-rez");
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
        localStorage.setItem('temp-watch-rez-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('temp-watch-rez-'+[option.selectName], option.value);
        localStorageSetObjectItem(optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
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

    onAddClick() {
        this.setState({
            showModal: true
        })
    }

    onRemoveClick() {

    }

    onSaveClick() {

    }

    onCloseClick() {
        this.setState({
            showModal: false
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            // Page related.
            name, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, streetMembershipArray, errors,

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

        return (
            <WatchCreateStep2RezComponent
                name={name}
                associate={associate}
                associateOptions={getAssociateReactSelectOptions(associateListObject)}
                district={district}
                districtOptions={getDistrictReactSelectOptions(districtListObject)}
                primaryAreaCoordinator={primaryAreaCoordinator}
                primaryAreaCoordinatorOptions={getAreaCoordinatorReactSelectOptions(areaCoordinatorListObject, "primaryAreaCoordinator")}
                secondaryAreaCoordinator={secondaryAreaCoordinator}
                secondaryAreaCoordinatorOptions={getAreaCoordinatorReactSelectOptions(areaCoordinatorListObject, "secondaryAreaCoordinator")}
                streetMembershipArray={streetMembershipArray}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchCreateStep2RezContainer);
