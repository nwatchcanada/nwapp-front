import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import { setFlashMessage } from "../../actions/flashMessageActions";
import { getSubdomain } from '../../helpers/urlUtility';


import {
    EXECUTIVE_ROLE_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
    ASSOCIATE_ROLE_ID,
    AREA_COORDINATOR_ROLE_ID,
    MEMBER_ROLE_ID,
    ANONYMOUS_ROLE_ID,
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
        url: "/admin/members"
    },{
        id: "full-area-coordinator",
        icon: "horse-head",
        title: "Area Coordinators",
        url: "/admin/area-coordinators"
    },{
        id: "full-associates",
        icon: "crown",
        title: "Associates",
        url: "/admin/associates"
    },{
        id: "full-watches",
        icon: "shield-alt",
        title: "Watches",
        url: "/admin/watches"
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
        id: "full-financials",
        icon: "exclamation-circle",
        title: "Concerns",
        url: "/concerns"
    },{
        id: "full-reports",
        icon: "book",
        title: "Reports",
        url: "/reports"
    },{
        id: "full-staff",
        icon: "user-check",
        title: "Staff",
        url: "/admin/staffs"
    },{
        id: "full-settings",
        icon: "cogs",
        title: "Settings",
        url: "/admin/settings"
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
        url: "/admin/members"
    },{
        id: "full-area-coordinator",
        icon: "horse-head",
        title: "Area Coordinators",
        url: "/admin/area-coordinators"
    },{
        id: "full-associates",
        icon: "crown",
        title: "Associates",
        url: "/admin/associates"
    },{
        id: "full-watches",
        icon: "shield-alt",
        title: "Watches",
        url: "/admin/watches"
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
        icon: "exclamation-circle",
        title: "Concerns",
        url: "/concerns"
    },{
        id: "full-reports",
        icon: "book",
        title: "Reports",
        url: "/reports"
    },{
        id: "full-staff",
        icon: "user-check",
        title: "Staff",
        url: "/admin/staffs"
    },
    // {
    //     id: "full-settings", // https://github.com/nwatchcanada/nwapp-front/issues/181
    //     icon: "cogs",
    //     title: "Settings",
    //     url: "/settings"
    // }
    ,{
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
        id: "full-items",
        icon: "map-pin",
        title: "Items",
        url: "/items"
    },{
        id: "full-watches",
        icon: "shield-alt",
        title: "Watches",
        url: "/watches"
    },{
        id: "full-resources",
        icon: "atlas",
        title: "Resources",
        url: "/resources"
    },{
        id: "full-newspaper",
        icon: "newspaper",
        title: "News",
        url: "/news"
    },{
        id: "full-perks",
        icon: "pepper-hot",
        title: "Perks",
        url: "/perks"
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
        id: "full-item",
        icon: "map-pin",
        title: "Items",
        url: "/item"
    },{
        id: "full-resources",
        icon: "atlas",
        title: "Resources",
        url: "/resources"
    },{
        id: "full-perks",
        icon: "pepper-hot",
        title: "Perks",
        url: "/perks"
    },{
        id: "full-donate",
        icon: "donate",
        title: "Donate",
        url: "/donate"
    },{
        id: "full-profile",
        icon: "user-circle",
        title: "Profile",
        url: "/profile"
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
    [EXECUTIVE_ROLE_ID]: AUTH_MANAGEMENT_STAFF_MENU_DATA,
    [MANAGEMENT_ROLE_ID]: AUTH_MANAGEMENT_STAFF_MENU_DATA,
    [FRONTLINE_STAFF_ROLE_ID]: AUTH_FRONTLINE_STAFF_MENU_DATA,
    [ASSOCIATE_ROLE_ID]: AUTH_ASSOCIATE_MENU_DATA,
    [AREA_COORDINATOR_ROLE_ID]: AUTH_AREA_COORDINATOR_MENU_DATA,
    [MEMBER_ROLE_ID]: AUTH_MEMBER_MENU_DATA,
    [ANONYMOUS_ROLE_ID]: ANON_MENU_DATA,
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
            const { roleId } = user;

            // Indicate we are authenticated.
            isAuthenticated = true;

            // Generate a friendly message in the menu for authenitcatd users.
            menuTitle = "Hi, "+user.firstName;

            // Lookup the user group membership and get the navigation tree.
            menuData = NAVIGATION_TREE[parseInt(roleId)];
        }
    }

    // If no menu was set then we will create our anonymous menu by default.
    if (menuData === null || menuData === undefined) {
        isAuthenticated = false;
        menuTitle = "Menu"
        menuData = NAVIGATION_TREE[ANONYMOUS_ROLE_ID];
    }

    // Check if we are in a tenant or not.
    const subdomain = getSubdomain();
    const isTenant = subdomain !== null && subdomain !== undefined;

    // Render our top navigation.
    return (
        <div>
            {isAuthenticated &&
                <div>
                    <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between">
                        <Link className="navbar-brand" to="/">
                            <img className="img-fluid" src="/img/nwl-compressed-logo.png" alt="Mikaponics" width="32px" />
                        </Link>
                        <ul className="navbar-nav flex-row">
                            {isAuthenticated && isTenant &&
                                <li className="dropdown-list dropdown nav-item">
                                    <Link aria-haspopup="true" to="/tasks" className="dropdown-toggle-nocaret nav-link text-white py-0" aria-expanded="false">
                                        <i className="far fa-check-square"></i>
                                        <span className="badge badge-orange">11</span>
                                    </Link>
                                </li>
                            }

                                <li className="nav-item">
                                    &nbsp;&nbsp;&nbsp;
                                </li>

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
    		}
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
