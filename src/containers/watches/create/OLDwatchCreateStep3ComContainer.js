import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import WatchCreateStep3ComComponent from "../../../components/watches/create/watchCreateStep3ComComponent";
import { localStorageGetObjectItem, localStorageGetArrayItem } from '../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class WatchCreateStep3ComContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // ALL OUR GENERAL INFORMATION IS STORED HERE.
            name: localStorage.getItem('nwapp-watch-com-name'),
            description: localStorage.getItem('nwapp-watch-com-description'),
            associate: localStorage.getItem('nwapp-watch-com-associate'),
            associateOption: localStorageGetObjectItem('nwapp-watch-com-associateOption'),
            district: localStorage.getItem('nwapp-watch-com-district'),
            districtOption: localStorageGetObjectItem('nwapp-watch-com-districtOption'),
            primaryAreaCoordinator: localStorage.getItem('nwapp-watch-com-primaryAreaCoordinator'),
            primaryAreaCoordinatorOption: localStorageGetObjectItem('nwapp-watch-com-primaryAreaCoordinatorOption'),
            secondaryAreaCoordinator: localStorage.getItem('nwapp-watch-com-secondaryAreaCoordinator'),
            secondaryAreaCoordinatorOption: localStorageGetObjectItem('nwapp-watch-com-secondaryAreaCoordinatorOption'),

            // Variable used to lock buttons when makig submissions.
            isLoading: false,

            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            // ALL OUR OBJECTS ARE STORED HERE.
            streetsArray : localStorageGetArrayItem('nwapp-district-com-streets'),
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

    onSuccessfulSubmissionCallback() {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Community cares watch has been successfully created.");
        this.props.history.push("/watches");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.onSuccessfulSubmissionCallback();
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            name, description, associateOption, districtOption, primaryAreaCoordinatorOption, secondaryAreaCoordinatorOption, streetsArray, errors,
        } = this.state;
        return (
            <WatchCreateStep3ComComponent
                name={name}
                description={description}
                associate={associateOption}
                district={districtOption}
                primaryAreaCoordinator={primaryAreaCoordinatorOption}
                secondaryAreaCoordinator={secondaryAreaCoordinatorOption}
                streetsArray={streetsArray}
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
)(WatchCreateStep3ComContainer);
