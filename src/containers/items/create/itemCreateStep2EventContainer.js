import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep2EventComponent from "../../../components/items/create/itemCreateStep2EventComponent";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetDateItem
} from '../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateEventInput } from "../../../validators/itemValidator";
import { EVENT_TYPE_CHOICES, OTHER_EVENT_TYPE_OF } from "../../../constants/api";


class ItemCreateStep2EventContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            title: localStorage.getItem("temp-item-create-event-title"),
            eventTypeOf: parseInt(localStorage.getItem("temp-item-create-event-eventTypeOf")),
            eventTypeOfOption: localStorageGetObjectItem('temp-item-create-event-eventTypeOfOption'),
            eventTypeOfOther: localStorage.getItem("temp-item-create-event-eventTypeOfOther"),
            date: localStorageGetDateItem("temp-item-create-event-date"),
            description: localStorage.getItem("temp-item-create-event-description"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);
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
        this.props.setFlashMessage("success", "Item has been successfully created.");
        this.props.history.push("/item/add/step-3");
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
        const key = "temp-item-create-event-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('temp-item-create-event-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('temp-item-create-event-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
    }

    onDateTimeChange(dateObj) {
        this.setState({
            date: dateObj,
        })
        localStorageSetObjectOrArrayItem('temp-item-create-event-date', dateObj);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateEventInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {

            // Save for convinence the event type depending on if the user
            // chose a standard option or the `other` option.
            if (this.state.eventTypeOf.value === OTHER_EVENT_TYPE_OF) {
                localStorage.setItem('temp-item-create-event-pretty-event-type', this.state.eventTypeOfOther);
            } else {
                localStorage.setItem('temp-item-create-event-pretty-event-type', this.state.eventTypeOfOption.label);
            }            

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
        const { title, eventTypeOf, eventTypeOfOther, date, description, errors } = this.state;
        return (
            <ItemCreateStep2EventComponent
                title={title}
                eventTypeOf={eventTypeOf}
                eventTypeOfOptions={EVENT_TYPE_CHOICES}
                eventTypeOfOther={eventTypeOfOther}
                date={date}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
                onDateTimeChange={this.onDateTimeChange}
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
)(ItemCreateStep2EventContainer);
