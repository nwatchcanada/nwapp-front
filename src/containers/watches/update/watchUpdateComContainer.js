import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import WatchUpdateComComponent from "../../../components/watches/update/watchUpdateComComponent";
import { getAssociateReactSelectOptions } from '../../../actions/watchAction';
import { getDistrictReactSelectOptions } from '../../../actions/districtAction';
import { getAreaCoordinatorReactSelectOptions } from '../../../actions/areaCoordinatorAction';
import { validateCommunityCaresInput } from "../../../validators/watchValidator";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class WatchUpdateComContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            slug: "byron",
            name: "",
            associate: "",
            associateOption: "",
            district: "",
            districtOption: "",
            primaryAreaCoordinator: "",
            primaryAreaCoordinatorOption: "",
            secondaryAreaCoordinator: "",
            secondaryAreaCoordinatorOption: "",
            errors: {},
        }

        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
        this.props.setFlashMessage("success", "Community care watch has been successfully updated.");
        this.props.history.push("/watch-cc/"+this.state.slug);
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
        localStorage.setItem('temp-watch-com-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
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

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            slug, name, description, associate, district, primaryAreaCoordinator, secondaryAreaCoordinator, errors,
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
            <WatchUpdateComComponent
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
                errors={errors}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
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
)(WatchUpdateComContainer);
