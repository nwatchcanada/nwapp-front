import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep2IncidentComponent from "../../../../components/items/create/incident/itemCreateStep2IncidentComponent";
import { localStorageGetIntegerItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from '../../../../helpers/localStorageUtility';
import { validateIncidentStep2Input } from "../../../../validators/itemValidator";
import { OTHER_INCIDENT_TYPE_OF, INCIDENT_TYPE_CHOICES } from "../../../../constants/api";


class ItemCreateStep2IncidentContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            incidentTypeOf:localStorageGetIntegerItem("nwapp-item-create-incident-incidentTypeOf"),
            incidentTypeOfOption: localStorageGetObjectItem('nwapp-item-create-incident-incidentTypeOfOption'),
            incidentTypeOfOther: localStorage.getItem("nwapp-item-create-incident-incidentTypeOfOther"),
            errors: {},
            isLoading: false
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
     *  Incident handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const key = "nwapp-item-create-incident-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState(
            {
                [option.selectName]: option.value,
                [optionKey]: option,
            },
            ()=>{
                console.log(this.state);
                localStorage.setItem('nwapp-item-create-incident-'+[option.selectName], option.value);
                localStorageSetObjectOrArrayItem('nwapp-item-create-incident-'+optionKey, option);
            }
        );
    }

    onClick(e) {
        // Princident the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateIncidentStep2Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Save for convinence the incident type depending on if the user
            // chose a standard option or the `other` option.
            if (this.state.incidentTypeOf === OTHER_INCIDENT_TYPE_OF) {
                localStorage.setItem('nwapp-item-create-incident-pretty-incident-type', this.state.incidentTypeOfOther);
            } else {
                localStorage.setItem('nwapp-item-create-incident-pretty-incident-type', this.state.incidentTypeOfOption.label);
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
        const { incidentTypeOf, incidentTypeOfOther, errors } = this.state;
        return (
            <ItemCreateStep2IncidentComponent
                incidentTypeOf={incidentTypeOf}
                incidentTypeOfOptions={INCIDENT_TYPE_CHOICES}
                incidentTypeOfOther={incidentTypeOfOther}
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
)(ItemCreateStep2IncidentContainer);
