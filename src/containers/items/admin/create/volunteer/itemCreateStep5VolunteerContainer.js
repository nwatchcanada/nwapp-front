import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep5VolunteerComponent from "../../../../../components/items/admin/create/volunteer/itemCreateStep5VolunteerComponent";
import { localStorageGetIntegerItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from '../../../../../helpers/localStorageUtility';


class ItemCreateStep5VolunteerContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            externalURL: localStorage.getItem("nwapp-item-create-volunteer-externalURL"),
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
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

     onTextChange(e) {
         this.setState({
             [e.target.name]: e.target.value,
         });
         const key = "nwapp-item-create-volunteer-"+[e.target.name];
         localStorage.setItem(key, e.target.value)
     }


    onClick(e) {
        // Prvolunteer the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.props.history.push("/admin/item/add/step-6-volunteer");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { externalURL, isLoading, errors } = this.state;
        return (
            <ItemCreateStep5VolunteerComponent
                externalURL={externalURL}
                onTextChange={this.onTextChange}
                errors={errors}
                onClick={this.onClick}
                isLoading={isLoading}
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
)(ItemCreateStep5VolunteerContainer);
