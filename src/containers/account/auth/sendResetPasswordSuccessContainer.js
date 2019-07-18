import React from 'react';
import { connect } from 'react-redux';

import SendResetPasswordSuccessComponent from '../../../components/account/auth/sendResetPasswordSuccessComponent';


class SendResetPasswordSuccessContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render () {
        return (
            <SendResetPasswordSuccessComponent />
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
)(SendResetPasswordSuccessContainer);
