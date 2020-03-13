import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssignWatchAssociateTaskStep2Component from "../../../components/tasks/assignWatchAssociate/assignWatchAssociateTaskStep2Component";
import { validateTask1Step2Input } from "../../../validators/taskValidator";
import { getAssociateReactSelectOptions } from '../../../actions/watchActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';


class TaskUpdateContainer extends Component {
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
            name: null,
            errors: {},
            isLoading: false,
            slug: slug,
            associate: localStorage.getItem('nwapp-task-1-associate'),
            associateOption: localStorageGetObjectItem('nwapp-task-1-associateOption'),
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
            associateData: {
                results: [
                    {'slug': 'bob-page', 'name': 'Bob Page'},
                    {'slug': 'walter-simons', 'name': 'Walter Simons'},
                    {'slug': 'jc-denton', 'name': 'JC Denton'},
                    {'slug': 'paul-denton', 'name': 'Paul Denton'}
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
        this.props.history.push("/task/1/"+this.state.slug+"/step-3");
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
        localStorage.setItem('nwapp-task-1-'+[option.selectName], option.value);
        localStorage.setItem('nwapp-task-1-'+[option.selectName]+"-label", option.label);
        localStorageSetObjectOrArrayItem('nwapp-task-1-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateTask1Step2Input(this.state);

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
        const { associate, associateData, errors, slug, } = this.state;
        return (
            <AssignWatchAssociateTaskStep2Component
                slug={slug}
                associate={associate}
                associateOptions={getAssociateReactSelectOptions(associateData)}
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
)(TaskUpdateContainer);
