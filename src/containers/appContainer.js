import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

// import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import PrivacyContainer from './general/privacyContainer';
import TermsContainer from './general/termsContainer';
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

import DistrictsListContainer from "./settings/districts/districtsListContainer";
import DistrictRetrieveContainer from "./settings/districts/districtRetrieveContainer";
import DistrictUpdateContainer from "./settings/districts/districtUpdateContainer";
import DistrictCreateStepContainer from "./settings/districts/create/districtCreateStep1Container";
import DistrictCreateStep2ResidentialContainer from "./settings/districts/create/districtCreateStep2RezContainer";
import DistrictCreateStep2BusinessContainer from "./settings/districts/create/districtCreateStep2BizContainer";
import DistrictCreateStep3BusinessContainer from "./settings/districts/create/districtCreateStep3BizContainer";
import DistrictCreateStep2CommunityCareContainer from "./settings/districts/create/districtCreateStep2ComContainer";

import TagsListContainer from "./settings/tags/tagListContainer";
import TagRetrieveContainer from "./settings/tags/tagRetrieveContainer";
import TagCreateContainer from "./settings/tags/tagCreateContainer";
import TagUpdateContainer from "./settings/tags/tagUpdateContainer";

import HowHearsListContainer from "./settings/howHear/howHearListContainer";
import HowHearRetrieveContainer from "./settings/howHear/howHearRetrieveContainer";
import HowHearCreateContainer from "./settings/howHear/howHearCreateContainer";
import HowHearUpdateContainer from "./settings/howHear/howHearUpdateContainer";

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

import AssociateListActiveContainer from "./associates/associateListActiveContainer";
import AssociateListInactiveContainer from "./associates/associateListInactiveContainer";
import AssociateSearchContainer from "./associates/associateSearchContainer";
import AssociateSearchResultContainer from "./associates/associateSearchResultContainer";
import AssociateRetrieveContainer from "./associates/associateRetrieveContainer";
import AssociateCreateContainer from "./associates/associateCreateContainer";
import AssociateUpdateContainer from "./associates/associateUpdateContainer";

import AreaCoordinatorListActiveContainer from "./areaCoordinators/areaCoordinatorListActiveContainer";
import AreaCoordinatorListInactiveContainer from "./areaCoordinators/areaCoordinatorListInactiveContainer";
import AreaCoordinatorSearchContainer from "./areaCoordinators/areaCoordinatorSearchContainer";
import AreaCoordinatorSearchResultContainer from "./areaCoordinators/areaCoordinatorSearchResultContainer";
import AreaCoordinatorRetrieveContainer from "./areaCoordinators/areaCoordinatorRetrieveContainer";
import AreaCoordinatorCreateContainer from "./areaCoordinators/areaCoordinatorCreateContainer";
import AreaCoordinatorUpdateContainer from "./areaCoordinators/areaCoordinatorUpdateContainer";

import StaffListActiveContainer from "./staff/staffListActiveContainer";
import StaffListInactiveContainer from "./staff/staffListInactiveContainer";
import StaffSearchContainer from "./staff/staffSearchContainer";
import StaffSearchResultContainer from "./staff/staffSearchResultContainer";
import StaffRetrieveContainer from "./staff/staffRetrieveContainer";
import StaffCreateContainer from "./staff/staffCreateContainer";
import StaffUpdateContainer from "./staff/staffUpdateContainer";

import TaskListActiveContainer from "./tasks/taskListActiveContainer";
import TaskListInactiveContainer from "./tasks/taskListInactiveContainer";
import TaskListUnassignedContainer from "./tasks/taskListUnassignedContainer";
import TaskSearchContainer from "./tasks/taskSearchContainer";
import TaskSearchResultContainer from "./tasks/taskSearchResultContainer";
import TaskRetrieveContainer from "./tasks/taskRetrieveContainer";
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
                                <Route path="/" exact component={LoginContainer} />
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
                                <Route path="/settings/districts" exact component={DistrictsListContainer} />
                                <Route path="/settings/district/step-1-create" exact component={DistrictCreateStepContainer} />
                                <Route path="/settings/district/step-2-create-rez" exact component={DistrictCreateStep2ResidentialContainer} />
                                <Route path="/settings/district/step-2-create-biz" exact component={DistrictCreateStep2BusinessContainer} />
                                <Route path="/settings/district/step-3-create-biz" exact component={DistrictCreateStep3BusinessContainer} />
                                <Route path="/settings/district/step-2-create-cc" exact component={DistrictCreateStep2CommunityCareContainer} />
                                <Route path="/settings/district/:slug" exact component={DistrictRetrieveContainer} />
                                <Route path="/settings/district/:slug/update" exact component={DistrictUpdateContainer} />
                                <Route path="/settings/tags" exact component={TagsListContainer} />
                                <Route path="/settings/tag/add" exact component={TagCreateContainer} />
                                <Route path="/settings/tag/:slug" exact component={TagRetrieveContainer} />
                                <Route path="/settings/tag/:slug/update" exact component={TagUpdateContainer} />
                                <Route path="/settings/how-hears" exact component={HowHearsListContainer} />
                                <Route path="/settings/how-hears/add" exact component={HowHearCreateContainer} />
                                <Route path="/settings/how-hear/:slug" exact component={HowHearRetrieveContainer} />
                                <Route path="/settings/how-hear/:slug/update" exact component={HowHearUpdateContainer} />
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
                                <Route path="/associates/add" exact component={AssociateCreateContainer} />
                                <Route path="/associates/active" exact component={AssociateListActiveContainer} />
                                <Route path="/associates/inactive" exact component={AssociateListInactiveContainer} />
                                <Route path="/associates/:urlArgument/search" exact component={AssociateSearchContainer} />
                                <Route path="/associates/:urlArgument/search-results" exact component={AssociateSearchResultContainer} />
                                <Route path="/associates/:urlArgument/:slug" exact component={AssociateRetrieveContainer} />
                                <Route path="/associates/:urlArgument/:slug/update" exact component={AssociateUpdateContainer} />
                                <Route path="/area-coordinators/add" exact component={AreaCoordinatorCreateContainer} />
                                <Route path="/area-coordinators/active" exact component={AreaCoordinatorListActiveContainer} />
                                <Route path="/area-coordinators/inactive" exact component={AreaCoordinatorListInactiveContainer} />
                                <Route path="/area-coordinators/:urlArgument/search" exact component={AreaCoordinatorSearchContainer} />
                                <Route path="/area-coordinators/:urlArgument/search-results" exact component={AreaCoordinatorSearchResultContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug" exact component={AreaCoordinatorRetrieveContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug/update" exact component={AreaCoordinatorUpdateContainer} />
                                <Route path="/staff/add" exact component={StaffCreateContainer} />
                                <Route path="/staff/active" exact component={StaffListActiveContainer} />
                                <Route path="/staff/inactive" exact component={StaffListInactiveContainer} />
                                <Route path="/staff/:urlArgument/search" exact component={StaffSearchContainer} />
                                <Route path="/staff/:urlArgument/search-results" exact component={StaffSearchResultContainer} />
                                <Route path="/staff/:urlArgument/:slug" exact component={StaffRetrieveContainer} />
                                <Route path="/staff/:urlArgument/:slug/update" exact component={StaffUpdateContainer} />
                                <Route path="/tasks/unassigned" exact component={TaskListUnassignedContainer} />
                                <Route path="/tasks/pending" exact component={TaskListActiveContainer} />
                                <Route path="/tasks/closed" exact component={TaskListInactiveContainer} />
                                <Route path="/tasks/:urlArgument/search" exact component={TaskSearchContainer} />
                                <Route path="/tasks/:urlArgument/search-results" exact component={TaskSearchResultContainer} />
                                <Route path="/tasks/:urlArgument/:slug" exact component={TaskRetrieveContainer} />
                                <Route path="/tasks/:urlArgument/:slug/update" exact component={TaskUpdateContainer} />
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
