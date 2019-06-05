import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

// import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import PrivacyContainer from './general/privacyContainer';
import TermsContainer from './general/termsContainer';
import HomeContainer from './general/homeContainer';
import LoginContainer from "./account/loginContainer";
import LogoutContainer from "./account/logoutContainer";
import RegisterContainer from "./account/registerContainer";
import RegisterSuccessContainer from "./account/registerSuccessContainer";
// import ActivateContainer from "./account/activateContainer";
// import SendResetPasswordContainer from "./account/sendResetPasswordContainer";
// import SendResetPasswordSuccessContainer from "./account/sendResetPasswordSuccessContainer";
// import ResetPasswordContainer from "./account/resetPasswordContainer";
// import ResetPasswordSuccessContainer from "./account/resetPasswordSuccessContainer";
// import ReferralContainer from "./account/referralContainer";
import SharedOrganizationListContainer from "./organization/shared/sharedOrganizationListContainer";
import SharedOrganizationCreateContainer from "./organization/shared/sharedOrganizationCreateContainer";
import TenantDashboardRedirectContainer from "./dashboard/tenantDashboardRedirectContainer";
import DashboardContainer from "./dashboard/dashboardContainer";

import DistrictsListContainer from "./districts/districtsListContainer";
import DistrictRetrieveContainer from "./districts/districtRetrieveContainer";
import DistrictCreateContainer from "./districts/districtCreateContainer";
import DistrictUpdateContainer from "./districts/districtUpdateContainer";

import MemberListActiveContainer from "./members/memberListActiveContainer";
import MemberListInactiveContainer from "./members/memberListInactiveContainer";
import MemberSearchContainer from "./members/memberSearchContainer";
import MemberSearchResultContainer from "./members/memberSearchResultContainer";
import MemberRetrieveContainer from "./members/memberRetrieveContainer";
import MemberCreateContainer from "./members/memberCreateContainer";
import MemberUpdateContainer from "./members/memberUpdateContainer";

import ItemListContainer from "./items/itemListContainer";
import ItemRetrieveContainer from "./items/itemRetrieveContainer";
import ItemCreateContainer from "./items/itemCreateContainer";
import ItemUpdateContainer from "./items/itemUpdateContainer";

import AssociateListContainer from "./associates/associateListContainer";
import AssociateRetrieveContainer from "./associates/associateRetrieveContainer";
import AssociateCreateContainer from "./associates/associateCreateContainer";
import AssociateUpdateContainer from "./associates/associateUpdateContainer";

import CoordinatorListContainer from "./coordinators/coordinatorListContainer";
import CoordinatorRetrieveContainer from "./coordinators/coordinatorRetrieveContainer";
import CoordinatorCreateContainer from "./coordinators/coordinatorCreateContainer";
import CoordinatorUpdateContainer from "./coordinators/coordinatorUpdateContainer";

import StaffListContainer from "./staff/staffListContainer";
import StaffRetrieveContainer from "./staff/staffRetrieveContainer";
import StaffCreateContainer from "./staff/staffCreateContainer";
import StaffUpdateContainer from "./staff/staffUpdateContainer";

import TaskListContainer from "./tasks/taskListContainer";
import TaskRetrieveContainer from "./tasks/taskRetrieveContainer";
import TaskCreateContainer from "./tasks/taskCreateContainer";
import TaskUpdateContainer from "./tasks/taskUpdateContainer";

import ReportListContainer from "./reports/reportListContainer";

import SettingListContainer from "./settings/settingListContainer";


class AppContainer extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid" id="outer-container">

                    <NavigationContainer
                        history={this.props.history}
                        location={this.props.location}
                        match={this.props.match}
                        staticContext={this.props.staticContext}
                    />

                    <div className="d-flex align-items-stretch">
                        <main id="main" role="main">
                            <ScrollUpButton />
                            <Switch>
                                <Route path="/" exact component={HomeContainer} />
                                <Route path="/login" exact component={LoginContainer} />
                                <Route path="/logout" exact component={LogoutContainer} />
                                <Route path="/register" exact component={RegisterContainer} />
                                <Route path="/register-success" exact component={RegisterSuccessContainer} />
                                <Route path="/privacy" exact component={PrivacyContainer} />
                                <Route path="/terms" exact component={TermsContainer} />
                                <Route path="/organizations" exact component={SharedOrganizationListContainer} />
                                <Route path="/organization/add" exact component={SharedOrganizationCreateContainer} />
                                <Route path="/dashboard-redirect/:accessToken/:expires/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={DashboardContainer} />
                                <Route path="/districts" exact component={DistrictsListContainer} />
                                <Route path="/district/add" exact component={DistrictCreateContainer} />
                                <Route path="/district/:slug" exact component={DistrictRetrieveContainer} />
                                <Route path="/district/:slug/update" exact component={DistrictUpdateContainer} />
                                <Route path="/members/add" exact component={MemberCreateContainer} />
                                <Route path="/members/active" exact component={MemberListActiveContainer} />
                                <Route path="/members/inactive" exact component={MemberListInactiveContainer} />
                                <Route path="/members/:urlArgument/search" exact component={MemberSearchContainer} />
                                <Route path="/members/:urlArgument/search-results" exact component={MemberSearchResultContainer} />
                                <Route path="/members/:urlArgument/:slug" exact component={MemberRetrieveContainer} />
                                <Route path="/members/:urlArgument/:slug/update" exact component={MemberUpdateContainer} />
                                <Route path="/items" exact component={ItemListContainer} />
                                <Route path="/item/add" exact component={ItemCreateContainer} />
                                <Route path="/item/:slug" exact component={ItemRetrieveContainer} />
                                <Route path="/item/:slug/update" exact component={ItemUpdateContainer} />
                                <Route path="/associates" exact component={AssociateListContainer} />
                                <Route path="/associate/add" exact component={AssociateCreateContainer} />
                                <Route path="/associate/:slug" exact component={AssociateRetrieveContainer} />
                                <Route path="/associate/:slug/update" exact component={AssociateUpdateContainer} />
                                <Route path="/area-coordinators" exact component={CoordinatorListContainer} />
                                <Route path="/area-coordinator/add" exact component={CoordinatorCreateContainer} />
                                <Route path="/area-coordinator/:slug" exact component={CoordinatorRetrieveContainer} />
                                <Route path="/area-coordinator/:slug/update" exact component={CoordinatorUpdateContainer} />
                                <Route path="/staff" exact component={StaffListContainer} />
                                <Route path="/staff/add" exact component={StaffCreateContainer} />
                                <Route path="/staff/:slug" exact component={StaffRetrieveContainer} />
                                <Route path="/staff/:slug/update" exact component={StaffUpdateContainer} />
                                <Route path="/tasks" exact component={TaskListContainer} />
                                <Route path="/task/add" exact component={TaskCreateContainer} />
                                <Route path="/task/:slug" exact component={TaskRetrieveContainer} />
                                <Route path="/task/:slug/update" exact component={TaskUpdateContainer} />
                                <Route path="/reports" exact component={ReportListContainer} />
                                <Route path="/settings" exact component={SettingListContainer} />
                                <Route component={NotFound404Container} />
                            </Switch>
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(AppContainer);
