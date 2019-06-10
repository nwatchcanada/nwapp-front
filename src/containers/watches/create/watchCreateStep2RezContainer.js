import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import { validateResidentialInput } from "../../../validators/watchValidator";
import WatchCreateStep2RezComponent from "../../../components/watches/create/watchCreateStep2RezComponent";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class WatchCreateStep2RezContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract our plants array (which is used to populate the table) from
        // the users's local storage.
        const stringAssociateOption = localStorage.getItem("temp-watch-rez-associateOption");
        let associateOption = JSON.parse(stringAssociateOption);
        if (associateOption  === undefined || associateOption === null) {
            associateOption = {};
        }

        this.state = {
            name: localStorage.getItem('temp-watch-rez-name'),
            associate: localStorage.getItem('temp-watch-rez-associate'),
            associateOption: associateOption,
            primaryAreaCoordinator: localStorage.getItem('temp-watch-rez-primaryAreaCoordinator'),
            secondaryAreaCoordinator: localStorage.getItem('temp-watch-rez-secondaryAreaCoordinator'),
            streetMembersArray: localStorage.getItem('temp-watch-rez-streetMembersArray'),
            errors: {}
        }

        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    /**
     * Utility function takes the API data and converts it to HTML dropdown
     * options which will be consumed by the `react-select` library elements.
     */
    getAssociateOptions() {
        const associateOptions = [];
        // const associateList = this.props.cropLifeCycleStageList; // TODO: REPLACE WITH API.
        const associateList = {
            results: [
                {'slug': 'bob-page', 'name': 'Bob Page'},
                {'slug': 'jc-denton', 'name': 'JC Denton'},
                {'slug': 'paul-denton', 'name': 'Paul Denton'},
                {'slug': 'gunter-herman', 'name': 'Gunter Herman'}
            ]
        };
        const isNotProductionsEmpty = isEmpty(associateList) === false;
        if (isNotProductionsEmpty) {
            const results = associateList.results;
            const isResultsNotEmpty = isEmpty(results) === false;
            if (isResultsNotEmpty) {
                for (let i = 0; i < results.length; i++) {
                    let associate = results[i];
                    associateOptions.push({
                        selectName: "associate",
                        value: associate.slug,
                        label: associate.name
                    });
                }
            }
        }
        return associateOptions;
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "District has been successfully created.");
        this.props.history.push("/settings/district/step-3-create-rez");
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        localStorage.setItem('temp-watch-rez-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const key = [option.selectName];
        const optionKey = [option.selectName]+"Option";
        this.setState({
            key: option.value,
            optionKey: option,
        })
        localStorage.setItem('temp-watch-rez-'+key, option.value);
        localStorage.setItem('temp-watch-rez-'+optionKey, JSON.stringify(option));
        // console.log(this.state); // For debugging purposes only.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateResidentialInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { name, associate, errors } = this.state;
        return (
            <WatchCreateStep2RezComponent
                name={name}
                associate={associate}
                errors={errors}
                associateOptions={this.getAssociateOptions()}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
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
)(WatchCreateStep2RezContainer);
