import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchRetrieveBizComponent from "../../../components/watches/retrieve/watchRetrieveBizComponent";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class WatchRetrieveBizContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem('temp-watch-biz-name'),
            associate: localStorage.getItem('temp-watch-biz-associate'),
            associateOption: localStorageGetObjectItem('temp-watch-biz-associateOption'),
            district: localStorage.getItem('temp-watch-biz-district'),
            districtOption: localStorageGetObjectItem('temp-watch-biz-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('temp-watch-biz-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-biz-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('temp-watch-biz-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('temp-watch-biz-secondaryAreaCoordinatorOption'),
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
        this.props.history.push("/watch-biz/argyle/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            name, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, errors,
        } = this.state;

        return (
            <WatchRetrieveBizComponent
                name={name}
                associate={associateOption}
                district={districtOption}
                primaryAreaCoordinator={primaryAreaCoordinatorOption}
                secondaryAreaCoordinator={secondaryAreaCoordinatorOption}
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
)(WatchRetrieveBizContainer);
