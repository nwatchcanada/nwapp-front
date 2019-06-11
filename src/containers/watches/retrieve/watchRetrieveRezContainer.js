import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveRezComponent from "../../../components/watches/retrieve/watchRetrieveRezComponent";
import { RESIDENCE_TYPE_OF } from '../../../constants/api';
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveRezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            program: RESIDENCE_TYPE_OF,
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
        this.props.history.push("/watch-rez/carling/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            name, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, streetMembership, errors,
        } = this.state;
        return (
            <WatchRetrieveRezComponent
                name={name}
                associate={associateOption}
                district={districtOption}
                primaryAreaCoordinator={primaryAreaCoordinatorOption}
                secondaryAreaCoordinator={secondaryAreaCoordinatorOption}
                streetMembership={streetMembership}
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
)(WatchRetrieveRezContainer);
