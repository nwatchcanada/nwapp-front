import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep3EventComponent from "../../../../components/items/admin/create/event/itemCreateStep3EventComponent";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem,
    localStorageGetDateItem, localStorageGetArrayItem,
    localStorageGetBooleanItem, localStorageGetIntegerItem
} from '../../../../helpers/localStorageUtility';
import { validateEventStep3Input } from "../../../../validators/itemValidator";
import { EVENT_TYPE_CHOICES, OTHER_EVENT_TYPE_OF, EVENT_ITEM_TYPE_OF } from "../../../../constants/api";


class ItemCreateStep3EventContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            isAllDayEvent: localStorageGetBooleanItem("nwapp-item-create-event-date-isAllDayEvent"),
            startDateTime: localStorageGetDateItem("nwapp-item-create-event-startDateTime"),
            finishDateTime: localStorageGetDateItem("nwapp-item-create-event-finishDateTime"),
            errors: {},
            isLoading: false
        }

        this.onStartDateTimeChange = this.onStartDateTimeChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onFinishDateTimeChange = this.onFinishDateTimeChange.bind(this);
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

    onSuccessfulSubmissionCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/item/add/step-4-event");
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

    onStartDateTimeChange(dateObj) {
        this.setState({
            startDateTime: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-item-create-event-startDateTime', dateObj);
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
        localStorage.setItem('nwapp-item-create-event-date-'+[e.target.name], e.target.checked);
    }

    onFinishDateTimeChange(dateObj) {
        this.setState({
            finishDateTime: dateObj,
        })
        localStorageSetObjectOrArrayItem('nwapp-item-create-event-finishDateTime', dateObj);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateEventStep3Input(this.state);

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
        const { startDateTime, finishDateTime, errors } = this.state;
        return (
            <ItemCreateStep3EventComponent
                startDateTime={startDateTime}
                finishDateTime={finishDateTime}
                isAllDayEvent={this.state.isAllDayEvent}
                errors={errors}
                onClick={this.onClick}
                onStartDateTimeChange={this.onStartDateTimeChange}
                onCheckboxChange={this.onCheckboxChange}
                onFinishDateTimeChange={this.onFinishDateTimeChange}
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
)(ItemCreateStep3EventContainer);
