import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchCreateStep3ComComponent from "../../../components/watches/create/watchCreateStep3ComComponent";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';
import { getAssociateReactSelectOptions } from '../../../actions/watchAction';
import { getDistrictReactSelectOptions } from '../../../actions/districtAction';
import { getAreaCoordinatorReactSelectOptions } from '../../../actions/areaCoordinatorAction';
import { validateBusinessInput } from "../../../validators/watchValidator";


class WatchCreateStep3ComContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('temp-watch-com-name'),
            associate: localStorage.getItem('temp-watch-com-associate'),
            associateOption: localStorageGetObjectItem('temp-watch-com-associateOption'),
            district: localStorage.getItem('temp-watch-com-district'),
            districtOption: localStorageGetObjectItem('temp-watch-com-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('temp-watch-com-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-com-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('temp-watch-com-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-com-secondaryAreaCoordinatorOption'),
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
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <WatchCreateStep3ComComponent
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchCreateStep3ComContainer);
