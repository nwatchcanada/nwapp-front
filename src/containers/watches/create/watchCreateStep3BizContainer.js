import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchCreateStep3BizComponent from "../../../components/watches/create/watchCreateStep3BizComponent";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class WatchCreateStep3BizContainer extends Component {
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

        // Save to our browsers memory.
        localStorage.setItem('temp-district-program', typeOf);

        // Redirect to the next page.
        if (typeOf === RESIDENCE_TYPE_OF) {
            this.props.history.push("/watches/step-2-create-rez");
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            this.props.history.push("/watches/step-2-create-biz");
        }
        else if (typeOf === COMMUNITY_CARES_TYPE_OF) {
            this.props.history.push("/watches/step-2-create-cc");
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <WatchCreateStep3BizComponent
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
)(WatchCreateStep3BizContainer);
