import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import Report04Component from "../../components/reports/report04Component";
import { clearFlashMessage } from "../../actions/flashMessageActions";
import { NWAPP_REPORT_FOUR_CSV_DOWNLOAD_API_ENDPOINT } from "../../constants/api";
import { getSubdomain } from "../../helpers/urlUtility";


class Report04Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

    onSuccessfulSubmissionCallback(staff) {
        // --- Update the GUI ---
        this.setState({ errors: {}, isLoading: true, })

        // --- Move to our next page ---
        this.props.history.push("/reports");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Disable the button so the user cannot double click and download
        // the file multiple times.
        this.setState({ isLoading: true, })

        // DEVELOPERS NOTE:
        // Because we have a multi-tenant architecture, we need to make calls
        // to the specific tenant for the CSV download API to work.
        const schema = getSubdomain();

        // Extract the selected options and convert to ISO string format, also
        // create our URL to be used for submission.
        const url = process.env.REACT_APP_API_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + "/api" + NWAPP_REPORT_FOUR_CSV_DOWNLOAD_API_ENDPOINT;
        console.log(url);

        // The following code will open up a new browser tab and load up the
        // URL that you inputted.
        var win = window.open(url, '_blank');
        win.focus();

        // Add minor delay and then run to remove the button ``disable`` state
        // so the user is able to click the download button again.
        setTimeout(() => {
            this.setState({ isLoading: false, errors: [], })
        }, 100); // 0.10 seconds.
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            errors, isLoading
        } = this.state;

        return (
            <Report04Component
                isLoading={isLoading}
                errors={errors}
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
)(Report04Container);
