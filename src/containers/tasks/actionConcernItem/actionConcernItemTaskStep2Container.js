import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ActionConcernItemTaskStep2Component from "../../../components/tasks/actionConcernItem/actionConcernItemTaskStep2Component";
import { validateTask3Step2Input } from "../../../validators/taskValidator";
import { getAssociateReactSelectOptions } from '../../../actions/watchAction';
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem
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
            willAction: localStorageGetIntegerItem("nwapp-task-3-willAction"),
            reason: localStorageGetIntegerItem("nwapp-task-3-reason"),
            reasonOther: localStorage.getItem("nwapp-task-3-reasonOther"),
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
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
        this.props.history.push("/task/3/"+this.state.slug+"/step-3");
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
        });
        localStorage.setItem('nwapp-task-3-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        }, ()=> {
            localStorage.setItem('nwapp-task-3-'+[option.selectName], option.value);
            localStorage.setItem('nwapp-task-3-'+[option.selectName]+"-label", option.label);
            localStorageSetObjectOrArrayItem('nwapp-task-3-'+optionKey, option);
            // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            console.log("onSelectChange | state | post-save", this.state)
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-task-3-"+[e.target.name];
        const storageLabelKey =  "nwapp-task-3-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({
            [e.target.name]: parseInt(value),
            storeLabelKey: label,
        }, ()=> {
            localStorage.setItem(storageValueKey, value) // Save to storage.
            localStorage.setItem(storageLabelKey, label) // Save to storage.

            // For the debugging purposes only.
            console.log("onRadioChange |", {
                "STORE-VALUE-KEY": storageValueKey,
                "STORE-VALUE": value,
                "STORAGE-VALUE-KEY": storeValueKey,
                "STORAGE-VALUE": value,
                "STORAGE-LABEL-KEY": storeLabelKey,
                "STORAGE-LABEL": label,
            });
        }); // Save to store.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateTask3Step2Input(this.state);

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
        const { willAction, reason, reasonOther, errors, slug, } = this.state;
        return (
            <ActionConcernItemTaskStep2Component
                slug={slug}
                willAction={willAction}
                reason={reason}
                reasonOther={reasonOther}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
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
