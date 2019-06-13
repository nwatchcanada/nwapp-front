import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import MemberCreateStep6Component from "../../../components/members/create/memberCreateStep6Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import validateInput from "../../../validators/memberValidator";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class MemberCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("temp-create-member-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/members/add/step-2-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/members/add/step-2-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            name: null,
            errors: {},
            isLoading: false
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
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Member has been successfully created.");
        this.props.history.push("/members/active");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { returnURL, name, errors } = this.state;
        return (
            <MemberCreateStep6Component
                returnURL={returnURL}
                name={name}
                errors={errors}
                onTextChange={this.onTextChange}
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
)(MemberCreateStep6Container);
