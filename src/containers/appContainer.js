import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import PrivacyContainer from './general/privacyContainer';
import TermsContainer from './general/termsContainer';
import HelpContainer from './general/helpContainer';
import LoginContainer from "./account/loginContainer";
import LogoutContainer from "./account/logoutContainer";
import SendResetPasswordContainer from "./account/auth/sendResetPasswordContainer";
import SendResetPasswordSuccessContainer from "./account/auth/sendResetPasswordSuccessContainer";
import ResetPasswordContainer from "./account/auth/resetPasswordContainer";
import ResetPasswordSuccessContainer from "./account/auth/resetPasswordSuccessContainer";

import RegisterStep1Container from "./account/register/registerStep1Container";
import RegisterStep2BizContainer from "./account/register/registerStep2BizContainer";
import RegisterStep2RezOrComContainer from "./account/register/registerStep2RezOrComContainer";
import RegisterStep3Container from "./account/register/registerStep3Container";
import RegisterStep4Container from "./account/register/registerStep4Container";
import RegisterStep5Container from "./account/register/registerStep5Container";
import RegisterStep6Container from "./account/register/registerStep6Container";
import RegisterStep7Container from "./account/register/registerStep7Container";

// import ActivateContainer from "./account/activateContainer";
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
import WatchCreateStep2RezContainer from "./watches/create/rez/watchCreateStep2RezContainer";
import WatchCreateStep3RezContainer from "./watches/create/rez/watchCreateStep3RezContainer";
import WatchCreateStep4RezContainer from "./watches/create/rez/watchCreateStep4RezContainer";
import WatchCreateStep2BizContainer from "./watches/create/biz/watchCreateStep2BizContainer";
import WatchCreateStep3BizContainer from "./watches/create/biz/watchCreateStep3BizContainer";
import WatchCreateStep4BizContainer from "./watches/create/biz/watchCreateStep4BizContainer";
import WatchCreateStep2ComContainer from "./watches/create/com/watchCreateStep2ComContainer";
import WatchCreateStep3ComContainer from "./watches/create/com/watchCreateStep3ComContainer";
import WatchCreateStep4ComContainer from "./watches/create/com/watchCreateStep4ComContainer";
import WatchRetrieveContainer from "./watches/retrieve/watchRetrieveContainer";
import WatchUpdateContainer from "./watches/update/watchUpdateContainer";

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

import MemberListContainer from "./members/list/memberListContainer";
import MemberSearchContainer from "./members/search/memberSearchContainer";
import MemberSearchResultContainer from "./members/search/memberSearchResultContainer";
import MemberLiteRetrieveContainer from "./members/retrieve/memberLiteRetrieveContainer";
import MemberFullRetrieveContainer from "./members/retrieve/memberFullRetrieveContainer";
import MemberCreateStep1Container from "./members/create/memberCreateStep1Container";
import MemberCreateStep2Container from "./members/create/memberCreateStep2Container";
import MemberCreateStep3Container from "./members/create/memberCreateStep3Container";
import MemberCreateStep4BizContainer from "./members/create/memberCreateStep4BizContainer";
import MemberCreateStep4RezOrComContainer from "./members/create/memberCreateStep4RezOrComContainer";
import MemberCreateStep5Container from "./members/create/memberCreateStep5Container";
import MemberCreateStep6Container from "./members/create/memberCreateStep6Container";
import MemberCreateStep7Container from "./members/create/memberCreateStep7Container";
import MemberCreateStep8Container from "./members/create/memberCreateStep8Container";
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

import AssociateListContainer from "./associates/list/associateListContainer";
import AssociateSearchContainer from "./associates/search/associateSearchContainer";
import AssociateSearchResultContainer from "./associates/search/associateSearchResultContainer";
import AssociateLiteRetrieveContainer from "./associates/retrieve/associateLiteRetrieveContainer";
import AssociateFullRetrieveContainer from "./associates/retrieve/associateFullRetrieveContainer";
import AssociateUpdateContainer from "./associates/update/associateUpdateContainer";
import AssociateCreateStep1Container from "./associates/create/associateCreateStep1Container";
import AssociateCreateStep2Container from "./associates/create/associateCreateStep2Container";
import AssociateCreateStep3Container from "./associates/create/associateCreateStep3Container";
import AssociateDemoteContainer from "./associates/demote/associateDemoteContainer";

import AreaCoordinatorListContainer from "./areaCoordinators/list/areaCoordinatorListContainer";
import AreaCoordinatorSearchContainer from "./areaCoordinators/search/areaCoordinatorSearchContainer";
import AreaCoordinatorSearchResultContainer from "./areaCoordinators/search/areaCoordinatorSearchResultContainer";
import AreaCoordinatorUpdateContainer from "./areaCoordinators/update/areaCoordinatorUpdateContainer";
import AreaCoordinatorCreateStep1Container from "./areaCoordinators/create/areaCoordinatorCreateStep1Container";
import AreaCoordinatorCreateStep2Container from "./areaCoordinators/create/areaCoordinatorCreateStep2Container";
import AreaCoordinatorCreateStep3Container from "./areaCoordinators/create/areaCoordinatorCreateStep3Container";
import AreaCoordinatorPromoteContainer from "./areaCoordinators/promote/areaCoordinatorPromoteContainer";
import AreaCoordinatorDemoteContainer from "./areaCoordinators/demote/areaCoordinatorDemoteContainer";
import AreaCoordinatorLiteRetrieveContainer from "./areaCoordinators/retrieve/areaCoordinatorLiteRetrieveContainer";
import AreaCoordinatorFullRetrieveContainer from "./areaCoordinators/retrieve/areaCoordinatorFullRetrieveContainer";

import StaffListContainer from "./staff/list/staffListContainer";
import StaffSearchContainer from "./staff/staffSearchContainer";
import StaffSearchResultContainer from "./staff/staffSearchResultContainer";
import StaffUpdateContainer from "./staff/update/staffUpdateContainer";
import StaffCreateStep1Container from "./staff/create/staffCreateStep1Container";
import StaffCreateStep2Container from "./staff/create/staffCreateStep2Container";
import StaffFullRetrieveContainer from "./staff/retrieve/staffFullRetrieveContainer";
import StaffLiteRetrieveContainer from "./staff/retrieve/staffLiteRetrieveContainer";

import TaskListContainer from "./tasks/list/taskListContainer";
import AssignWatchAssociateTaskStep1Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep1Container";
import AssignWatchAssociateTaskStep2Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep2Container";
import AssignWatchAssociateTaskStep3Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep3Container";
import AssignWatchAreaCoordinatorTaskStep1Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep1Container";
import AssignWatchAreaCoordinatorTaskStep2Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep2Container";
import AssignWatchAreaCoordinatorTaskStep3Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep3Container";

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
                                <Route path="/register" exact component={RegisterStep1Container} />
                                <Route path="/register/step-1" exact component={RegisterStep1Container} />
                                <Route path="/register/step-2-biz" exact component={RegisterStep2BizContainer} />
                                <Route path="/register/step-2-rez-or-cc" exact component={RegisterStep2RezOrComContainer} />
                                <Route path="/register/step-3" exact component={RegisterStep3Container} />
                                <Route path="/register/step-4" exact component={RegisterStep4Container} />
                                <Route path="/register/step-5" exact component={RegisterStep5Container} />
                                <Route path="/register/step-6" exact component={RegisterStep6Container} />
                                <Route path="/register/step-7" exact component={RegisterStep7Container} />
                                <Route path="/send-password-reset" exact component={SendResetPasswordContainer} />
                                <Route path="/send-password-reset-success" exact component={SendResetPasswordSuccessContainer} />
                                <Route path="/reset-password/:code" exact component={ResetPasswordContainer} />
                                <Route path="/reset-password-success" exact component={ResetPasswordSuccessContainer} />
                                <Route path="/privacy" exact component={PrivacyContainer} />
                                <Route path="/terms" exact component={TermsContainer} />
                                <Route path="/help" exact component={HelpContainer} />
                                <Route path="/organizations" exact component={requiresAuth(SharedOrganizationListContainer)} />
                                <Route path="/organization/add" exact component={requiresAuth(SharedOrganizationCreateContainer)} />
                                <Route path="/dashboard-redirect/:accessToken/:refreshToken" exact component={requiresAuth(TenantDashboardRedirectContainer)} />
                                <Route path="/dashboard" exact component={requiresAuth(DashboardContainer)} />
                                <Route path="/settings/districts" exact component={requiresAuth(DistrictsListContainer)} />
                                <Route path="/settings/district/step-1-create" exact component={requiresAuth(DistrictCreateStepContainer)} />
                                <Route path="/settings/district/step-2-create-rez" exact component={requiresAuth(DistrictCreateStep2ResidentialContainer)} />
                                <Route path="/settings/district/step-3-create-rez" exact component={requiresAuth(DistrictCreateStep3ResidentialContainer)} />
                                <Route path="/settings/district/step-2-create-biz" exact component={requiresAuth(DistrictCreateStep2BusinessContainer)} />
                                <Route path="/settings/district/step-3-create-biz" exact component={requiresAuth(DistrictCreateStep3BusinessContainer)} />
                                <Route path="/settings/district/step-2-create-cc" exact component={requiresAuth(DistrictCreateStep2CommunityCareContainer)} />
                                <Route path="/settings/district/step-3-create-cc" exact component={requiresAuth(DistrictCreateStep3CommunityCareContainer)} />
                                <Route path="/settings/district-biz/:slug" exact component={requiresAuth(DistrictRetrieveBizContainer)} />
                                <Route path="/settings/district-cc/:slug" exact component={requiresAuth(DistrictRetrieveComContainer)} />
                                <Route path="/settings/district-rez/:slug" exact component={requiresAuth(DistrictRetrieveRezContainer)} />
                                <Route path="/settings/district-biz/:slug/update" exact component={requiresAuth(DistrictUpdateBizContainer)} />
                                <Route path="/settings/district-cc/:slug/update" exact component={requiresAuth(DistrictUpdateComContainer)} />
                                <Route path="/settings/district-rez/:slug/update" exact component={requiresAuth(DistrictUpdateRezContainer)} />
                                <Route path="/settings/tags" exact component={requiresAuth(TagsListContainer)} />
                                <Route path="/settings/tag/add" exact component={requiresAuth(TagCreateContainer)} />
                                <Route path="/settings/tag/:slug/delete" exact component={requiresAuth(TagDeleteContainer)} />
                                <Route path="/settings/tag/:slug/update" exact component={requiresAuth(TagUpdateContainer)} />
                                <Route path="/settings/how-hears" exact component={requiresAuth(HowHearsListContainer)} />
                                <Route path="/settings/how-hears/add" exact component={requiresAuth(HowHearCreateContainer)} />
                                <Route path="/settings/how-hear/:slug/delete" exact component={requiresAuth(HowHearDeleteContainer)} />
                                <Route path="/settings/how-hear/:slug/update" exact component={requiresAuth(HowHearUpdateContainer)} />
                                <Route path="/settings/announcements" exact component={requiresAuth(AnnouncementListContainer)} />
                                <Route path="/settings/announcements/add" exact component={requiresAuth(AnnouncementCreateContainer)} />
                                <Route path="/settings/announcement/:slug/delete" exact component={requiresAuth(AnnouncementDeleteContainer)} />
                                <Route path="/settings/announcement/:slug/update" exact component={requiresAuth(AnnouncementUpdateContainer)} />
                                <Route path="/settings/resources" exact component={requiresAuth(ResourcesListContainer)} />
                                <Route path="/settings/resource/add" exact component={requiresAuth(ResourceCreateContainer)} />
                                <Route path="/settings/resource/:slug/delete" exact component={requiresAuth(ResourceDeleteContainer)} />
                                <Route path="/settings/resource/:slug/update" exact component={requiresAuth(ResourceUpdateContainer)} />
                                <Route path="/members/add/step-1" exact component={requiresAuth(MemberCreateStep1Container)} />
                                <Route path="/members/add/step-2" exact component={requiresAuth(MemberCreateStep2Container)} />
                                <Route path="/members/add/step-3" exact component={requiresAuth(MemberCreateStep3Container)} />
                                <Route path="/members/add/step-4-biz" exact component={requiresAuth(MemberCreateStep4BizContainer)} />
                                <Route path="/members/add/step-4-rez-or-cc" exact component={requiresAuth(MemberCreateStep4RezOrComContainer)} />
                                <Route path="/members/add/step-5" exact component={requiresAuth(MemberCreateStep5Container)} />
                                <Route path="/members/add/step-6" exact component={requiresAuth(MemberCreateStep6Container)} />
                                <Route path="/members/add/step-7" exact component={requiresAuth(MemberCreateStep7Container)} />
                                <Route path="/members/add/step-8" exact component={requiresAuth(MemberCreateStep8Container)} />
                                <Route path="/members" exact component={requiresAuth(MemberListContainer)} />
                                <Route path="/members/search" exact component={requiresAuth(MemberSearchContainer)} />
                                <Route path="/members/search-results" exact component={requiresAuth(MemberSearchResultContainer)} />
                                <Route path="/member/:slug" exact component={requiresAuth(MemberLiteRetrieveContainer)} />
                                <Route path="/member/:slug/full" exact component={requiresAuth(MemberFullRetrieveContainer)} />
                                <Route path="/member/:slug/update" exact component={requiresAuth(MemberUpdateContainer)} />
                                <Route path="/member/:slug/promote/step-1" exact component={requiresAuth(MemberPromoteStep1Container)} />
                                <Route path="/member/:slug/promote/step-2" exact component={requiresAuth(MemberPromoteStep2Container)} />
                                <Route path="/items" exact component={requiresAuth(ItemListContainer)} />
                                <Route path="/item/add/step-1" exact component={requiresAuth(ItemCreateStep1Container)} />
                                <Route path="/item/add/step-2-concern" exact component={requiresAuth(ItemCreateStep2ConcernContainer)} />
                                <Route path="/item/add/step-2-event" exact component={requiresAuth(ItemCreateStep2EventContainer)} />
                                <Route path="/item/add/step-2-incident" exact component={requiresAuth(ItemCreateStep2IncidentContainer)} />
                                <Route path="/item/add/step-2-information" exact component={requiresAuth(ItemCreateStep2InformationContainer)} />
                                <Route path="/item/add/step-3" exact component={requiresAuth(ItemCreateStep3Container)} />
                                <Route path="/item/:slug" exact component={requiresAuth(ItemRetrieveContainer)} />
                                <Route path="/item/:slug/update" exact component={requiresAuth(ItemUpdateContainer)} />
                                <Route path="/item/:slug/archive" exact component={requiresAuth(ItemArchiveContainer)} />
                                <Route path="/associates/add/step-1" exact component={requiresAuth(AssociateCreateStep1Container)} />
                                <Route path="/associates/add/step-2" exact component={requiresAuth(AssociateCreateStep2Container)} />
                                <Route path="/associates/add/step-3" exact component={requiresAuth(AssociateCreateStep3Container)} />
                                <Route path="/associates" exact component={requiresAuth(AssociateListContainer)} />
                                <Route path="/associates/search" exact component={requiresAuth(AssociateSearchContainer)} />
                                <Route path="/associates/search-results" exact component={requiresAuth(AssociateSearchResultContainer)} />
                                <Route path="/associate/:slug" exact component={requiresAuth(AssociateLiteRetrieveContainer)} />
                                <Route path="/associate/:slug/full" exact component={requiresAuth(AssociateFullRetrieveContainer)} />
                                <Route path="/associate/:slug/update" exact component={requiresAuth(AssociateUpdateContainer)} />
                                <Route path="/associate/:slug/demote" exact component={requiresAuth(AssociateDemoteContainer)} />
                                <Route path="/area-coordinators/add/step-1" exact component={requiresAuth(AreaCoordinatorCreateStep1Container)} />
                                <Route path="/area-coordinators/add/step-2" exact component={requiresAuth(AreaCoordinatorCreateStep2Container)} />
                                <Route path="/area-coordinators/add/step-3" exact component={requiresAuth(AreaCoordinatorCreateStep3Container)} />
                                <Route path="/area-coordinators" exact component={requiresAuth(AreaCoordinatorListContainer)} />
                                <Route path="/area-coordinators/search" exact component={requiresAuth(AreaCoordinatorSearchContainer)} />
                                <Route path="/area-coordinators/search-results" exact component={requiresAuth(AreaCoordinatorSearchResultContainer)} />
                                <Route path="/area-coordinator/:slug" exact component={requiresAuth(AreaCoordinatorLiteRetrieveContainer)} />
                                <Route path="/area-coordinator/:slug/full" exact component={requiresAuth(AreaCoordinatorFullRetrieveContainer)} />
                                <Route path="/area-coordinator/:slug/update" exact component={requiresAuth(AreaCoordinatorUpdateContainer)} />
                                <Route path="/area-coordinator/:slug/promote" exact component={requiresAuth(AreaCoordinatorPromoteContainer)} />
                                <Route path="/area-coordinator/:slug/demote" exact component={requiresAuth(AreaCoordinatorDemoteContainer)} />
                                <Route path="/staff/add/step-1" exact component={requiresAuth(StaffCreateStep1Container)} />
                                <Route path="/staff/add/step-2" exact component={requiresAuth(StaffCreateStep2Container)} />
                                <Route path="/staff" exact component={requiresAuth(StaffListContainer)} />
                                <Route path="/staff/search" exact component={requiresAuth(StaffSearchContainer)} />
                                <Route path="/staff/search-results" exact component={requiresAuth(StaffSearchResultContainer)} />
                                <Route path="/staff/:slug" exact component={requiresAuth(StaffLiteRetrieveContainer)} />
                                <Route path="/staff/:slug/full" exact component={requiresAuth(StaffFullRetrieveContainer)} />
                                <Route path="/staff/:slug/update" exact component={requiresAuth(StaffUpdateContainer)} />
                                <Route path="/tasks" exact component={requiresAuth(TaskListContainer)} />
                                <Route path="/task/1/:slug/step-1" exact component={requiresAuth(AssignWatchAssociateTaskStep1Container)} />
                                <Route path="/task/1/:slug/step-2" exact component={requiresAuth(AssignWatchAssociateTaskStep2Container)} />
                                <Route path="/task/1/:slug/step-3" exact component={requiresAuth(AssignWatchAssociateTaskStep3Container)} />
                                <Route path="/task/2/:slug/step-1" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep1Container)} />
                                <Route path="/task/2/:slug/step-2" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep2Container)} />
                                <Route path="/task/2/:slug/step-3" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep3Container)} />
                                <Route path="/reports" exact component={requiresAuth(ReportListContainer)} />
                                <Route path="/settings" exact component={requiresAuth(SettingListContainer)} />
                                <Route path="/watches" exact component={requiresAuth(WatchListContainer)} />
                                <Route path="/watches/step-1-create" exact component={requiresAuth(WatchCreateStepContainer)} />
                                <Route path="/watches/step-2-create-rez" exact component={requiresAuth(WatchCreateStep2RezContainer)} />
                                <Route path="/watches/step-2-create-biz" exact component={requiresAuth(WatchCreateStep2BizContainer)} />
                                <Route path="/watches/step-2-create-cc" exact component={requiresAuth(WatchCreateStep2ComContainer)} />
                                <Route path="/watches/step-3-create-rez" exact component={requiresAuth(WatchCreateStep3RezContainer)} />
                                <Route path="/watches/step-3-create-biz" exact component={requiresAuth(WatchCreateStep3BizContainer)} />
                                <Route path="/watches/step-3-create-cc" exact component={requiresAuth(WatchCreateStep3ComContainer)} />
                                <Route path="/watches/step-4-create-rez" exact component={requiresAuth(WatchCreateStep4RezContainer)} />
                                <Route path="/watches/step-4-create-biz" exact component={requiresAuth(WatchCreateStep4BizContainer)} />
                                <Route path="/watches/step-4-create-cc" exact component={requiresAuth(WatchCreateStep4ComContainer)} />
                                <Route path="/watch/:slug" exact component={requiresAuth(WatchRetrieveContainer)} />
                                <Route path="/watch/:slug/update" exact component={requiresAuth(WatchUpdateContainer)} />
                                <Route path="/financials/unpaid" exact component={requiresAuth(UnpaidFinancialListContainer)} />
                                <Route path="/financials/paid" exact component={requiresAuth(PaidFinancialListContainer)} />
                                <Route path="/financials/all" exact component={requiresAuth(AllFinancialListContainer)} />
                                <Route path="/financial/:slug" exact component={requiresAuth(FinanciaRetrieveContainer)} />
                                <Route path="/financial/:slug/update" exact component={requiresAuth(FinanciaUpdateContainer)} />
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
