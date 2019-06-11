import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveRezComponent from "../../../components/watches/retrieve/watchRetrieveRezComponent";
import {
    localStorageGetObjectItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { RESIDENCE_TYPE_OF } from '../../../constants/api';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveRezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            program: RESIDENCE_TYPE_OF,
            name: localStorage.getItem('temp-watch-rez-name'),
            associate: localStorage.getItem('temp-watch-rez-associate'),
            associateOption: localStorageGetObjectItem('temp-watch-rez-associateOption'),
            district: localStorage.getItem('temp-watch-rez-district'),
            districtOption: localStorageGetObjectItem('temp-watch-rez-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('temp-watch-rez-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-rez-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('temp-watch-rez-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-rez-secondaryAreaCoordinatorOption'),
            streetMembership: localStorageGetArrayItem('temp-watch-rez-streetMembership'),
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchRetrieveRezContainer);
