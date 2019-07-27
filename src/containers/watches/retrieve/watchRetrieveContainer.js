import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveComponent from "../../../components/watches/retrieve/watchRetrieveComponent";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveContainer extends Component {
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
            tags: ["fitness",],
            tagsOptions: [{"selectName":"tags","value":"fitness","label":"Fitness"}],
            name: "Argyle",
            description: "This is a test description for `Argyle`.",
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
        this.props.history.push("/watch/"+this.state.slug+"/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            tagsOptions, name, description, programLabel, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, streetMembership, errors,
        } = this.state;

        return (
            <WatchRetrieveComponent
                tags={tagsOptions}
                name={name}
                description={description}
                programLabel={programLabel}
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
)(WatchRetrieveContainer);
