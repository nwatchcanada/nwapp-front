import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterStep4Component from "../../../components/account/register/registerStep4Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class RegisterStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-register-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/register/step-2-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/register/step-2-biz";
        }

        this.state = {
            returnURL: returnURL,
            watchSlug: localStorage.getItem('nwapp-register-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-register-watch-icon'),
            watchName: localStorage.getItem('nwapp-register-watch-name'),
            typeOf: typeOf,
            showModal: false,
        }

        this.onShowModalClick = this.onShowModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onAgreeModalClick = this.onAgreeModalClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // REPLACE THIS CODE WITH API CODE.
        const tableData = [
            {
                slug: "argyle-watch",
                icon: "home",
                name: "Argyle Community Watch"
            },{
                slug: "byron-watch",
                icon: "building",
                name: "Byron Business Watch"
            },{
                slug: "carling-watch",
                icon: "university",
                name: "Carling Retirement Centre Watch"
            }
        ];

        // Set our state.
        this.setState({
            tableData: tableData,
            isLoading: false,
        });

        // Set our event handling.
        this.onTableRowClick = this.onTableRowClick.bind(this);
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

    onTableRowClick(e, slug, icon, name) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        localStorage.setItem('nwapp-register-watch-slug', slug);
        localStorage.setItem('nwapp-register-watch-icon', icon);
        localStorage.setItem('nwapp-register-watch-name', name);
        this.props.history.push("/register/step-5");
    }

    onShowModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: true,
        })
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    onAgreeModalClick(e) {
        e.preventDefault();
        this.props.history.push("/register/step-5");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { returnURL, tableData, isLoading, showModal } = this.state;
        return (
            <RegisterStep4Component
                tableData={tableData}
                returnURL={returnURL}
                isLoading={isLoading}
                onTableRowClick={this.onTableRowClick}
                onShowModalClick={this.onShowModalClick}
                onCloseModalClick={this.onCloseModalClick}
                onAgreeModalClick={this.onAgreeModalClick}
                showModal={showModal}
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
)(RegisterStep4Container);
