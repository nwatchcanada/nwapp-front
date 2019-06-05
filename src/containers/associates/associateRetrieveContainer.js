import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssociateRetrieveComponent from "../../components/associates/associateRetrieveComponent";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class AssociateRetrieveContainer extends Component {
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

        this.onBack = this.onBack.bind(this);
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

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/associates/"+this.state.urlArgument);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/associates/"+this.state.urlArgument+"/"+this.state.slug+"/update");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const associateData = {
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'absoluteUrl': '/associate/argyle'
        };
        return (
            <AssociateRetrieveComponent
                urlArgument={this.state.urlArgument}
                slug={this.state.slug}
                associateData={associateData}
                onBack={this.onBack}
                onClick={this.onClick}
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
)(AssociateRetrieveContainer);
