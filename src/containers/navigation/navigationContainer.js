import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import { setFlashMessage } from "../../actions/flashMessageActions";
import { getSubdomain } from '../../helpers/urlUtility';


import {
    EXECUTIVE_GROUP_ID,
    MANAGEMENT_GROUP_ID,
    FRONTLINE_STAFF_GROUP_ID,
    ASSOCIATE_GROUP_ID,
    AREA_COORDINATOR_GROUP_ID,
    MEMBER_GROUP_ID,
    ANONYMOUS_GROUP_ID,
} from '../../constants/api';


const ANON_MENU_DATA = [
    {
        id: "anon-login",
        icon: "sign-in-alt",
        title: "Login",
        url: "/login"
    },{
        id: "anon-register",
        icon: "user",
        title: "Register",
        url: "/register"
    }
]


const AUTH_MANAGEMENT_STAFF_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-members",
        icon: "users",
        title: "Members",
        url: "/members"
    },{
        id: "full-area-coordinator",
        icon: "horse-head",
        title: "Area Coordinators",
        url: "/area-coordinators"
    },{
        id: "full-associates",
        icon: "crown",
        title: "Associates",
        url: "/associates"
    },{
        id: "full-watches",
        icon: "shield-alt",
        title: "Watches",
        url: "/watches"
    },{
        id: "full-items",
        icon: "map-pin",
        title: "Items",
        url: "/items"
    },{
        id: "full-tasks",
        icon: "tasks",
        title: "Tasks",
        url: "/tasks"
    },{
        id: "full-financials",
        icon: "credit-card",
        title: "Financials",
        url: "/financials"
    },{
        id: "full-reports",
        icon: "book",
        title: "Reports",
        url: "/reports"
    },{
        id: "full-staff",
        icon: "user-tie",
        title: "Staff",
        url: "/staff"
    },{
        id: "full-settings",
        icon: "cogs",
        title: "Settings",
        url: "/settings"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_FRONTLINE_STAFF_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-members",
        icon: "users",
        title: "Members",
        url: "/members"
    },{
        id: "full-area-coordinator",
        icon: "horse-head",
        title: "Area Coordinators",
        url: "/area-coordinators"
    },{
        id: "full-associates",
        icon: "crown",
        title: "Associates",
        url: "/associates"
    },{
        id: "full-watches",
        icon: "shield-alt",
        title: "Watches",
        url: "/watches"
    },{
        id: "full-items",
        icon: "map-pin",
        title: "Items",
        url: "/items"
    },{
        id: "full-tasks",
        icon: "tasks",
        title: "Tasks",
        url: "/tasks"
    },{
        id: "full-reports",
        icon: "book",
        title: "Reports",
        url: "/reports"
    },{
        id: "full-staff",
        icon: "user-tie",
        title: "Staff",
        url: "/staff"
    },{
        id: "full-settings",
        icon: "cogs",
        title: "Settings",
        url: "/settings"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_ASSOCIATE_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_AREA_COORDINATOR_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];


const AUTH_MEMBER_MENU_DATA = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-help",
        icon: "question-circle",
        title: "Help",
        url: "/help"
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
];



export const NAVIGATION_TREE = {
    [EXECUTIVE_GROUP_ID]: AUTH_MANAGEMENT_STAFF_MENU_DATA,
    [MANAGEMENT_GROUP_ID]: AUTH_MANAGEMENT_STAFF_MENU_DATA,
    [FRONTLINE_STAFF_GROUP_ID]: AUTH_FRONTLINE_STAFF_MENU_DATA,
    [ASSOCIATE_GROUP_ID]: AUTH_ASSOCIATE_MENU_DATA,
    [AREA_COORDINATOR_GROUP_ID]: AUTH_AREA_COORDINATOR_MENU_DATA,
    [MEMBER_GROUP_ID]: AUTH_MEMBER_MENU_DATA,
    [ANONYMOUS_GROUP_ID]: ANON_MENU_DATA,
}



class ItemNode extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    toggle = () => {
        // console.log("isOpen:", this.state.isOpen);
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { id, icon, title, url, children } = this.props.menuData;
        const sideMenuToggle = this.props.sideMenuToggle;
        if(children)
        {
            return (
                <li className="nav-item dropdown-btn" key={id}>
                    <Link className={`nav-link ${ this.state.isOpen ? "rotate-90" : ""}`} to="#" onClick={ this.toggle }>
                        <i className={`fa fa-${icon}`}></i>&nbsp;{ title }&nbsp;<i className="fa fa-caret-right" ></i>
                    </Link>
                    <ul style={{ display: this.state.isOpen ? "block" : "none"}}>
                        { children.map((item, index) => (
                            <ItemNode menuData={ item } key={ index } sideMenuToggle = { sideMenuToggle }></ItemNode>))
                        }
                    </ul>
                </li>)
        }
        else
        {
            return (
                <li className="nav-item" key={id}>
                    <NavLink className="nav-link" to={ url } onClick = { sideMenuToggle }>
                        <i className={`fa fa-${icon}`}></i>&nbsp;{ title }
                    </NavLink>
                </li>
            );
        }
    }
}
class NavigationContainer extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            active: false
        }

        this.sideMenuToggle = this.sideMenuToggle.bind(this);
    }

    sideMenuToggle() {
        this.setState({
            active: !this.state.active
        })
    }

  render() {
    const { user } = this.props;
    let menuTitle;
    let menuData;
    let isAuthenticated = false;

    if (user !== null && user !== undefined) {
        const keysArr = Object.keys(user);
        const count = keysArr.length;
        if (count > 0) {
            // Get our permission handling fields from the user object which
            // we received from the API endpoint.
            const { groupId } = user;

            // Indicate we are authenticated.
            isAuthenticated = true;

            // Generate a friendly message in the menu for authenitcatd users.
            menuTitle = "Hi, "+user.firstName;

            // Lookup the user group membership and get the navigation tree.
            menuData = NAVIGATION_TREE[parseInt(groupId)];
        }
    }

    // If no menu was set then we will create our anonymous menu by default.
    if (menuData === null || menuData === undefined) {
        isAuthenticated = false;
        menuTitle = "Menu"
        menuData = NAVIGATION_TREE[ANONYMOUS_GROUP_ID];
    }

    // Check if we are in a tenant or not.
    const subdomain = getSubdomain();
    const isTenant = subdomain !== null && subdomain !== undefined;

    // Render our top navigation.
    return (
        <div>
            <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between" style={customStyles} >
                <Link className="navbar-brand" to="/">
                    <img className="img-fluid" src="/img/nwl-compressed-logo.png" alt="Mikaponics" width="32px" />
                </Link>
                <ul className="navbar-nav flex-row">
                    {isAuthenticated && isTenant &&
                        <li className="dropdown-list dropdown nav-item">
                            <Link aria-haspopup="true" to="/tasks" className="dropdown-toggle-nocaret nav-link text-white py-0" aria-expanded="false">
                                <i className="far fa-check-square"></i>
                                <span className="badge badge-danger">11</span>
                            </Link>
                        </li>
                    }
                    {isAuthenticated &&
                        <li className="nav-item">
                            &nbsp;&nbsp;&nbsp;
                        </li>
                    }
                    <li className="nav-item">
                        <button className={`navbar-toggler ${ this.state.active ? "active" : ""}` } type="button" id="sidebarCollapse"
                            onClick = { this.sideMenuToggle }>
                            <i className="fa fa-bars"></i>
                        </button>
                    </li>
                </ul>

            </header>
            <nav id="sidebar" className={ `${ this.state.active ? "active" : ""}` }>
                <div className="sideMenuTouchGlass"
                       onClick={ this.sideMenuToggle }
                         style={{ display: this.state.active ? "block" : "none"}}></div>
                <Scrollbars>
                    <p className="text-center text-light mt-3 mb-2">{menuTitle}</p>
                    <hr className="nav-divider" />
                    <ul className="nav flex-column">
                        { menuData.map((item, index)=>(
                            <ItemNode menuData={item} key={index} sideMenuToggle={this.sideMenuToggle}></ItemNode>
                        )) }
                    </ul>
                </Scrollbars>
            </nav>
        </div>
    )
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer);
