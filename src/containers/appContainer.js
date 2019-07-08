import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

// import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import PrivacyContainer from './general/privacyContainer';
import TermsContainer from './general/termsContainer';
import HelpContainer from './general/helpContainer';
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
import DistrictCreateStepContainer from "./settings/districts/create/districtCreateStep1Container";
import DistrictCreateStep2ResidentialContainer from "./settings/districts/create/districtCreateStep2RezContainer";
import DistrictCreateStep3ResidentialContainer from "./settings/districts/create/districtCreateStep3RezContainer";
import DistrictCreateStep2BusinessContainer from "./settings/districts/create/districtCreateStep2BizContainer";
import DistrictCreateStep3BusinessContainer from "./settings/districts/create/districtCreateStep3BizContainer";
import DistrictCreateStep2CommunityCareContainer from "./settings/districts/create/districtCreateStep2ComContainer";
import DistrictCreateStep3CommunityCareContainer from "./settings/districts/create/districtCreateStep3ComContainer";
import DistrictRetrieveBizContainer from "./settings/districts/retrieve/districtRetrieveBizContainer";
import DistrictRetrieveComContainer from "./settings/districts/retrieve/districtRetrieveComContainer";
import DistrictRetrieveRezContainer from "./settings/districts/retrieve/districtRetrieveRezContainer";
import DistrictUpdateBizContainer from "./settings/districts/update/districtUpdateBizContainer";
import DistrictUpdateComContainer from "./settings/districts/update/districtUpdateComContainer";
import DistrictUpdateRezContainer from "./settings/districts/update/districtUpdateRezContainer";

import WatchListContainer from "./watches/list/watchListContainer";
import WatchCreateStepContainer from "./watches/create/watchCreateStep1Container";
import WatchCreateStep2RezContainer from "./watches/create/watchCreateStep2RezContainer";
import WatchCreateStep2BizContainer from "./watches/create/watchCreateStep2BizContainer";
import WatchCreateStep2ComContainer from "./watches/create/watchCreateStep2ComContainer";
import WatchCreateStep3RezContainer from "./watches/create/watchCreateStep3RezContainer";
import WatchCreateStep3BizContainer from "./watches/create/watchCreateStep3BizContainer";
import WatchCreateStep3ComContainer from "./watches/create/watchCreateStep3ComContainer";
import WatchRetrieveRezContainer from "./watches/retrieve/watchRetrieveRezContainer";
import WatchRetrieveBizContainer from "./watches/retrieve/watchRetrieveBizContainer";
import WatchRetrieveComContainer from "./watches/retrieve/watchRetrieveComContainer";
import WatchUpdateRezContainer from "./watches/update/watchUpdateRezContainer";
import WatchUpdateBizContainer from "./watches/update/watchUpdateBizContainer";
import WatchUpdateComContainer from "./watches/update/watchUpdateComContainer";

import TagsListContainer from "./settings/tags/tagListContainer";
import TagDeleteContainer from "./settings/tags/tagDeleteContainer";
import TagCreateContainer from "./settings/tags/tagCreateContainer";
import TagUpdateContainer from "./settings/tags/tagUpdateContainer";

import HowHearsListContainer from "./settings/howHear/howHearListContainer";
import HowHearDeleteContainer from "./settings/howHear/howHearDeleteContainer";
import HowHearCreateContainer from "./settings/howHear/howHearCreateContainer";
import HowHearUpdateContainer from "./settings/howHear/howHearUpdateContainer";

import AnnouncementListContainer from "./settings/announcements/announcementListContainer";
import AnnouncementDeleteContainer from "./settings/announcements/announcementDeleteContainer";
import AnnouncementCreateContainer from "./settings/announcements/announcementCreateContainer";
import AnnouncementUpdateContainer from "./settings/announcements/announcementUpdateContainer";

import ResourcesListContainer from "./settings/resources/resourceListContainer";
import ResourceDeleteContainer from "./settings/resources/resourceDeleteContainer";
import ResourceCreateContainer from "./settings/resources/resourceCreateContainer";
import ResourceUpdateContainer from "./settings/resources/resourceUpdateContainer";

import MemberListActiveContainer from "./members/memberListActiveContainer";
import MemberListInactiveContainer from "./members/memberListInactiveContainer";
import MemberSearchContainer from "./members/memberSearchContainer";
import MemberSearchResultContainer from "./members/memberSearchResultContainer";
import MemberLiteRetrieveContainer from "./members/retrieve/memberLiteRetrieveContainer";
import MemberFullRetrieveContainer from "./members/retrieve/memberFullRetrieveContainer";
import MemberCreateStep1Container from "./members/create/memberCreateStep1Container";
import MemberCreateStep2BizContainer from "./members/create/memberCreateStep2BizContainer";
import MemberCreateStep2RezOrComContainer from "./members/create/memberCreateStep2RezOrComContainer";
import MemberCreateStep3Container from "./members/create/memberCreateStep3Container";
import MemberCreateStep4Container from "./members/create/memberCreateStep4Container";
import MemberCreateStep5Container from "./members/create/memberCreateStep5Container";
import MemberCreateStep6Container from "./members/create/memberCreateStep6Container";
import MemberUpdateContainer from "./members/update/memberUpdateContainer";
import MemberPromoteStep1Container from "./members/promote/memberPromoteStep1Container";
import MemberPromoteStep2Container from "./members/promote/memberPromoteStep2Container";

import ItemListContainer from "./items/list/itemListContainer";
import ItemRetrieveContainer from "./items/retrieve/itemRetrieveContainer";
import ItemCreateStep1Container from "./items/create/itemCreateStep1Container";
import ItemCreateStep2ConcernContainer from "./items/create/itemCreateStep2ConcernContainer";
import ItemCreateStep2EventContainer from "./items/create/itemCreateStep2EventContainer";
import ItemCreateStep2IncidentContainer from "./items/create/itemCreateStep2IncidentContainer";
import ItemCreateStep2InformationContainer from "./items/create/itemCreateStep2InformationContainer";
import ItemCreateStep3Container from "./items/create/itemCreateStep3Container";
import ItemUpdateContainer from "./items/update/itemUpdateContainer";
import ItemArchiveContainer from "./items/archive/itemArchiveContainer";

import AssociateListActiveContainer from "./associates/associateListActiveContainer";
import AssociateListInactiveContainer from "./associates/associateListInactiveContainer";
import AssociateSearchContainer from "./associates/associateSearchContainer";
import AssociateSearchResultContainer from "./associates/associateSearchResultContainer";
import AssociateRetrieveContainer from "./associates/associateRetrieveContainer";
import AssociateUpdateContainer from "./associates/associateUpdateContainer";
import AssociateCreateStep1Container from "./associates/create/associateCreateStep1Container";
import AssociateCreateStep2Container from "./associates/create/associateCreateStep2Container";
import AssociateCreateStep3Container from "./associates/create/associateCreateStep3Container";
import AssociateDemoteContainer from "./associates/demote/associateDemoteContainer";

import AreaCoordinatorListActiveContainer from "./areaCoordinators/areaCoordinatorListActiveContainer";
import AreaCoordinatorListInactiveContainer from "./areaCoordinators/areaCoordinatorListInactiveContainer";
import AreaCoordinatorSearchContainer from "./areaCoordinators/areaCoordinatorSearchContainer";
import AreaCoordinatorSearchResultContainer from "./areaCoordinators/areaCoordinatorSearchResultContainer";
import AreaCoordinatorRetrieveContainer from "./areaCoordinators/areaCoordinatorRetrieveContainer";
import AreaCoordinatorUpdateContainer from "./areaCoordinators/areaCoordinatorUpdateContainer";
import AreaCoordinatorCreateStep1Container from "./areaCoordinators/create/areaCoordinatorCreateStep1Container";
import AreaCoordinatorCreateStep2Container from "./areaCoordinators/create/areaCoordinatorCreateStep2Container";
import AreaCoordinatorCreateStep3Container from "./areaCoordinators/create/areaCoordinatorCreateStep3Container";
import AreaCoordinatorPromoteContainer from "./areaCoordinators/promote/areaCoordinatorPromoteContainer";
import AreaCoordinatorDemoteContainer from "./areaCoordinators/demote/areaCoordinatorDemoteContainer";
import AreaCoordinatorLiteRetrieveContainer from "./areaCoordinators/retrieve/areaCoordinatorLiteRetrieveContainer";
import AreaCoordinatorFullRetrieveContainer from "./areaCoordinators/retrieve/areaCoordinatorFullRetrieveContainer";

import StaffListActiveContainer from "./staff/staffListActiveContainer";
import StaffListInactiveContainer from "./staff/staffListInactiveContainer";
import StaffSearchContainer from "./staff/staffSearchContainer";
import StaffSearchResultContainer from "./staff/staffSearchResultContainer";
import StaffUpdateContainer from "./staff/update/staffUpdateContainer";
import StaffCreateStep1Container from "./staff/create/staffCreateStep1Container";
import StaffCreateStep2Container from "./staff/create/staffCreateStep2Container";
import StaffFullRetrieveContainer from "./staff/retrieve/staffFullRetrieveContainer";
import StaffLiteRetrieveContainer from "./staff/retrieve/staffLiteRetrieveContainer";

import TaskListActiveContainer from "./tasks/taskListActiveContainer";
import TaskListInactiveContainer from "./tasks/taskListInactiveContainer";
import TaskListUnassignedContainer from "./tasks/taskListUnassignedContainer";
import TaskSearchContainer from "./tasks/taskSearchContainer";
import TaskSearchResultContainer from "./tasks/taskSearchResultContainer";
import TaskRetrieveContainer from "./tasks/taskRetrieveContainer";
import TaskUpdateContainer from "./tasks/taskUpdateContainer";

import ReportListContainer from "./reports/reportListContainer";

import SettingListContainer from "./settings/settingListContainer";

import UnpaidFinancialListContainer from "./financials/list/unpaidFinancialListContainer";
import PaidFinancialListContainer from "./financials/list/paidFinancialListContainer";
import AllFinancialListContainer from "./financials/list/allFinancialListContainer";
import FinanciaRetrieveContainer from "./financials/retrieve/financialRetrieveContainer";
import FinanciaUpdateContainer from "./financials/update/financialUpdateContainer";


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
                                <Route path="/help" exact component={HelpContainer} />
                                <Route path="/organizations" exact component={SharedOrganizationListContainer} />
                                <Route path="/organization/add" exact component={SharedOrganizationCreateContainer} />
                                <Route path="/dashboard-redirect/:accessToken/:expires/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={DashboardContainer} />
                                <Route path="/settings/districts" exact component={DistrictsListContainer} />
                                <Route path="/settings/district/step-1-create" exact component={DistrictCreateStepContainer} />
                                <Route path="/settings/district/step-2-create-rez" exact component={DistrictCreateStep2ResidentialContainer} />
                                <Route path="/settings/district/step-3-create-rez" exact component={DistrictCreateStep3ResidentialContainer} />
                                <Route path="/settings/district/step-2-create-biz" exact component={DistrictCreateStep2BusinessContainer} />
                                <Route path="/settings/district/step-3-create-biz" exact component={DistrictCreateStep3BusinessContainer} />
                                <Route path="/settings/district/step-2-create-cc" exact component={DistrictCreateStep2CommunityCareContainer} />
                                <Route path="/settings/district/step-3-create-cc" exact component={DistrictCreateStep3CommunityCareContainer} />
                                <Route path="/settings/district-biz/:slug" exact component={DistrictRetrieveBizContainer} />
                                <Route path="/settings/district-cc/:slug" exact component={DistrictRetrieveComContainer} />
                                <Route path="/settings/district-rez/:slug" exact component={DistrictRetrieveRezContainer} />
                                <Route path="/settings/district-biz/:slug/update" exact component={DistrictUpdateBizContainer} />
                                <Route path="/settings/district-cc/:slug/update" exact component={DistrictUpdateComContainer} />
                                <Route path="/settings/district-rez/:slug/update" exact component={DistrictUpdateRezContainer} />
                                <Route path="/settings/tags" exact component={TagsListContainer} />
                                <Route path="/settings/tag/add" exact component={TagCreateContainer} />
                                <Route path="/settings/tag/:slug/delete" exact component={TagDeleteContainer} />
                                <Route path="/settings/tag/:slug/update" exact component={TagUpdateContainer} />
                                <Route path="/settings/how-hears" exact component={HowHearsListContainer} />
                                <Route path="/settings/how-hears/add" exact component={HowHearCreateContainer} />
                                <Route path="/settings/how-hear/:slug/delete" exact component={HowHearDeleteContainer} />
                                <Route path="/settings/how-hear/:slug/update" exact component={HowHearUpdateContainer} />
                                <Route path="/settings/announcements" exact component={AnnouncementListContainer} />
                                <Route path="/settings/announcements/add" exact component={AnnouncementCreateContainer} />
                                <Route path="/settings/announcement/:slug/delete" exact component={AnnouncementDeleteContainer} />
                                <Route path="/settings/announcement/:slug/update" exact component={AnnouncementUpdateContainer} />
                                <Route path="/settings/resources" exact component={ResourcesListContainer} />
                                <Route path="/settings/resource/add" exact component={ResourceCreateContainer} />
                                <Route path="/settings/resource/:slug/delete" exact component={ResourceDeleteContainer} />
                                <Route path="/settings/resource/:slug/update" exact component={ResourceUpdateContainer} />
                                <Route path="/members/add/step-1" exact component={MemberCreateStep1Container} />
                                <Route path="/members/add/step-2-biz" exact component={MemberCreateStep2BizContainer} />
                                <Route path="/members/add/step-2-rez-or-cc" exact component={MemberCreateStep2RezOrComContainer} />
                                <Route path="/members/add/step-3" exact component={MemberCreateStep3Container} />
                                <Route path="/members/add/step-4" exact component={MemberCreateStep4Container} />
                                <Route path="/members/add/step-5" exact component={MemberCreateStep5Container} />
                                <Route path="/members/add/step-6" exact component={MemberCreateStep6Container} />
                                <Route path="/members/active" exact component={MemberListActiveContainer} />
                                <Route path="/members/inactive" exact component={MemberListInactiveContainer} />
                                <Route path="/members/:urlArgument/search" exact component={MemberSearchContainer} />
                                <Route path="/members/:urlArgument/search-results" exact component={MemberSearchResultContainer} />
                                <Route path="/members/:urlArgument/:slug" exact component={MemberLiteRetrieveContainer} />
                                <Route path="/members/:urlArgument/:slug/full" exact component={MemberFullRetrieveContainer} />
                                <Route path="/members/:urlArgument/:slug/update" exact component={MemberUpdateContainer} />
                                <Route path="/members/:urlArgument/:slug/promote/step-1" exact component={MemberPromoteStep1Container} />
                                <Route path="/members/:urlArgument/:slug/promote/step-2" exact component={MemberPromoteStep2Container} />
                                <Route path="/items" exact component={ItemListContainer} />
                                <Route path="/item/add/step-1" exact component={ItemCreateStep1Container} />
                                <Route path="/item/add/step-2-concern" exact component={ItemCreateStep2ConcernContainer} />
                                <Route path="/item/add/step-2-event" exact component={ItemCreateStep2EventContainer} />
                                <Route path="/item/add/step-2-incident" exact component={ItemCreateStep2IncidentContainer} />
                                <Route path="/item/add/step-2-information" exact component={ItemCreateStep2InformationContainer} />
                                <Route path="/item/add/step-3" exact component={ItemCreateStep3Container} />
                                <Route path="/item/:slug" exact component={ItemRetrieveContainer} />
                                <Route path="/item/:slug/update" exact component={ItemUpdateContainer} />
                                <Route path="/item/:slug/archive" exact component={ItemArchiveContainer} />
                                <Route path="/associates/add/step-1" exact component={AssociateCreateStep1Container} />
                                <Route path="/associates/add/step-2" exact component={AssociateCreateStep2Container} />
                                <Route path="/associates/add/step-3" exact component={AssociateCreateStep3Container} />
                                <Route path="/associates/active" exact component={AssociateListActiveContainer} />
                                <Route path="/associates/inactive" exact component={AssociateListInactiveContainer} />
                                <Route path="/associates/:urlArgument/search" exact component={AssociateSearchContainer} />
                                <Route path="/associates/:urlArgument/search-results" exact component={AssociateSearchResultContainer} />
                                <Route path="/associates/:urlArgument/:slug" exact component={AssociateRetrieveContainer} />
                                <Route path="/associates/:urlArgument/:slug/update" exact component={AssociateUpdateContainer} />
                                <Route path="/associates/:urlArgument/:slug/demote" exact component={AssociateDemoteContainer} />
                                <Route path="/area-coordinators/add/step-1" exact component={AreaCoordinatorCreateStep1Container} />
                                <Route path="/area-coordinators/add/step-2" exact component={AreaCoordinatorCreateStep2Container} />
                                <Route path="/area-coordinators/add/step-3" exact component={AreaCoordinatorCreateStep3Container} />
                                <Route path="/area-coordinators/active" exact component={AreaCoordinatorListActiveContainer} />
                                <Route path="/area-coordinators/inactive" exact component={AreaCoordinatorListInactiveContainer} />
                                <Route path="/area-coordinators/:urlArgument/search" exact component={AreaCoordinatorSearchContainer} />
                                <Route path="/area-coordinators/:urlArgument/search-results" exact component={AreaCoordinatorSearchResultContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug" exact component={AreaCoordinatorLiteRetrieveContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug/full" exact component={AreaCoordinatorFullRetrieveContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug/update" exact component={AreaCoordinatorUpdateContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug/promote" exact component={AreaCoordinatorPromoteContainer} />
                                <Route path="/area-coordinators/:urlArgument/:slug/demote" exact component={AreaCoordinatorDemoteContainer} />
                                <Route path="/staff/add/step-1" exact component={StaffCreateStep1Container} />
                                <Route path="/staff/add/step-2" exact component={StaffCreateStep2Container} />
                                <Route path="/staff/active" exact component={StaffListActiveContainer} />
                                <Route path="/staff/inactive" exact component={StaffListInactiveContainer} />
                                <Route path="/staff/:urlArgument/search" exact component={StaffSearchContainer} />
                                <Route path="/staff/:urlArgument/search-results" exact component={StaffSearchResultContainer} />
                                <Route path="/staff/:urlArgument/:slug" exact component={StaffLiteRetrieveContainer} />
                                <Route path="/staff/:urlArgument/:slug/full" exact component={StaffFullRetrieveContainer} />
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
                                <Route path="/watches" exact component={WatchListContainer} />
                                <Route path="/watches/step-1-create" exact component={WatchCreateStepContainer} />
                                <Route path="/watches/step-2-create-rez" exact component={WatchCreateStep2RezContainer} />
                                <Route path="/watches/step-2-create-biz" exact component={WatchCreateStep2BizContainer} />
                                <Route path="/watches/step-2-create-cc" exact component={WatchCreateStep2ComContainer} />
                                <Route path="/watches/step-3-create-rez" exact component={WatchCreateStep3RezContainer} />
                                <Route path="/watches/step-3-create-biz" exact component={WatchCreateStep3BizContainer} />
                                <Route path="/watches/step-3-create-cc" exact component={WatchCreateStep3ComContainer} />
                                <Route path="/watch-biz/:slug" exact component={WatchRetrieveBizContainer} />
                                <Route path="/watch-cc/:slug" exact component={WatchRetrieveComContainer} />
                                <Route path="/watch-rez/:slug" exact component={WatchRetrieveRezContainer} />
                                <Route path="/watch-biz/:slug/update" exact component={WatchUpdateBizContainer} />
                                <Route path="/watch-cc/:slug/update" exact component={WatchUpdateComContainer} />
                                <Route path="/watch-rez/:slug/update" exact component={WatchUpdateRezContainer} />
                                <Route path="/financials/unpaid" exact component={UnpaidFinancialListContainer} />
                                <Route path="/financials/paid" exact component={PaidFinancialListContainer} />
                                <Route path="/financials/all" exact component={AllFinancialListContainer} />
                                <Route path="/financial/:slug" exact component={FinanciaRetrieveContainer} />
                                <Route path="/financial/:slug/update" exact component={FinanciaUpdateContainer} />
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
