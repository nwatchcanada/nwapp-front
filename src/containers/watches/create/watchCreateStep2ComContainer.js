import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchCreateStep2ComComponent from "../../../components/watches/create/watchCreateStep2ComComponent";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class WatchCreateStep2ComContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: null,
        }

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

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.props.history.push("/watches/step-3-create-cc");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <WatchCreateStep2ComComponent
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
)(WatchCreateStep2ComContainer);
