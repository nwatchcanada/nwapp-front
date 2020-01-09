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

// Organizations
import SharedOrganizationListContainer from "./organization/shared/list/sharedOrganizationListContainer";
import SharedOrganizationCreateStep1Container from "./organization/shared/create/sharedOrganizationCreateStep1Container";
import SharedOrganizationCreateStep2Container from "./organization/shared/create/sharedOrganizationCreateStep2Container";
import SharedOrganizationCreateSuccessContainer from "./organization/shared/create/sharedOrganizationCreateSuccessContainer";
import SharedOrganizationUpdateContainer from "./organization/shared/update/sharedOrganizationUpdateContainer";

import TenantDashboardRedirectContainer from "./dashboard/tenantDashboardRedirectContainer";
import DashboardContainer from "./dashboard/dashboardContainer";

/*
-------
MEMBERS
-------
*/
import AdminMemberListContainer from "./members/admin/list/adminListContainer";
import AdminMemberSearchContainer from "./members/admin/search/adminSearchContainer";
import AdminMemberSearchResultContainer from "./members/admin/search/adminSearchResultContainer";
import AdminMemberLiteRetrieveContainer from "./members/admin/retrieve/adminLiteRetrieveContainer";
import AdminMemberFullRetrieveContainer from "./members/admin/retrieve/adminFullRetrieveContainer";
import AdminMemberCommentContainer from "./members/admin/retrieve/adminCommentContainer";
import AdminMemberFileUploadListContainer from "./members/admin/retrieve/fileUpload/adminFileUploadListContainer";
import AdminMemberFileUploadAddContainer from "./members/admin/retrieve/fileUpload/adminFileUploadAddContainer";
import AdminMemberFileUploadArchiveContainer from "./members/admin/retrieve/fileUpload/adminFileUploadArchiveContainer";
import AdminMemberOperationsContainer from "./members/admin/retrieve/adminOperationsContainer";
import AdminMemberCreateStep1Container from "./members/admin/create/adminCreateStep1Container";
import AdminMemberCreateStep2Container from "./members/admin/create/adminCreateStep2Container";
import AdminMemberCreateStep3Container from "./members/admin/create/adminCreateStep3Container";
import AdminMemberCreateStep4Container from "./members/admin/create/adminCreateStep4Container";
import AdminMemberCreateStep5Container from "./members/admin/create/adminCreateStep5Container";
import AdminMemberCreateStep6Container from "./members/admin/create/adminCreateStep6Container";
import AdminMemberCreateStep7Container from "./members/admin/create/adminCreateStep7Container";
import AdminMemberCreateStep8Container from "./members/admin/create/adminCreateStep8Container";
import AdminMemberContactUpdateContainer from "./members/admin/update/adminContactUpdateContainer";
import AdminMemberAddressUpdateContainer from "./members/admin/update/adminAddressUpdateContainer";
import AdminMemberMetricsUpdateContainer from "./members/admin/update/adminMetricsUpdateContainer";
import AdminMemberAvatarUpdateOperationContainer from "./members/admin/operations/adminAvatarUpdateOperationContainer";
import AdminMemberPromoteOperationStep1Container from "./members/admin/operations/adminPromoteOperationStep1Container";
import AdminMemberPromoteOperationStep2Container from "./members/admin/operations/adminPromoteOperationStep2Container";
import AdminMemberPromoteOperationStep3Container from "./members/admin/operations/adminPromoteOperationStep3Container";
import MemberArchiveOperationContainer from "./members/admin/operations/adminArchiveOperationContainer";
import AdminMemberUnarchiveOperationContainer from "./members/admin/operations/adminUnarchiveOperationContainer";
import AdminMemberScorePointListContainer from "./members/admin/operations/scorePoint/adminScorePointListContainer";
import AdminMemberScorePointAddContainer from "./members/admin/operations/scorePoint/adminScorePointAddContainer";
import AdminMemberScorePointArchiveContainer from "./members/admin/operations/scorePoint/adminScorePointArchiveContainer";
import AdminMemberBadgeListContainer from "./members/admin/operations/badge/adminBadgeListContainer";
import AdminMemberBadgeAddContainer from "./members/admin/operations/badge/adminBadgeAddContainer";
import AdminMemberBadgeArchiveContainer from "./members/admin/operations/badge/adminBadgeArchiveContainer";
import AdminMemberAwardListContainer from "./members/admin/operations/award/adminAwardListContainer";

/*
-----------------
AREA COORDINATORS
-----------------
*/
import AdminAreaCoordinatorListContainer from "./areaCoordinators/admin/list/adminListContainer";
import AdminAreaCoordinatorSearchContainer from "./areaCoordinators/admin/search/adminSearchContainer";
import AdminAreaCoordinatorSearchResultContainer from "./areaCoordinators/admin/search/adminSearchResultContainer";
import AdminAreaCoordinatorLiteRetrieveContainer from "./areaCoordinators/admin/retrieve/adminLiteRetrieveContainer";
import AdminAreaCoordinatorFullRetrieveContainer from "./areaCoordinators/admin/retrieve/adminFullRetrieveContainer";
import AdminAreaCoordinatorCommentContainer from "./areaCoordinators/admin/retrieve/adminCommentContainer";
import AdminAreaCoordinatorFileUploadListContainer from "./areaCoordinators/admin/retrieve/fileUpload/adminFileUploadListContainer";
import AdminAreaCoordinatorFileUploadAddContainer from "./areaCoordinators/admin/retrieve/fileUpload/adminFileUploadAddContainer";
import AdminAreaCoordinatorFileUploadArchiveContainer from "./areaCoordinators/admin/retrieve/fileUpload/adminFileUploadArchiveContainer";
import AdminAreaCoordinatorOperationsContainer from "./areaCoordinators/admin/retrieve/adminOperationsContainer";
import AdminAreaCoordinatorContactUpdateContainer from "./areaCoordinators/admin/update/adminContactUpdateContainer";
import AdminAreaCoordinatorAddressUpdateContainer from "./areaCoordinators/admin/update/adminAddressUpdateContainer";
import AdminAreaCoordinatorMetricsUpdateContainer from "./areaCoordinators/admin/update/adminMetricsUpdateContainer";
import AdminAreaCoordinatorAvatarUpdateOperationContainer from "./areaCoordinators/admin/operations/adminAvatarUpdateOperationContainer";
import AdminAreaCoordinatorPromoteOperationStep1Container from "./areaCoordinators/admin/operations/adminPromoteOperationStep1Container";
import AdminAreaCoordinatorPromoteOperationStep2Container from "./areaCoordinators/admin/operations/adminPromoteOperationStep2Container";
import AdminAreaCoordinatorPromoteOperationStep3Container from "./areaCoordinators/admin/operations/adminPromoteOperationStep3Container";
import AreaCoordinatorArchiveOperationContainer from "./areaCoordinators/admin/operations/adminArchiveOperationContainer";
import AdminAreaCoordinatorUnarchiveOperationContainer from "./areaCoordinators/admin/operations/adminUnarchiveOperationContainer";
import AdminAreaCoordinatorScorePointListContainer from "./areaCoordinators/admin/operations/scorePoint/adminScorePointListContainer";
import AdminAreaCoordinatorScorePointAddContainer from "./areaCoordinators/admin/operations/scorePoint/adminScorePointAddContainer";
import AdminAreaCoordinatorScorePointArchiveContainer from "./areaCoordinators/admin/operations/scorePoint/adminScorePointArchiveContainer";
import AdminAreaCoordinatorBadgeListContainer from "./areaCoordinators/admin/operations/badge/adminBadgeListContainer";
import AdminAreaCoordinatorBadgeAddContainer from "./areaCoordinators/admin/operations/badge/adminBadgeAddContainer";
import AdminAreaCoordinatorBadgeArchiveContainer from "./areaCoordinators/admin/operations/badge/adminBadgeArchiveContainer";
import AdminAreaCoordinatorAwardListContainer from "./areaCoordinators/admin/operations/award/adminAwardListContainer";
import AdminAreaCoordinatorCreateStep1Container from "./areaCoordinators/admin/create/adminCreateStep1Container";
import AdminAreaCoordinatorCreateStep2Container from "./areaCoordinators/admin/create/adminCreateStep2Container";
import AdminAreaCoordinatorCreateStep3Container from "./areaCoordinators/admin/create/adminCreateStep3Container";

/*
---------
ASSOCIATE
---------
*/
import AdminAssociateListContainer from "./associates/admin/list/adminListContainer";
import AdminAssociateSearchContainer from "./associates/admin/search/adminSearchContainer";
import AdminAssociateSearchResultContainer from "./associates/admin/search/adminSearchResultContainer";
import AdminAssociateLiteRetrieveContainer from "./associates/admin/retrieve/adminLiteRetrieveContainer";
import AdminAssociateFullRetrieveContainer from "./associates/admin/retrieve/adminFullRetrieveContainer";
import AdminAssociateCommentContainer from "./associates/admin/retrieve/adminCommentContainer";
import AdminAssociateFileUploadListContainer from "./associates/admin/retrieve/fileUpload/adminFileUploadListContainer";
import AdminAssociateFileUploadAddContainer from "./associates/admin/retrieve/fileUpload/adminFileUploadAddContainer";
import AdminAssociateFileUploadArchiveContainer from "./associates/admin/retrieve/fileUpload/adminFileUploadArchiveContainer";
import AdminAssociateOperationsContainer from "./associates/admin/retrieve/adminOperationsContainer";
import AdminAssociateContactUpdateContainer from "./associates/admin/update/adminContactUpdateContainer";
import AdminAssociateAddressUpdateContainer from "./associates/admin/update/adminAddressUpdateContainer";
import AdminAssociateMetricsUpdateContainer from "./associates/admin/update/adminMetricsUpdateContainer";
import AdminAssociateAvatarUpdateOperationContainer from "./associates/admin/operations/adminAvatarUpdateOperationContainer";
import AdminAssociatePromoteOperationStep1Container from "./associates/admin/operations/adminPromoteOperationStep1Container";
import AdminAssociatePromoteOperationStep2Container from "./associates/admin/operations/adminPromoteOperationStep2Container";
import AdminAssociatePromoteOperationStep3Container from "./associates/admin/operations/adminPromoteOperationStep3Container";
import AssociateArchiveOperationContainer from "./associates/admin/operations/adminArchiveOperationContainer";
import AdminAssociateUnarchiveOperationContainer from "./associates/admin/operations/adminUnarchiveOperationContainer";
import AdminAssociateScorePointListContainer from "./associates/admin/operations/scorePoint/adminScorePointListContainer";
import AdminAssociateScorePointAddContainer from "./associates/admin/operations/scorePoint/adminScorePointAddContainer";
import AdminAssociateScorePointArchiveContainer from "./associates/admin/operations/scorePoint/adminScorePointArchiveContainer";
import AdminAssociateBadgeListContainer from "./associates/admin/operations/badge/adminBadgeListContainer";
import AdminAssociateBadgeAddContainer from "./associates/admin/operations/badge/adminBadgeAddContainer";
import AdminAssociateBadgeArchiveContainer from "./associates/admin/operations/badge/adminBadgeArchiveContainer";
import AdminAssociateAwardListContainer from "./associates/admin/operations/award/adminAwardListContainer";

/*
-----
STAFF
-----
*/
import AdminStaffListContainer from "./staffs/admin/list/adminListContainer";
import AdminStaffSearchContainer from "./staffs/admin/search/adminSearchContainer";
import AdminStaffSearchResultContainer from "./staffs/admin/search/adminSearchResultContainer";
import AdminStaffLiteRetrieveContainer from "./staffs/admin/retrieve/adminLiteRetrieveContainer";
import AdminStaffFullRetrieveContainer from "./staffs/admin/retrieve/adminFullRetrieveContainer";
import AdminStaffCommentContainer from "./staffs/admin/retrieve/adminCommentContainer";
import AdminStaffFileUploadListContainer from "./staffs/admin/retrieve/fileUpload/adminFileUploadListContainer";
import AdminStaffFileUploadAddContainer from "./staffs/admin/retrieve/fileUpload/adminFileUploadAddContainer";
import AdminStaffFileUploadArchiveContainer from "./staffs/admin/retrieve/fileUpload/adminFileUploadArchiveContainer";
import AdminStaffOperationsContainer from "./staffs/admin/retrieve/adminOperationsContainer";
import AdminStaffContactUpdateContainer from "./staffs/admin/update/adminContactUpdateContainer";
import AdminStaffAddressUpdateContainer from "./staffs/admin/update/adminAddressUpdateContainer";
import AdminStaffMetricsUpdateContainer from "./staffs/admin/update/adminMetricsUpdateContainer";
import AdminStaffAvatarUpdateOperationContainer from "./staffs/admin/operations/adminAvatarUpdateOperationContainer";
import AdminStaffPromoteOperationStep1Container from "./staffs/admin/operations/adminPromoteOperationStep1Container";
import AdminStaffPromoteOperationStep2Container from "./staffs/admin/operations/adminPromoteOperationStep2Container";
import AdminStaffPromoteOperationStep3Container from "./staffs/admin/operations/adminPromoteOperationStep3Container";
import AdminStaffDemoteOperationStep1Container from "./staffs/admin/operations/adminDemoteOperationStep1Container";
import AdminStaffDemoteOperationStep2Container from "./staffs/admin/operations/adminDemoteOperationStep2Container";
import AdminStaffDemoteOperationStep3Container from "./staffs/admin/operations/adminDemoteOperationStep3Container";
import StaffArchiveOperationContainer from "./staffs/admin/operations/adminArchiveOperationContainer";
import AdminStaffUnarchiveOperationContainer from "./staffs/admin/operations/adminUnarchiveOperationContainer";
import AdminStaffScorePointListContainer from "./staffs/admin/operations/scorePoint/adminScorePointListContainer";
import AdminStaffScorePointAddContainer from "./staffs/admin/operations/scorePoint/adminScorePointAddContainer";
import AdminStaffScorePointArchiveContainer from "./staffs/admin/operations/scorePoint/adminScorePointArchiveContainer";
import AdminStaffBadgeListContainer from "./staffs/admin/operations/badge/adminBadgeListContainer";
import AdminStaffBadgeAddContainer from "./staffs/admin/operations/badge/adminBadgeAddContainer";
import AdminStaffBadgeArchiveContainer from "./staffs/admin/operations/badge/adminBadgeArchiveContainer";
import AdminStaffAwardListContainer from "./staffs/admin/operations/award/adminAwardListContainer";


import DistrictsListContainer from "./settings/districts/list/districtListContainer";
import DistrictSearchContainer from "./settings/districts/search/districtSearchContainer";
import DistrictSearchResultContainer from "./settings/districts/search/districtSearchResultContainer";
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
import WatchSearchContainer from "./watches/search/watchSearchContainer";
import WatchSearchResultContainer from "./watches/search/watchSearchResultContainer";

import TagsListContainer from "./settings/tags/list/tagListContainer";
import TagDeleteContainer from "./settings/tags/tagDeleteContainer";
import TagCreateContainer from "./settings/tags/tagCreateContainer";
import TagUpdateContainer from "./settings/tags/tagUpdateContainer";

import HowHearsListContainer from "./settings/howHear/list/howHearListContainer";
import HowHearDeleteContainer from "./settings/howHear/howHearDeleteContainer";
import HowHearCreateContainer from "./settings/howHear/howHearCreateContainer";
import HowHearUpdateContainer from "./settings/howHear/howHearUpdateContainer";

import AnnouncementListContainer from "./settings/announcements/list/announcementListContainer";
import AnnouncementDeleteContainer from "./settings/announcements/announcementDeleteContainer";
import AnnouncementCreateContainer from "./settings/announcements/announcementCreateContainer";
import AnnouncementUpdateContainer from "./settings/announcements/announcementUpdateContainer";

import ResourcesListContainer from "./settings/resources/list/resourceListContainer";
import ResourceDeleteContainer from "./settings/resources/resourceDeleteContainer";
import ResourceCreateContainer from "./settings/resources/resourceCreateContainer";
import ResourceUpdateContainer from "./settings/resources/resourceUpdateContainer";



import ItemListContainer from "./items/list/itemListContainer";
import ItemSearchContainer from "./items/search/itemSearchContainer";
import ItemSearchResultContainer from "./items/search/itemSearchResultContainer";
import ItemRetrieveContainer from "./items/retrieve/itemRetrieveContainer";
import ItemCommentContainer from "./items/retrieve/itemCommentContainer";
import ItemCreateStep1Container from "./items/create/itemCreateStep1Container";
import ItemCreateStep2ConcernContainer from "./items/create/concern/itemCreateStep2ConcernContainer";
import ItemCreateStep3ConcernContainer from "./items/create/concern/itemCreateStep3ConcernContainer";
import ItemCreateStep4ConcernContainer from "./items/create/concern/itemCreateStep4ConcernContainer";
import ItemCreateStep2EventContainer from "./items/create/itemCreateStep2EventContainer";
import ItemCreateStep2IncidentContainer from "./items/create/incident/itemCreateStep2IncidentContainer";
import ItemCreateStep3IncidentContainer from "./items/create/incident/itemCreateStep3IncidentContainer";
import ItemCreateStep4IncidentContainer from "./items/create/incident/itemCreateStep4IncidentContainer";
import ItemCreateStep5IncidentContainer from "./items/create/incident/itemCreateStep5IncidentContainer";
import ItemCreateStep2InformationContainer from "./items/create/itemCreateStep2InformationContainer";
import ItemCreateStep3Container from "./items/create/itemCreateStep3Container";
import ItemUpdateIncidentContainer from "./items/update/itemUpdateIncidentContainer";
import ItemUpdateConcernContainer from "./items/update/itemUpdateConcernContainer";
import ItemUpdateEventContainer from "./items/update/itemUpdateEventContainer";
import ItemUpdateInfoContainer from "./items/update/itemUpdateInfoContainer";
import ItemArchiveContainer from "./items/archive/itemArchiveContainer";

import TaskListContainer from "./tasks/list/taskListContainer";
import TaskSearchContainer from "./tasks/search/taskSearchContainer";
import TaskSearchResultContainer from "./tasks/search/taskSearchResultContainer";
import AssignWatchAssociateTaskStep1Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep1Container";
import AssignWatchAssociateTaskStep2Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep2Container";
import AssignWatchAssociateTaskStep3Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep3Container";
import AssignWatchAreaCoordinatorTaskStep1Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep1Container";
import AssignWatchAreaCoordinatorTaskStep2Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep2Container";
import AssignWatchAreaCoordinatorTaskStep3Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep3Container";
import ActionConcernItemTaskStep1Container from "./tasks/actionConcernItem/actionConcernItemTaskStep1Container";
import ActionConcernItemTaskStep2Container from "./tasks/actionConcernItem/actionConcernItemTaskStep2Container";
import ActionConcernItemTaskStep3Container from "./tasks/actionConcernItem/actionConcernItemTaskStep3Container";
import ActionIncidentItemTaskStep1Container from "./tasks/actionIncidentItem/actionIncidentItemTaskStep1Container";
import ActionIncidentItemTaskStep2Container from "./tasks/actionIncidentItem/actionIncidentItemTaskStep2Container";
import ActionIncidentItemTaskStep3Container from "./tasks/actionIncidentItem/actionIncidentItemTaskStep3Container";


import ConcernItemListContainer from "./concerns/concernItemListContainer";

import ReportListContainer from "./reports/reportListContainer";

import SettingListContainer from "./settings/settingListContainer";

import FinancialListContainer from "./financials/list/financialListContainer";
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
                            <ScrollUpButton ContainerClassName="ScrollUpButtonCustomContainer" TransitionClassName="ScrollUpButtonCustomToggled" >
								<span></span>
							</ScrollUpButton>
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
                                <Route path="/organization/add/step-1" exact component={requiresAuth(SharedOrganizationCreateStep1Container)} />
                                <Route path="/organization/add/step-2" exact component={requiresAuth(SharedOrganizationCreateStep2Container)} />
                                <Route path="/organization/add-success" exact component={requiresAuth(SharedOrganizationCreateSuccessContainer)} />
                                <Route path="/organization/:schemaName/update" exact component={requiresAuth(SharedOrganizationUpdateContainer)} />
                                <Route path="/dashboard-redirect/:accessToken/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={requiresAuth(DashboardContainer)} />
                                <Route path="/settings/districts" exact component={requiresAuth(DistrictsListContainer)} />
                                <Route path="/settings/districts/search" exact component={requiresAuth(DistrictSearchContainer)} />
                                <Route path="/settings/districts/search-results" exact component={requiresAuth(DistrictSearchResultContainer)} />
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

                                {/*
                                    -------
                                    MEMBERS
                                    -------
                                */}
                                <Route path="/admin/members/add/step-1" exact component={requiresAuth(AdminMemberCreateStep1Container)} />
                                <Route path="/admin/members/add/step-2" exact component={requiresAuth(AdminMemberCreateStep2Container)} />
                                <Route path="/admin/members/add/step-3" exact component={requiresAuth(AdminMemberCreateStep3Container)} />
                                <Route path="/admin/members/add/step-4" exact component={requiresAuth(AdminMemberCreateStep4Container)} />
                                <Route path="/admin/members/add/step-5" exact component={requiresAuth(AdminMemberCreateStep5Container)} />
                                <Route path="/admin/members/add/step-6" exact component={requiresAuth(AdminMemberCreateStep6Container)} />
                                <Route path="/admin/members/add/step-7" exact component={requiresAuth(AdminMemberCreateStep7Container)} />
                                <Route path="/admin/members/add/step-8" exact component={requiresAuth(AdminMemberCreateStep8Container)} />
                                <Route path="/admin/members" exact component={requiresAuth(AdminMemberListContainer)} />
                                <Route path="/admin/members/search" exact component={requiresAuth(AdminMemberSearchContainer)} />
                                <Route path="/admin/members/search-results" exact component={requiresAuth(AdminMemberSearchResultContainer)} />
                                <Route path="/admin/member/:slug" exact component={requiresAuth(AdminMemberLiteRetrieveContainer)} />
                                <Route path="/admin/member/:slug/full" exact component={requiresAuth(AdminMemberFullRetrieveContainer)} />
                                <Route path="/admin/member/:slug/comments" exact component={requiresAuth(AdminMemberCommentContainer)} />
                                <Route path="/admin/member/:slug/files" exact component={requiresAuth(AdminMemberFileUploadListContainer)} />
                                <Route path="/admin/member/:slug/file/add" exact component={requiresAuth(AdminMemberFileUploadAddContainer)} />
                                <Route path="/admin/member/:slug/file/archive/:fileSlug" exact component={requiresAuth(AdminMemberFileUploadArchiveContainer)} />
                                <Route path="/admin/member/:slug/community/score-points" exact component={requiresAuth(AdminMemberScorePointListContainer)} />
                                <Route path="/admin/member/:slug/community/add-score-point" exact component={requiresAuth(AdminMemberScorePointAddContainer)} />
                                <Route path="/admin/member/:slug/community/score-point/archive/:scorePointSlug" exact component={requiresAuth(AdminMemberScorePointArchiveContainer)} />
                                <Route path="/admin/member/:slug/community/badges" exact component={requiresAuth(AdminMemberBadgeListContainer)} />
                                <Route path="/admin/member/:slug/community/add-badge" exact component={requiresAuth(AdminMemberBadgeAddContainer)} />
                                <Route path="/admin/member/:slug/community/badge/archive/:badgeSlug" exact component={requiresAuth(AdminMemberBadgeArchiveContainer)} />
                                <Route path="/admin/member/:slug/community/awards" exact component={requiresAuth(AdminMemberAwardListContainer)} />
                                <Route path="/admin/member/:slug/operations" exact component={requiresAuth(AdminMemberOperationsContainer)} />
                                <Route path="/admin/member/:slug/update/contact" exact component={requiresAuth(AdminMemberContactUpdateContainer)} />
                                <Route path="/admin/member/:slug/update/address" exact component={requiresAuth(AdminMemberAddressUpdateContainer)} />
                                <Route path="/admin/member/:slug/update/metrics" exact component={requiresAuth(AdminMemberMetricsUpdateContainer)} />
                                <Route path="/admin/member/:slug/avatar" exact component={requiresAuth(AdminMemberAvatarUpdateOperationContainer)} />
                                <Route path="/admin/member/:slug/promote/step-1" exact component={requiresAuth(AdminMemberPromoteOperationStep1Container)} />
                                <Route path="/admin/member/:slug/promote/step-2" exact component={requiresAuth(AdminMemberPromoteOperationStep2Container)} />
                                <Route path="/admin/member/:slug/promote/step-3" exact component={requiresAuth(AdminMemberPromoteOperationStep3Container)} />
                                <Route path="/admin/member/:slug/archive" exact component={requiresAuth(MemberArchiveOperationContainer)} />
                                <Route path="/admin/member/:slug/unarchive" exact component={requiresAuth(AdminMemberUnarchiveOperationContainer)} />

                                /*
                                ----------------
                                AREA COORDINATOR
                                ----------------
                                */
                                <Route path="/admin/area-coordinators/add/step-1" exact component={requiresAuth(AdminAreaCoordinatorCreateStep1Container)} />
                                <Route path="/admin/area-coordinators/add/step-2" exact component={requiresAuth(AdminAreaCoordinatorCreateStep2Container)} />
                                <Route path="/admin/area-coordinators/add/step-3" exact component={requiresAuth(AdminAreaCoordinatorCreateStep3Container)} />
                                <Route path="/admin/area-coordinators" exact component={requiresAuth(AdminAreaCoordinatorListContainer)} />
                                <Route path="/admin/area-coordinators/search" exact component={requiresAuth(AdminAreaCoordinatorSearchContainer)} />
                                <Route path="/admin/area-coordinators/search-results" exact component={requiresAuth(AdminAreaCoordinatorSearchResultContainer)} />
                                <Route path="/admin/area-coordinator/:slug" exact component={requiresAuth(AdminAreaCoordinatorLiteRetrieveContainer)} />
                                <Route path="/admin/area-coordinator/:slug/full" exact component={requiresAuth(AdminAreaCoordinatorFullRetrieveContainer)} />
                                <Route path="/admin/area-coordinator/:slug/comments" exact component={requiresAuth(AdminAreaCoordinatorCommentContainer)} />
                                <Route path="/admin/area-coordinator/:slug/files" exact component={requiresAuth(AdminAreaCoordinatorFileUploadListContainer)} />
                                <Route path="/admin/area-coordinator/:slug/file/add" exact component={requiresAuth(AdminAreaCoordinatorFileUploadAddContainer)} />
                                <Route path="/admin/area-coordinator/:slug/file/archive/:fileSlug" exact component={requiresAuth(AdminAreaCoordinatorFileUploadArchiveContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/score-points" exact component={requiresAuth(AdminAreaCoordinatorScorePointListContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/add-score-point" exact component={requiresAuth(AdminAreaCoordinatorScorePointAddContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/score-point/archive/:scorePointSlug" exact component={requiresAuth(AdminAreaCoordinatorScorePointArchiveContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/badges" exact component={requiresAuth(AdminAreaCoordinatorBadgeListContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/add-badge" exact component={requiresAuth(AdminAreaCoordinatorBadgeAddContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/badge/archive/:badgeSlug" exact component={requiresAuth(AdminAreaCoordinatorBadgeArchiveContainer)} />
                                <Route path="/admin/area-coordinator/:slug/community/awards" exact component={requiresAuth(AdminAreaCoordinatorAwardListContainer)} />
                                <Route path="/admin/area-coordinator/:slug/operations" exact component={requiresAuth(AdminAreaCoordinatorOperationsContainer)} />
                                <Route path="/admin/area-coordinator/:slug/update/contact" exact component={requiresAuth(AdminAreaCoordinatorContactUpdateContainer)} />
                                <Route path="/admin/area-coordinator/:slug/update/address" exact component={requiresAuth(AdminAreaCoordinatorAddressUpdateContainer)} />
                                <Route path="/admin/area-coordinator/:slug/update/metrics" exact component={requiresAuth(AdminAreaCoordinatorMetricsUpdateContainer)} />
                                <Route path="/admin/area-coordinator/:slug/avatar" exact component={requiresAuth(AdminAreaCoordinatorAvatarUpdateOperationContainer)} />
                                <Route path="/admin/area-coordinator/:slug/promote/step-1" exact component={requiresAuth(AdminAreaCoordinatorPromoteOperationStep1Container)} />
                                <Route path="/admin/area-coordinator/:slug/promote/step-2" exact component={requiresAuth(AdminAreaCoordinatorPromoteOperationStep2Container)} />
                                <Route path="/admin/area-coordinator/:slug/promote/step-3" exact component={requiresAuth(AdminAreaCoordinatorPromoteOperationStep3Container)} />
                                <Route path="/admin/area-coordinator/:slug/archive" exact component={requiresAuth(AreaCoordinatorArchiveOperationContainer)} />
                                <Route path="/admin/area-coordinator/:slug/unarchive" exact component={requiresAuth(AdminAreaCoordinatorUnarchiveOperationContainer)} />

                                /*
                                ---------
                                ASSOCIATE
                                ---------
                                */
                                <Route path="/admin/associates" exact component={requiresAuth(AdminAssociateListContainer)} />
                                <Route path="/admin/associates/search" exact component={requiresAuth(AdminAssociateSearchContainer)} />
                                <Route path="/admin/associates/search-results" exact component={requiresAuth(AdminAssociateSearchResultContainer)} />
                                <Route path="/admin/associate/:slug" exact component={requiresAuth(AdminAssociateLiteRetrieveContainer)} />
                                <Route path="/admin/associate/:slug/full" exact component={requiresAuth(AdminAssociateFullRetrieveContainer)} />
                                <Route path="/admin/associate/:slug/comments" exact component={requiresAuth(AdminAssociateCommentContainer)} />
                                <Route path="/admin/associate/:slug/files" exact component={requiresAuth(AdminAssociateFileUploadListContainer)} />
                                <Route path="/admin/associate/:slug/file/add" exact component={requiresAuth(AdminAssociateFileUploadAddContainer)} />
                                <Route path="/admin/associate/:slug/file/archive/:fileSlug" exact component={requiresAuth(AdminAssociateFileUploadArchiveContainer)} />
                                <Route path="/admin/associate/:slug/community/score-points" exact component={requiresAuth(AdminAssociateScorePointListContainer)} />
                                <Route path="/admin/associate/:slug/community/add-score-point" exact component={requiresAuth(AdminAssociateScorePointAddContainer)} />
                                <Route path="/admin/associate/:slug/community/score-point/archive/:scorePointSlug" exact component={requiresAuth(AdminAssociateScorePointArchiveContainer)} />
                                <Route path="/admin/associate/:slug/community/badges" exact component={requiresAuth(AdminAssociateBadgeListContainer)} />
                                <Route path="/admin/associate/:slug/community/add-badge" exact component={requiresAuth(AdminAssociateBadgeAddContainer)} />
                                <Route path="/admin/associate/:slug/community/badge/archive/:badgeSlug" exact component={requiresAuth(AdminAssociateBadgeArchiveContainer)} />
                                <Route path="/admin/associate/:slug/community/awards" exact component={requiresAuth(AdminAssociateAwardListContainer)} />
                                <Route path="/admin/associate/:slug/operations" exact component={requiresAuth(AdminAssociateOperationsContainer)} />
                                <Route path="/admin/associate/:slug/update/contact" exact component={requiresAuth(AdminAssociateContactUpdateContainer)} />
                                <Route path="/admin/associate/:slug/update/address" exact component={requiresAuth(AdminAssociateAddressUpdateContainer)} />
                                <Route path="/admin/associate/:slug/update/metrics" exact component={requiresAuth(AdminAssociateMetricsUpdateContainer)} />
                                <Route path="/admin/associate/:slug/avatar" exact component={requiresAuth(AdminAssociateAvatarUpdateOperationContainer)} />
                                <Route path="/admin/associate/:slug/promote/step-1" exact component={requiresAuth(AdminAssociatePromoteOperationStep1Container)} />
                                <Route path="/admin/associate/:slug/promote/step-2" exact component={requiresAuth(AdminAssociatePromoteOperationStep2Container)} />
                                <Route path="/admin/associate/:slug/promote/step-3" exact component={requiresAuth(AdminAssociatePromoteOperationStep3Container)} />
                                <Route path="/admin/associate/:slug/archive" exact component={requiresAuth(AssociateArchiveOperationContainer)} />
                                <Route path="/admin/associate/:slug/unarchive" exact component={requiresAuth(AdminAssociateUnarchiveOperationContainer)} />

                                /*
                                -----
                                STAFF
                                -----
                                */
                                <Route path="/admin/staffs" exact component={requiresAuth(AdminStaffListContainer)} />
                                <Route path="/admin/staffs/search" exact component={requiresAuth(AdminStaffSearchContainer)} />
                                <Route path="/admin/staffs/search-results" exact component={requiresAuth(AdminStaffSearchResultContainer)} />
                                <Route path="/admin/staff/:slug" exact component={requiresAuth(AdminStaffLiteRetrieveContainer)} />
                                <Route path="/admin/staff/:slug/full" exact component={requiresAuth(AdminStaffFullRetrieveContainer)} />
                                <Route path="/admin/staff/:slug/comments" exact component={requiresAuth(AdminStaffCommentContainer)} />
                                <Route path="/admin/staff/:slug/files" exact component={requiresAuth(AdminStaffFileUploadListContainer)} />
                                <Route path="/admin/staff/:slug/file/add" exact component={requiresAuth(AdminStaffFileUploadAddContainer)} />
                                <Route path="/admin/staff/:slug/file/archive/:fileSlug" exact component={requiresAuth(AdminStaffFileUploadArchiveContainer)} />
                                <Route path="/admin/staff/:slug/community/score-points" exact component={requiresAuth(AdminStaffScorePointListContainer)} />
                                <Route path="/admin/staff/:slug/community/add-score-point" exact component={requiresAuth(AdminStaffScorePointAddContainer)} />
                                <Route path="/admin/staff/:slug/community/score-point/archive/:scorePointSlug" exact component={requiresAuth(AdminStaffScorePointArchiveContainer)} />
                                <Route path="/admin/staff/:slug/community/badges" exact component={requiresAuth(AdminStaffBadgeListContainer)} />
                                <Route path="/admin/staff/:slug/community/add-badge" exact component={requiresAuth(AdminStaffBadgeAddContainer)} />
                                <Route path="/admin/staff/:slug/community/badge/archive/:badgeSlug" exact component={requiresAuth(AdminStaffBadgeArchiveContainer)} />
                                <Route path="/admin/staff/:slug/community/awards" exact component={requiresAuth(AdminStaffAwardListContainer)} />
                                <Route path="/admin/staff/:slug/operations" exact component={requiresAuth(AdminStaffOperationsContainer)} />
                                <Route path="/admin/staff/:slug/update/contact" exact component={requiresAuth(AdminStaffContactUpdateContainer)} />
                                <Route path="/admin/staff/:slug/update/address" exact component={requiresAuth(AdminStaffAddressUpdateContainer)} />
                                <Route path="/admin/staff/:slug/update/metrics" exact component={requiresAuth(AdminStaffMetricsUpdateContainer)} />
                                <Route path="/admin/staff/:slug/avatar" exact component={requiresAuth(AdminStaffAvatarUpdateOperationContainer)} />
                                <Route path="/admin/staff/:slug/promote/step-1" exact component={requiresAuth(AdminStaffPromoteOperationStep1Container)} />
                                <Route path="/admin/staff/:slug/promote/step-2" exact component={requiresAuth(AdminStaffPromoteOperationStep2Container)} />
                                <Route path="/admin/staff/:slug/promote/step-3" exact component={requiresAuth(AdminStaffPromoteOperationStep3Container)} />
                                <Route path="/admin/staff/:slug/demote/step-1" exact component={requiresAuth(AdminStaffDemoteOperationStep1Container)} />
                                <Route path="/admin/staff/:slug/demote/step-2" exact component={requiresAuth(AdminStaffDemoteOperationStep2Container)} />
                                <Route path="/admin/staff/:slug/demote/step-3" exact component={requiresAuth(AdminStaffDemoteOperationStep3Container)} />
                                <Route path="/admin/staff/:slug/archive" exact component={requiresAuth(StaffArchiveOperationContainer)} />
                                <Route path="/admin/staff/:slug/unarchive" exact component={requiresAuth(AdminStaffUnarchiveOperationContainer)} />


                                <Route path="/items" exact component={requiresAuth(ItemListContainer)} />
                                <Route path="/items/search" exact component={requiresAuth(ItemSearchContainer)} />
                                <Route path="/items/search-results" exact component={requiresAuth(ItemSearchResultContainer)} />
                                <Route path="/item/add/step-1" exact component={requiresAuth(ItemCreateStep1Container)} />
                                <Route path="/item/add/step-2-concern" exact component={requiresAuth(ItemCreateStep2ConcernContainer)} />
                                <Route path="/item/add/step-3-concern" exact component={requiresAuth(ItemCreateStep3ConcernContainer)} />
                                <Route path="/item/add/step-4-concern" exact component={requiresAuth(ItemCreateStep4ConcernContainer)} />
                                <Route path="/item/add/step-2-event" exact component={requiresAuth(ItemCreateStep2EventContainer)} />
                                <Route path="/item/add/step-2-incident" exact component={requiresAuth(ItemCreateStep2IncidentContainer)} />
                                <Route path="/item/add/step-3-incident" exact component={requiresAuth(ItemCreateStep3IncidentContainer)} />
                                <Route path="/item/add/step-4-incident" exact component={requiresAuth(ItemCreateStep4IncidentContainer)} />
                                <Route path="/item/add/step-5-incident" exact component={requiresAuth(ItemCreateStep5IncidentContainer)} />
                                <Route path="/item/add/step-2-information" exact component={requiresAuth(ItemCreateStep2InformationContainer)} />
                                <Route path="/item/add/step-3" exact component={requiresAuth(ItemCreateStep3Container)} />
                                <Route path="/item/:slug" exact component={requiresAuth(ItemRetrieveContainer)} />
                                <Route path="/item/:slug/comments" exact component={requiresAuth(ItemCommentContainer)} />
                                <Route path="/item/:slug/update-incidence" exact component={requiresAuth(ItemUpdateIncidentContainer)} />
                                <Route path="/item/:slug/update-concern" exact component={requiresAuth(ItemUpdateConcernContainer)} />
                                <Route path="/item/:slug/update-event" exact component={requiresAuth(ItemUpdateEventContainer)} />
                                <Route path="/item/:slug/update-info" exact component={requiresAuth(ItemUpdateInfoContainer)} />
                                <Route path="/item/:slug/archive" exact component={requiresAuth(ItemArchiveContainer)} />

                                <Route path="/tasks" exact component={requiresAuth(TaskListContainer)} />
                                <Route path="/tasks/search" exact component={requiresAuth(TaskSearchContainer)} />
                                <Route path="/tasks/search-results" exact component={requiresAuth(TaskSearchResultContainer)} />
                                <Route path="/task/1/:slug/step-1" exact component={requiresAuth(AssignWatchAssociateTaskStep1Container)} />
                                <Route path="/task/1/:slug/step-2" exact component={requiresAuth(AssignWatchAssociateTaskStep2Container)} />
                                <Route path="/task/1/:slug/step-3" exact component={requiresAuth(AssignWatchAssociateTaskStep3Container)} />
                                <Route path="/task/2/:slug/step-1" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep1Container)} />
                                <Route path="/task/2/:slug/step-2" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep2Container)} />
                                <Route path="/task/2/:slug/step-3" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep3Container)} />
                                <Route path="/task/3/:slug/step-1" exact component={requiresAuth(ActionConcernItemTaskStep1Container)} />
                                <Route path="/task/3/:slug/step-2" exact component={requiresAuth(ActionConcernItemTaskStep2Container)} />
                                <Route path="/task/3/:slug/step-3" exact component={requiresAuth(ActionConcernItemTaskStep3Container)} />
                                <Route path="/task/4/:slug/step-1" exact component={requiresAuth(ActionIncidentItemTaskStep1Container)} />
                                <Route path="/task/4/:slug/step-2" exact component={requiresAuth(ActionIncidentItemTaskStep2Container)} />
                                <Route path="/task/4/:slug/step-3" exact component={requiresAuth(ActionIncidentItemTaskStep3Container)} />
                                <Route path="/concerns" exact component={requiresAuth(ConcernItemListContainer)} />
                                <Route path="/reports" exact component={requiresAuth(ReportListContainer)} />
                                <Route path="/settings" exact component={requiresAuth(SettingListContainer)} />
                                <Route path="/watches" exact component={requiresAuth(WatchListContainer)} />
                                <Route path="/watches/search" exact component={requiresAuth(WatchSearchContainer)} />
                                <Route path="/watches/search-results" exact component={requiresAuth(WatchSearchResultContainer)} />
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
                                <Route path="/financials" exact component={requiresAuth(FinancialListContainer)} />
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
