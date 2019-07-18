import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveComComponent from "../../../components/watches/retrieve/watchRetrieveComComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveComContainer extends Component {
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
            streetsArray: [
                {
                    'streetAddress': '240 First Street',
                    'streetNumber': '240',
                    'streetName': 'First',
                    'streetType': 'Street',
                },{
                    'streetAddress': '51 Downtown Avenue',
                    'streetNumber': '51',
                    'streetName': 'Downtown',
                    'streetType': 'Avenue',
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

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */


    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/watch-cc/byron/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            slug, name, description, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, streetsArray, errors,
        } = this.state;
        return (
            <WatchRetrieveComComponent
                slug={slug}
                name={name}
                description={description}
                associate={associateOption}
                district={districtOption}
                primaryAreaCoordinator={primaryAreaCoordinatorOption}
                secondaryAreaCoordinator={secondaryAreaCoordinatorOption}
                streetsArray={streetsArray}
                errors={errors}
                onClick={this.onClick}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchRetrieveComContainer);
