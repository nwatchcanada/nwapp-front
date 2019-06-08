import React, { Component } from 'react';
import { connect } from 'react-redux';

import DistrictsListComponent from "../../../components/settings/districts/districtsListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class DistrictsListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

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
        const tableData = [{
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle (Biz)',
            'absoluteUrl': '/settings/district-biz/argyle'
        },{
            'slug': 'byron',
            'number': 2,
            'name': 'Byron (Com)',
            'absoluteUrl': '/settings/district-cc/byron'
        },{
            'slug': 'carling',
            'number': 3,
            'name': 'Carling (Rez)',
            'absoluteUrl': '/settings/district-rez/carling'
        }];
        return (
            <DistrictsListComponent
                tableData={tableData}
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
)(DistrictsListContainer);
