import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminAssociateCreateStep6Component from "../../../../components/associates/admin/create/adminCreateStep6Component";
import { localStorageGetIntegerItem } from '../../../../helpers/localStorageUtility';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


class AdminAssociateCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-create-associate-typeOf"),
            watchSlug: localStorage.getItem('nwapp-create-associate-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-create-associate-watch-icon'),
            watchName: localStorage.getItem('nwapp-create-associate-watch-name'),
        }
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
                typeOf: RESIDENCE_TYPE_OF,
                slug: "argyle-watch",
                icon: "home",
                name: "Argyle Community Watch"
            },{
                typeOf: BUSINESS_TYPE_OF,
                slug: "byron-watch",
                icon: "building",
                name: "Byron Business Watch"
            },{
                typeOf: COMMUNITY_CARES_TYPE_OF,
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

    onTableRowClick(e, typeOf, slug, icon, name) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        localStorage.setItem('nwapp-create-associate-watch-typeOf', typeOf);
        localStorage.setItem('nwapp-create-associate-watch-slug', slug);
        localStorage.setItem('nwapp-create-associate-watch-icon', icon);
        localStorage.setItem('nwapp-create-associate-watch-name', name);
        this.props.history.push("/admin/associates/add/step-7");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { returnURL, tableData, isLoading } = this.state;
        return (
            <AdminAssociateCreateStep6Component
                tableData={tableData}
                returnURL={returnURL}
                isLoading={isLoading}
                onTableRowClick={this.onTableRowClick}
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
)(AdminAssociateCreateStep6Container);
