import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchCreateStep4BizComponent from "../../../../components/watches/create/biz/watchCreateStep4BizComponent";
import {
    localStorageGetObjectItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { BUSINESS_TYPE_OF } from '../../../../constants/api';
import { setFlashMessage } from "../../../../actions/flashMessageActions";


class WatchCreateStep4BizContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            program: BUSINESS_TYPE_OF,
            tags: localStorageGetArrayItem("nwapp-watch-biz-tags"),
            name: localStorage.getItem('nwapp-watch-biz-name'),
            associate: localStorage.getItem('nwapp-watch-biz-associate'),
            associateOption: localStorageGetObjectItem('nwapp-watch-biz-associateOption'),
            district: localStorage.getItem('nwapp-watch-biz-district'),
            districtOption: localStorageGetObjectItem('nwapp-watch-biz-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('nwapp-watch-biz-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('nwapp-watch-biz-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('nwapp-watch-biz-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('nwapp-watch-biz-secondaryAreaCoordinatorOption'),
            streetMembership: localStorageGetArrayItem('nwapp-watch-biz-streetMembership'),
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
        this.props.setFlashMessage("success", "Business watch has been successfully created.");
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
            <WatchCreateStep4BizComponent
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
)(WatchCreateStep4BizContainer);
