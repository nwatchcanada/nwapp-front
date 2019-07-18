import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveComComponent from "../../../components/watches/retrieve/watchRetrieveComComponent";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveComContainer extends Component {
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
            tags: ["fitness", "security"],
            tagsOptions: [{"selectName":"tags","value":"fitness","label":"Fitness"}, {"selectName":"tags","value":"security","label":"Security"}],
            name: "Byron",
            associate: "jc-denton",
            associateOption: {"selectName":"associate","value":"jc-denton","label":"JC Denton"},
            district: "wanchai",
            districtOption: {"selectName":"district","value":"hells-kitchen","label":"Hells Kitchen"},
            primaryAreaCoordinator: "tracer-tong",
            primaryAreaCoordinatorOption: {"selectName":"primaryAreaCoordinator","value":"paul-denton","label":"Paul Denton"},
            secondaryAreaCoordinator: "icarus",
            secondaryAreaCoordinatorOption: {"selectName":"secondaryAreaCoordinator","value":"icarus","label":"Icarus"},
            streetMembership: [
                {"streetAddress":"Centre Street from 100 to 200","streetNumberStart":"100","streetNumberFinish":"200","streetName":"Centre","streetType":"Street","streetDirection":""},
                {"streetAddress":"Baseline Road from 1 to 5","streetNumberStart":"1","streetNumberFinish":"5","streetName":"Baseline","streetType":"Road","streetDirection":""}
            ],
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
        this.props.history.push("/watch-cc/argyle/update");
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
            <WatchRetrieveComComponent
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
)(WatchRetrieveComContainer);
