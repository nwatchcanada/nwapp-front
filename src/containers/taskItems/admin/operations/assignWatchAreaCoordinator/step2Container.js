import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssignWatchAreaCoordinatorTaskStep2Component from "../../../../../components/taskItems/admin/operations/assignWatchAreaCoordinator/step2Component";
import { getAreaCoordinatorReactSelectOptions } from '../../../../../actions/areaCoordinatorActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../../../helpers/localStorageUtility';


class AssignWatchAreaCoordinatorTaskStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { uuid } = this.props.match.params;

        this.state = {
            name: null,
            errors: {},
            isLoading: false,
            uuid: uuid,
            areaCoordinator: localStorage.getItem('nwapp-task-2-areaCoordinator'),
            areaCoordinatorOption: localStorageGetObjectItem('nwapp-task-2-areaCoordinatorOption'),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.setState({
            areaCoordinatorData: {
                results: [
                    {'uuid': 'bob-page', 'name': 'Bob Page'},
                    {'uuid': 'walter-simons', 'name': 'Walter Simons'},
                    {'uuid': 'jc-denton', 'name': 'JC Denton'},
                    {'uuid': 'paul-denton', 'name': 'Paul Denton'}
                ]
            }
        });
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

    onSuccessfulSubmissionCallback(task) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/task/2/"+this.state.uuid+"/step-3");
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
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-task-2-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-task-2-'+optionKey, option);
        localStorage.setItem('nwapp-task-2-'+[option.selectName]+"-label", option.label);
        // console.log(option); // For debugging purposes only.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.onSuccessfulSubmissionCallback();
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { areaCoordinator, areaCoordinatorData, errors, uuid, } = this.state;
        return (
            <AssignWatchAreaCoordinatorTaskStep2Component
                uuid={uuid}
                areaCoordinator={areaCoordinator}
                areaCoordinatorOptions={getAreaCoordinatorReactSelectOptions(areaCoordinatorData)}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
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
)(AssignWatchAreaCoordinatorTaskStep2Container);
