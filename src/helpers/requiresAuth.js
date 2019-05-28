import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        render() {
            // CASE 1 OF 2:
            // IF THERE IS NO USER IN THE REDUX STATE THAT MEANS NO USER WAS
            // AUTHENTICATED SO WE WILL NEED TO REDIRECT TO THE "LOGIN" PAGE.
            if (Object.keys(this.props.user).length === 0) {
                return <Redirect to="/login" />

            // CASE 2 OF 2:
            // ELSE RENDER THE CURRENT COMPONENT.
            } else {
                return (
                    <div>
                        <ComposedComponent {...this.props} />
                    </div>
                );
            }

        }
    } // end of CLASS.

    const mapStateToProps = function(store) {
        return {
            user: store.userState,
        };
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Authenticate);

} // end of HOC.
