import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ActionIncidentTaskStep2Component from "../../../../../components/taskItems/admin/operations/actionIncident/step2Component";
import { validateTask4Step2Input } from "../../../../../validators/taskValidator";
import { getAssociateReactSelectOptions } from '../../../../../actions/watchActions';
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem
} from '../../../../../helpers/localStorageUtility';


class ActionIncidentTaskStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props)


        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { uuid } = this.props.match.params;

        this.state = {
            name: null,
            errors: {},
            isLoading: false,
            uuid: uuid,
            willAction: localStorageGetIntegerItem("nwapp-task-4-willAction"),
            comment: localStorage.getItem("nwapp-task-4-comment"),
            reason: localStorageGetIntegerItem("nwapp-task-4-reason"),
            reasonOther: localStorage.getItem("nwapp-task-4-reasonOther"),
        }

        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
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
	onHandleKeyDown(e) {
		if (e.keyCode === 13) {
			this.onClick();
		}
	}

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        localStorage.setItem('nwapp-task-4-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        }, ()=> {
            localStorage.setItem('nwapp-task-4-'+[option.selectName], option.value);
            localStorage.setItem('nwapp-task-4-'+[option.selectName]+"-label", option.label);
            localStorageSetObjectOrArrayItem('nwapp-task-4-'+optionKey, option);
            // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            console.log("onSelectChange | state | post-save", this.state)
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-task-4-"+[e.target.name];
        const storageLabelKey =  "nwapp-task-4-"+[e.target.name].toString()+"-label";
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
        const { errors, isValid } = validateTask4Step2Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/admin/task/4/"+this.state.uuid+"/step-3");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                errors: errors,
                isLoading: false
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { uuid, willAction, comment, reason, reasonOther, errors, } = this.state;
        return (
            <ActionIncidentTaskStep2Component
                uuid={uuid}
                willAction={willAction}
                comment={comment}
                reason={reason}
                reasonOther={reasonOther}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
                onHandleKeyDown={this.onHandleKeyDown}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionIncidentTaskStep2Container);
