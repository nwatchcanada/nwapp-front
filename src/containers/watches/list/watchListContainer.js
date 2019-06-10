import React, { Component } from 'react';
import { connect } from 'react-redux';

import WatchListComponent from "../../../components/watches/list/watchListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class WatchListContainer extends Component {
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
            'icon': 'building',
            'number': 1,
            'name': 'Argyle (Biz)',
            'absoluteUrl': '/watch-biz/argyle'
        },{
            'slug': 'byron',
            'icon': 'university',
            'number': 2,
            'name': 'Byron (Com)',
            'absoluteUrl': '/watch-cc/byron'
        },{
            'slug': 'carling',
            'icon': 'home',
            'number': 3,
            'name': 'Carling (Rez)',
            'absoluteUrl': '/watch-rez/carling'
        }];
        return (
            <WatchListComponent
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
)(WatchListContainer);
