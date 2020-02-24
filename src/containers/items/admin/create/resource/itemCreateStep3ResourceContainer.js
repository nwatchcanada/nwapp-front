import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep3ResourceComponent from "../../../../../components/items/admin/create/resource/itemCreateStep3ResourceComponent";
import {
    LINK_RESOURCE_TYPE_OF,
    YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
    IMAGE_RESOURCE_TYPE_OF,
    FILE_RESOURCE_TYPE_OF
} from "../../../../../constants/api";
import { localStorageGetIntegerItem } from '../../../../../helpers/localStorageUtility';


class ItemCreateStep3ResourceContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-item-create-resource-typeOf"),
        };
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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e, typeOf) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Save to our browsers memory.
        localStorage.setItem('nwapp-item-create-resource-typeOf', typeOf);

        // Redirect to the next page.
        if (typeOf === LINK_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-4-resource-link");
        }
        else if (typeOf === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-4-resource-youtube");
        }
        else if (typeOf === IMAGE_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-4-resource-image");
        }
        else if (typeOf === FILE_RESOURCE_TYPE_OF) {
            this.props.history.push("/admin/item/add/step-4-resource-file");
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { typeOf } = this.state;
        return (
            <ItemCreateStep3ResourceComponent typeOf={typeOf} onClick={this.onClick} />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep3ResourceContainer);
