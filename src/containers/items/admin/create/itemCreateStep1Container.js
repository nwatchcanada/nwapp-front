import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep1Component from "../../../../components/items/admin/create/itemCreateStep1Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    INCIDENT_ITEM_TYPE_OF,
    EVENT_ITEM_TYPE_OF,
    CONCERN_ITEM_TYPE_OF,
    INFORMATION_ITEM_TYPE_OF,
    COMMUNITY_NEWS_ITEM_TYPE_OF
} from "../../../../constants/api";


class ItemCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isLoading: false,
            showModal: false,
        }

        this.onClick = this.onClick.bind(this);
        this.onShowModalClick = this.onShowModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Item has been successfully created.");
        this.props.history.push("/admin/items");
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

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Save our data.
        localStorage.setItem("nwapp-item-create-typeOf", typeOf)

        // Redirect to the type of item it is.
        if (typeOf === INCIDENT_ITEM_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-2-incident");
        } else if (typeOf === EVENT_ITEM_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-2-event");
        } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-2-concern");
        } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-2-information");
        } else if (typeOf === COMMUNITY_NEWS_ITEM_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-2-community-news");
        } else {
            alert("Could not find type-of with value: "+typeOf);
        }
    }

    onShowModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: true,
        });
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { showModal, errors } = this.state;
        return (
            <ItemCreateStep1Component
                showModal={showModal}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                onShowModalClick={this.onShowModalClick}
                onCloseModalClick={this.onCloseModalClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep1Container);
