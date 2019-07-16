import React from 'react';
import { connect } from 'react-redux';

import RegisterSuccessComponent from '../../../components/account/register/registerSuccessComponent';


class RegisterSuccessContainer extends React.Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render () {
        return (
            <RegisterSuccessComponent />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterSuccessContainer);
