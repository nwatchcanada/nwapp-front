import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import WatchFileUploadArchiveComponent from "../../../../../components/watches/admin/retrieve/fileUpload/adminFileUploadArchiveComponent";
import { setFlashMessage } from "../../../../../actions/flashMessageActions";
import { deletePrivateFileUpload } from "../../../../../actions/privateFileUploadActions";


class AdminWatchFileUploadArchiveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug, fileSlug } = this.props.match.params;
        this.state = {
            isLoading: false,
            watch: slug,
            slug: slug,
            fileSlug: fileSlug,
            errors: {},
        }
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Response:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
                this.props.setFlashMessage("success", "Watch file has been successfully archived.");
                this.props.history.push("/admin/watch/"+this.state.slug+"/files");
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
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
        e.preventDefault();
        this.setState({ isLoading: true }, ()=>{
            this.props.deletePrivateFileUpload(this.state.fileSlug, this.onSuccessCallback, this.onFailureCallback);
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, slug, errors } = this.state;
        const watch = this.props.watchDetail ? this.props.watchDetail : {};
        return (
            <WatchFileUploadArchiveComponent
                slug={slug}
                watch={watch}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        watchDetail: store.watchDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        deletePrivateFileUpload: (slug, onSuccessCallback, onFailureCallback) => {
            dispatch(deletePrivateFileUpload(slug, onSuccessCallback, onFailureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchFileUploadArchiveContainer);
