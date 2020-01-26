import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchCreateStep4ComComponent from "../../../../components/watches/create/com/watchCreateStep4ComComponent";
import {
    localStorageGetObjectItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { COMMUNITY_CARES_TYPE_OF } from '../../../../constants/api';
import { setFlashMessage } from "../../../../actions/flashMessageActions";


class WatchCreateStep4ComContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            program: COMMUNITY_CARES_TYPE_OF,
            tags: localStorageGetArrayItem("nwapp-watch-com-tags"),
            name: localStorage.getItem('nwapp-watch-com-name'),
            associate: localStorage.getItem('nwapp-watch-com-associate'),
            associateOption: localStorageGetObjectItem('nwapp-watch-com-associateOption'),
            district: localStorage.getItem('nwapp-watch-com-district'),
            districtOption: localStorageGetObjectItem('nwapp-watch-com-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('nwapp-watch-com-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('nwapp-watch-com-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('nwapp-watch-com-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('nwapp-watch-com-secondaryAreaCoordinatorOption'),
            streetMembership: localStorageGetArrayItem('nwapp-watch-com-streetMembership'),
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

    onClick(e, typeOf) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Community cares watch has been successfully created.");
        this.props.history.push("/watches");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            tags, name, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, streetMembership, errors,
        } = this.state;
        return (
            <WatchCreateStep4ComComponent
                tags={tags}
                name={name}
                associate={associateOption}
                district={districtOption}
                primaryAreaCoordinator={primaryAreaCoordinatorOption}
                secondaryAreaCoordinator={secondaryAreaCoordinatorOption}
                streetMembership={streetMembership}
                errors={errors}
                onClick={this.onClick}
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
)(WatchCreateStep4ComContainer);
