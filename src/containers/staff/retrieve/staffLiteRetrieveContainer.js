import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffLiteRetrieveComponent from "../../../components/staff/retrieve/staffLiteRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class StaffLiteRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { urlArgument, slug } = this.props.match.params;

        // Update state.
        this.state = {
            urlArgument: urlArgument,
            slug: slug,
        }
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

         // Clear any and all flash messages in our queue to be rendered.
         this.props.clearFlashMessage();
     }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const staffData = {
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'absoluteUrl': '/staff/argyle'
        };
        return (
            <StaffLiteRetrieveComponent
                urlArgument={this.state.urlArgument}
                slug={this.state.slug}
                staffData={staffData}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffLiteRetrieveContainer);
