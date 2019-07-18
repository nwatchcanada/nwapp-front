import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveRezComponent from "../../../components/watches/retrieve/watchRetrieveRezComponent";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveRezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
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

        //TODO: REPLACE WITH API.
        this.setState({
            tags: ["rentals",],
            tagsOptions: [{"selectName":"tags","value":"rentals","label":"Rentals"}],
            name: "Carling",
            associate: "walter-simons",
            associateOption: {"selectName":"associate","value":"walter-simons","label":"Walter Simons"},
            district: "vandenburg",
            districtOption: {"selectName":"district","value":"vandenburg","label":"Vandenburg Airforce Base"},
            primaryAreaCoordinator: "tracer-tong",
            primaryAreaCoordinatorOption: {"selectName": "secondaryAreaCoordinator", "value": "joseph-manderly", "label": "Joseph Manderly"},
            secondaryAreaCoordinator: "icarus",
            secondaryAreaCoordinatorOption: {"selectName":"secondaryAreaCoordinator","value":"icarus","label":"Icarus"},
            streetMembership: [{"streetAddress":"Singleton Avenue from 23 to 25","streetNumberStart":"23","streetNumberFinish":"25","streetName":"Singleton","streetType":"Avenue","streetDirection":""}],
        })
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
        this.props.history.push("/watch-rez/argyle/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            tagsOptions, name, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, streetMembership, errors,
        } = this.state;

        return (
            <WatchRetrieveRezComponent
                tags={tagsOptions}
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
