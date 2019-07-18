import React from 'react';
import { connect } from 'react-redux';

import ResetPasswordSuccessComponent from '../../../components/account/auth/resetPasswordSuccessComponent';


class ResetPasswordSuccessContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render () {
        return (
            <ResetPasswordSuccessComponent
                user={this.props.user}
            />
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
)(ResetPasswordSuccessContainer);
