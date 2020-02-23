import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

/*
------------
FOUNDATIONAL
------------
*/
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

//TODO: IMPLEMENTATION
import RegisterStep1Container from "./account/register/registerStep1Container";
import RegisterStep2BizContainer from "./account/register/registerStep2BizContainer";
import RegisterStep2RezOrComContainer from "./account/register/registerStep2RezOrComContainer";
import RegisterStep3Container from "./account/register/registerStep3Container";
import RegisterStep4Container from "./account/register/registerStep4Container";
import RegisterStep5Container from "./account/register/registerStep5Container";
import RegisterStep6Container from "./account/register/registerStep6Container";
import RegisterStep7Container from "./account/register/registerStep7Container";

/*
------------
ORGANIZATION
------------
*/
import SharedOrganizationListContainer from "./organization/shared/list/sharedOrganizationListContainer";
import SharedOrganizationCreateStep1Container from "./organization/shared/create/sharedOrganizationCreateStep1Container";
import SharedOrganizationCreateStep2Container from "./organization/shared/create/sharedOrganizationCreateStep2Container";
import SharedOrganizationCreateSuccessContainer from "./organization/shared/create/sharedOrganizationCreateSuccessContainer";
import SharedOrganizationUpdateContainer from "./organization/shared/update/sharedOrganizationUpdateContainer";

/*
---------
DASHBOARD
---------
*/
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
import AdminMemberWatchUpdateContainer from "./members/admin/update/adminWatchUpdateContainer";
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
import AdminAreaCoordinatorDemoteOperationStep1Container from "./areaCoordinators/admin/operations/adminDemoteOperationStep1Container";
import AdminAreaCoordinatorDemoteOperationStep2Container from "./areaCoordinators/admin/operations/adminDemoteOperationStep2Container";
import AdminAreaCoordinatorDemoteOperationStep3Container from "./areaCoordinators/admin/operations/adminDemoteOperationStep3Container";
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
import AdminAreaCoordinatorCreateStep4Container from "./areaCoordinators/admin/create/adminCreateStep4Container";

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
import AdminAssociateDemoteOperationStep1Container from "./associates/admin/operations/adminDemoteOperationStep1Container";
import AdminAssociateDemoteOperationStep2Container from "./associates/admin/operations/adminDemoteOperationStep2Container";
import AdminAssociateDemoteOperationStep3Container from "./associates/admin/operations/adminDemoteOperationStep3Container";
import AssociateArchiveOperationContainer from "./associates/admin/operations/adminArchiveOperationContainer";
import AdminAssociateUnarchiveOperationContainer from "./associates/admin/operations/adminUnarchiveOperationContainer";
import AdminAssociateScorePointListContainer from "./associates/admin/operations/scorePoint/adminScorePointListContainer";
import AdminAssociateScorePointAddContainer from "./associates/admin/operations/scorePoint/adminScorePointAddContainer";
import AdminAssociateScorePointArchiveContainer from "./associates/admin/operations/scorePoint/adminScorePointArchiveContainer";
import AdminAssociateBadgeListContainer from "./associates/admin/operations/badge/adminBadgeListContainer";
import AdminAssociateBadgeAddContainer from "./associates/admin/operations/badge/adminBadgeAddContainer";
import AdminAssociateBadgeArchiveContainer from "./associates/admin/operations/badge/adminBadgeArchiveContainer";
import AdminAssociateAwardListContainer from "./associates/admin/operations/award/adminAwardListContainer";
import AdminAssociateCreateStep1Container from "./associates/admin/create/adminCreateStep1Container";
import AdminAssociateCreateStep2Container from "./associates/admin/create/adminCreateStep2Container";
import AdminAssociateCreateStep3Container from "./associates/admin/create/adminCreateStep3Container";
import AdminAssociateCreateStep4Container from "./associates/admin/create/adminCreateStep4Container";

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
import AdminStaffCreateStep1Container from "./staffs/admin/create/adminCreateStep1Container";
import AdminStaffCreateStep2Container from "./staffs/admin/create/adminCreateStep2Container";
import AdminStaffCreateStep3Container from "./staffs/admin/create/adminCreateStep3Container";
import AdminStaffCreateStep4Container from "./staffs/admin/create/adminCreateStep4Container";

/*
---------
SETTINGS
(*) DISTRICTS
(*) TAGS
(*) HOW HEAR
(*) RESOURCE
(*) ITEM TYPE
---------
*/

import AdminSettingLaunchpadContainer from "./settings/admin/adminLaunchpadContainer";

import AdminDistrictListContainer from "./settings/admin/district/list/adminListContainer";
import AdminDistrictSearchContainer from "./settings/admin/district/search/adminSearchContainer";
import AdminDistrictSearchResultContainer from "./settings/admin/district/search/adminSearchResultContainer";
import AdminDistrictCreateStep1Container from "./settings/admin/district/create/adminDistrictCreateStep1Container";
import AdminDistrictCreateStep2ResidentialContainer from "./settings/admin/district/create/adminDistrictCreateStep2RezContainer";
import AdminDistrictCreateStep2BusinessContainer from "./settings/admin/district/create/adminDistrictCreateStep2BizContainer";
import AdminDistrictCreateStep2CommunityCareContainer from "./settings/admin/district/create/adminDistrictCreateStep2ComContainer";
import AdminDistrictCreateStep3Container from "./settings/admin/district/create/adminDistrictCreateStep3Container";
import AdminDistrictArchiveOperationContainer from "./settings/admin/district/operation/adminArchiveContainer";
import AdminDistrictRetrieveBizContainer from "./settings/admin/district/retrieve/adminRetrieveBizContainer";
import AdminDistrictRetrieveComContainer from "./settings/admin/district/retrieve/adminRetrieveComContainer";
import AdminDistrictRetrieveRezContainer from "./settings/admin/district/retrieve/adminRetrieveRezContainer";
import AdminDistrictUpdateBizContainer from "./settings/admin/district/update/adminUpdateBizContainer";
import AdminDistrictUpdateComContainer from "./settings/admin/district/update/adminUpdateComContainer";
import AdminDistrictUpdateRezContainer from "./settings/admin/district/update/adminUpdateRezContainer";

import AdminTagListContainer from "./settings/admin/tag/list/adminListContainer";
import AdminTagRetrieveContainer from "./settings/admin/tag/retrieve/adminRetrieveContainer";
import AdminTagUpdateContainer from "./settings/admin/tag/update/adminUpdateContainer";
import AdminTagCreateStep1Container from "./settings/admin/tag/create/adminCreateStep1Container";
import AdminTagCreateStep2Container from "./settings/admin/tag/create/adminCreateStep2Container";
import AdminTagArchiveOperationContainer from "./settings/admin/tag/operation/adminArchiveContainer";

import AdminHowHearListContainer from "./settings/admin/howHear/list/adminListContainer";
import AdminHowHearRetrieveContainer from "./settings/admin/howHear/retrieve/adminRetrieveContainer";
import AdminHowHearUpdateContainer from "./settings/admin/howHear/update/adminUpdateContainer";
import AdminHowHearCreateStep1Container from "./settings/admin/howHear/create/adminCreateStep1Container";
import AdminHowHearCreateStep2Container from "./settings/admin/howHear/create/adminCreateStep2Container";
import AdminHowHearArchiveOperationContainer from "./settings/admin/howHear/operation/adminArchiveContainer";

import AdminAnnouncementListContainer from "./settings/admin/announcement/list/adminListContainer";
import AdminAnnouncementRetrieveContainer from "./settings/admin/announcement/retrieve/adminRetrieveContainer";
import AdminAnnouncementUpdateContainer from "./settings/admin/announcement/update/adminUpdateContainer";
import AdminAnnouncementCreateStep1Container from "./settings/admin/announcement/create/adminCreateStep1Container";
import AdminAnnouncementCreateStep2Container from "./settings/admin/announcement/create/adminCreateStep2Container";
import AdminAnnouncementArchiveOperationContainer from "./settings/admin/announcement/operation/adminArchiveContainer";

import AdminResourceListContainer from "./settings/admin/resource/list/adminListContainer";
import AdminResourceRetrieveContainer from "./settings/admin/resource/retrieve/adminRetrieveContainer";
import AdminResourceCreateStep1Container from "./settings/admin/resource/create/adminCreateStep1Container";
import AdminResourceCreateStep2LinkContainer from "./settings/admin/resource/create/adminCreateStep2LinkContainer";
import AdminResourceCreateStep2YouTubeVideoContainer from "./settings/admin/resource/create/adminCreateStep2YouTubeVideoContainer";
import AdminResourceCreateStep2ImageContainer from "./settings/admin/resource/create/adminCreateStep2ImageContainer";
import AdminResourceCreateStep2FileContainer from "./settings/admin/resource/create/adminCreateStep2FileContainer";
import AdminResourceCreateStep3Container from "./settings/admin/resource/create/adminCreateStep3Container";
import AdminResourceArchiveOperationContainer from "./settings/admin/resource/operation/adminArchiveContainer";
import AdminResourceUpdateLinkContainer from "./settings/admin/resource/update/adminUpdateLinkContainer";
import AdminResourceUpdateYouTubeVideoContainer from "./settings/admin/resource/update/adminUpdateYouTubeVideoContainer";
import AdminResourceUpdateImageContainer from "./settings/admin/resource/update/adminUpdateImageContainer";
import AdminResourceUpdateFileContainer from "./settings/admin/resource/update/adminUpdateFileContainer";

import AdminItemTypeListContainer from "./settings/admin/itemType/list/adminListContainer";
import AdminItemTypeRetrieveContainer from "./settings/admin/itemType/retrieve/adminRetrieveContainer";
import AdminItemTypeUpdateContainer from "./settings/admin/itemType/update/adminUpdateContainer";
import AdminItemTypeCreateStep1Container from "./settings/admin/itemType/create/adminCreateStep1Container";
import AdminItemTypeCreateStep2Container from "./settings/admin/itemType/create/adminCreateStep2Container";
import AdminItemTypeArchiveOperationContainer from "./settings/admin/itemType/operation/adminArchiveContainer";

/*
-------
WATCHES
-------
*/
import AdminWatchListContainer from "./watches/admin/list/adminListContainer";
import AdminWatchCreateStep1Container from "./watches/admin/create/adminCreateStep1Container";
import AdminWatchCreateStep2Container from "./watches/admin/create/adminCreateStep2Container";
import AdminWatchCreateStep3Container from "./watches/admin/create/adminCreateStep3Container";
import AdminWatchCreateStep4Container from "./watches/admin/create/adminCreateStep4Container";
import AdminWatchRetrieveContainer from "./watches/admin/retrieve/adminRetrieveContainer";
import AdminWatchCommentContainer from "./watches/admin/retrieve/adminCommentContainer";
import AdminWatchOperationsContainer from "./watches/admin/retrieve/adminOperationsContainer";
import AdminWatchInfoUpdateContainer from "./watches/admin/update/adminInfoUpdateContainer";
import AdminWatchStreetUpdateContainer from "./watches/admin/update/adminStreetUpdateContainer";
import AdminWatchArchiveOperationContainer from "./watches/admin/operations/adminArchiveOperationContainer";
import AdminWatchUnarchiveOperationContainer from "./watches/admin/operations/adminUnarchiveOperationContainer";
import AdminWatchSearchContainer from "./watches/admin/search/adminSearchContainer";
import AdminWatchSearchResultContainer from "./watches/admin/search/adminSearchResultContainer";

/*
-------
REPORTS
-------
*/
import ReportListContainer from "./reports/reportListContainer";
import Report01Container from "./reports/report01Container";
import Report02Container from "./reports/report02Container";
import Report03Container from "./reports/report03Container";
import Report04Container from "./reports/report04Container";
import Report05Container from "./reports/report05Container";
import Report06Container from "./reports/report06Container";
import Report07Container from "./reports/report07Container";



import AdminItemListContainer from "./items/admin/list/itemListContainer";
import ItemSearchContainer from "./items/admin/search/itemSearchContainer";
import ItemSearchResultContainer from "./items/admin/search/itemSearchResultContainer";
import ItemRetrieveContainer from "./items/admin/retrieve/itemRetrieveContainer";
import ItemCommentContainer from "./items/admin/retrieve/itemCommentContainer";
import ItemCreateStep1Container from "./items/admin/create/itemCreateStep1Container";
import ItemCreateStep2ConcernContainer from "./items/admin/create/concern/itemCreateStep2ConcernContainer";
import ItemCreateStep3ConcernContainer from "./items/admin/create/concern/itemCreateStep3ConcernContainer";
import ItemCreateStep4ConcernContainer from "./items/admin/create/concern/itemCreateStep4ConcernContainer";
import ItemCreateStep5ConcernContainer from "./items/admin/create/concern/itemCreateStep5ConcernContainer";
import ItemCreateStep2EventContainer from "./items/admin/create/event/itemCreateStep2EventContainer";
import ItemCreateStep3EventContainer from "./items/admin/create/event/itemCreateStep3EventContainer";
import ItemCreateStep4EventContainer from "./items/admin/create/event/itemCreateStep4EventContainer";
import ItemCreateStep5EventContainer from "./items/admin/create/event/itemCreateStep5EventContainer";
import ItemCreateStep2IncidentContainer from "./items/admin/create/incident/itemCreateStep2IncidentContainer";
import ItemCreateStep3IncidentContainer from "./items/admin/create/incident/itemCreateStep3IncidentContainer";
import ItemCreateStep4IncidentContainer from "./items/admin/create/incident/itemCreateStep4IncidentContainer";
import ItemCreateStep5IncidentContainer from "./items/admin/create/incident/itemCreateStep5IncidentContainer";
import ItemCreateStep2InformationContainer from "./items/admin/create/information/itemCreateStep2InformationContainer";
import ItemCreateStep3InformationContainer from "./items/admin/create/information/itemCreateStep3InformationContainer";
import ItemCreateStep4InformationContainer from "./items/admin/create/information/itemCreateStep4InformationContainer";
import ItemCreateStep2CommunityNewsContainer from "./items/admin/create/communityNews/itemCreateStep2CommunityNewsContainer";
import ItemCreateStep3CommunityNewsContainer from "./items/admin/create/communityNews/itemCreateStep3CommunityNewsContainer";
import ItemCreateStep4CommunityNewsContainer from "./items/admin/create/communityNews/itemCreateStep4CommunityNewsContainer";
import ItemCreateStep5CommunityNewsContainer from "./items/admin/create/communityNews/itemCreateStep5CommunityNewsContainer";
import ItemCreateStep6CommunityNewsContainer from "./items/admin/create/communityNews/itemCreateStep6CommunityNewsContainer";
import ItemUpdateIncidentContainer from "./items/admin/update/itemUpdateIncidentContainer";
import ItemUpdateConcernContainer from "./items/admin/update/itemUpdateConcernContainer";
import ItemUpdateEventContainer from "./items/admin/update/itemUpdateEventContainer";
import ItemUpdateInfoContainer from "./items/admin/update/itemUpdateInfoContainer";
import ItemArchiveContainer from "./items/admin/archive/itemArchiveContainer";

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

							</ScrollUpButton>
                            <Switch>
                                /*
                                ------------
                                FOUNDATIONAL
                                ------------
                                */

                                /*
                                -------------
                                TODO: PROCESS
                                -------------
                                */
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

                                {/*
                                    --------
                                    SETTINGS
                                    --------
                                */}
                                <Route path="/admin/settings" exact component={requiresAuth(AdminSettingLaunchpadContainer)} />

                                {/*
                                    --------------------
                                    SETTINGS - DISTRICTS
                                    --------------------
                                */}
                                <Route path="/admin/settings/districts" exact component={requiresAuth(AdminDistrictListContainer)} />
                                <Route path="/admin/settings/district/search" exact component={requiresAuth(AdminDistrictSearchContainer)} />
                                <Route path="/admin/settings/district/search-results" exact component={requiresAuth(AdminDistrictSearchResultContainer)} />
                                <Route path="/admin/settings/district/add/step-1" exact component={requiresAuth(AdminDistrictCreateStep1Container)} />
                                <Route path="/admin/settings/district/add/step-2-rez" exact component={requiresAuth(AdminDistrictCreateStep2ResidentialContainer)} />
                                <Route path="/admin/settings/district/add/step-2-biz" exact component={requiresAuth(AdminDistrictCreateStep2BusinessContainer)} />
                                <Route path="/admin/settings/district/add/step-2-cc" exact component={requiresAuth(AdminDistrictCreateStep2CommunityCareContainer)} />
                                <Route path="/admin/settings/district/add/step-3" exact component={requiresAuth(AdminDistrictCreateStep3Container)} />
                                <Route path="/admin/settings/district/operation/archive/:slug" exact component={requiresAuth(AdminDistrictArchiveOperationContainer)} />
                                <Route path="/admin/settings/district/biz/:slug" exact component={requiresAuth(AdminDistrictRetrieveBizContainer)} />
                                <Route path="/admin/settings/district/com/:slug" exact component={requiresAuth(AdminDistrictRetrieveComContainer)} />
                                <Route path="/admin/settings/district/rez/:slug" exact component={requiresAuth(AdminDistrictRetrieveRezContainer)} />
                                <Route path="/admin/settings/district/biz/:slug/update" exact component={requiresAuth(AdminDistrictUpdateBizContainer)} />
                                <Route path="/admin/settings/district/com/:slug/update" exact component={requiresAuth(AdminDistrictUpdateComContainer)} />
                                <Route path="/admin/settings/district/rez/:slug/update" exact component={requiresAuth(AdminDistrictUpdateRezContainer)} />

                                {/*
                                    ---------------
                                    SETTINGS - TAGS
                                    ---------------
                                */}
                                <Route path="/admin/settings/tags" exact component={requiresAuth(AdminTagListContainer)} />
                                <Route path="/admin/settings/tag/:id" exact component={requiresAuth(AdminTagRetrieveContainer)} />
                                <Route path="/admin/settings/tag/:id/update" exact component={requiresAuth(AdminTagUpdateContainer)} />
                                <Route path="/admin/settings/tag/add/step-1" exact component={requiresAuth(AdminTagCreateStep1Container)} />
                                <Route path="/admin/settings/tag/add/step-2" exact component={requiresAuth(AdminTagCreateStep2Container)} />
                                <Route path="/admin/settings/tag/operation/archive/:id" exact component={requiresAuth(AdminTagArchiveOperationContainer)} />

                                {/*
                                    -------------------
                                    SETTINGS - HOW HEAR
                                    -------------------
                                */}
                                <Route path="/admin/settings/how-hears" exact component={requiresAuth(AdminHowHearListContainer)} />
                                <Route path="/admin/settings/how-hear/:id" exact component={requiresAuth(AdminHowHearRetrieveContainer)} />
                                <Route path="/admin/settings/how-hear/:id/update" exact component={requiresAuth(AdminHowHearUpdateContainer)} />
                                <Route path="/admin/settings/how-hear/add/step-1" exact component={requiresAuth(AdminHowHearCreateStep1Container)} />
                                <Route path="/admin/settings/how-hear/add/step-2" exact component={requiresAuth(AdminHowHearCreateStep2Container)} />
                                <Route path="/admin/settings/how-hear/operation/archive/:id" exact component={requiresAuth(AdminHowHearArchiveOperationContainer)} />

                                {/*
                                    -----------------------
                                    SETTINGS - ANNOUNCEMENT
                                    -----------------------
                                */}
                                <Route path="/admin/settings/announcements" exact component={requiresAuth(AdminAnnouncementListContainer)} />
                                <Route path="/admin/settings/announcement/:slug" exact component={requiresAuth(AdminAnnouncementRetrieveContainer)} />
                                <Route path="/admin/settings/announcement/:slug/update" exact component={requiresAuth(AdminAnnouncementUpdateContainer)} />
                                <Route path="/admin/settings/announcement/add/step-1" exact component={requiresAuth(AdminAnnouncementCreateStep1Container)} />
                                <Route path="/admin/settings/announcement/add/step-2" exact component={requiresAuth(AdminAnnouncementCreateStep2Container)} />
                                <Route path="/admin/settings/announcement/operation/archive/:slug" exact component={requiresAuth(AdminAnnouncementArchiveOperationContainer)} />

                                {/*
                                    -------------------
                                    SETTINGS - RESOURCE
                                    -------------------
                                */}
                                <Route path="/admin/settings/resources" exact component={requiresAuth(AdminResourceListContainer)} />
                                <Route path="/admin/settings/resource/:slug" exact component={requiresAuth(AdminResourceRetrieveContainer)} />
                                <Route path="/admin/settings/resource/add/step-1" exact component={requiresAuth(AdminResourceCreateStep1Container)} />
                                <Route path="/admin/settings/resource/add/step-2-link" exact component={requiresAuth(AdminResourceCreateStep2LinkContainer)} />
                                <Route path="/admin/settings/resource/add/step-2-yt-video" exact component={requiresAuth(AdminResourceCreateStep2YouTubeVideoContainer)} />
                                <Route path="/admin/settings/resource/add/step-2-image" exact component={requiresAuth(AdminResourceCreateStep2ImageContainer)} />
                                <Route path="/admin/settings/resource/add/step-2-file" exact component={requiresAuth(AdminResourceCreateStep2FileContainer)} />
                                <Route path="/admin/settings/resource/add/step-3" exact component={requiresAuth(AdminResourceCreateStep3Container)} />
                                <Route path="/admin/settings/resource/update-link/:slug" exact component={requiresAuth(AdminResourceUpdateLinkContainer)} />
                                <Route path="/admin/settings/resource/update-yt-video/:slug" exact component={requiresAuth(AdminResourceUpdateYouTubeVideoContainer)} />
                                <Route path="/admin/settings/resource/update-image/:slug" exact component={requiresAuth(AdminResourceUpdateImageContainer)} />
                                <Route path="/admin/settings/resource/update-file/:slug" exact component={requiresAuth(AdminResourceUpdateFileContainer)} />
                                <Route path="/admin/settings/resource/operation/archive/:slug" exact component={requiresAuth(AdminResourceArchiveOperationContainer)} />
                                {/*
                                    --------------------
                                    SETTINGS - ITEM TYPE
                                    --------------------
                                */}
                                <Route path="/admin/settings/item-types" exact component={requiresAuth(AdminItemTypeListContainer)} />
                                <Route path="/admin/settings/item-type/:slug" exact component={requiresAuth(AdminItemTypeRetrieveContainer)} />
                                <Route path="/admin/settings/item-type/:slug/update" exact component={requiresAuth(AdminItemTypeUpdateContainer)} />
                                <Route path="/admin/settings/item-type/add/step-1" exact component={requiresAuth(AdminItemTypeCreateStep1Container)} />
                                <Route path="/admin/settings/item-type/add/step-2" exact component={requiresAuth(AdminItemTypeCreateStep2Container)} />
                                <Route path="/admin/settings/item-type/operation/archive/:slug" exact component={requiresAuth(AdminItemTypeArchiveOperationContainer)} />


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
                                <Route path="/admin/member/:slug/update/watch" exact component={requiresAuth(AdminMemberWatchUpdateContainer)} />
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
                                <Route path="/admin/area-coordinators/add/step-4" exact component={requiresAuth(AdminAreaCoordinatorCreateStep4Container)} />
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
                                <Route path="/admin/area-coordinator/:slug/demote/step-1" exact component={requiresAuth(AdminAreaCoordinatorDemoteOperationStep1Container)} />
                                <Route path="/admin/area-coordinator/:slug/demote/step-2" exact component={requiresAuth(AdminAreaCoordinatorDemoteOperationStep2Container)} />
                                <Route path="/admin/area-coordinator/:slug/demote/step-3" exact component={requiresAuth(AdminAreaCoordinatorDemoteOperationStep3Container)} />
                                <Route path="/admin/area-coordinator/:slug/archive" exact component={requiresAuth(AreaCoordinatorArchiveOperationContainer)} />
                                <Route path="/admin/area-coordinator/:slug/unarchive" exact component={requiresAuth(AdminAreaCoordinatorUnarchiveOperationContainer)} />

                                /*
                                ---------
                                ASSOCIATE
                                ---------
                                */
                                <Route path="/admin/associates/add/step-1" exact component={requiresAuth(AdminAssociateCreateStep1Container)} />
                                <Route path="/admin/associates/add/step-2" exact component={requiresAuth(AdminAssociateCreateStep2Container)} />
                                <Route path="/admin/associates/add/step-3" exact component={requiresAuth(AdminAssociateCreateStep3Container)} />
                                <Route path="/admin/associates/add/step-4" exact component={requiresAuth(AdminAssociateCreateStep4Container)} />
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
                                <Route path="/admin/associate/:slug/demote/step-1" exact component={requiresAuth(AdminAssociateDemoteOperationStep1Container)} />
                                <Route path="/admin/associate/:slug/demote/step-2" exact component={requiresAuth(AdminAssociateDemoteOperationStep2Container)} />
                                <Route path="/admin/associate/:slug/demote/step-3" exact component={requiresAuth(AdminAssociateDemoteOperationStep3Container)} />
                                <Route path="/admin/associate/:slug/archive" exact component={requiresAuth(AssociateArchiveOperationContainer)} />
                                <Route path="/admin/associate/:slug/unarchive" exact component={requiresAuth(AdminAssociateUnarchiveOperationContainer)} />

                                /*
                                -----
                                STAFF
                                -----
                                */
                                <Route path="/admin/staffs/add/step-1" exact component={requiresAuth(AdminStaffCreateStep1Container)} />
                                <Route path="/admin/staffs/add/step-2" exact component={requiresAuth(AdminStaffCreateStep2Container)} />
                                <Route path="/admin/staffs/add/step-3" exact component={requiresAuth(AdminStaffCreateStep3Container)} />
                                <Route path="/admin/staffs/add/step-4" exact component={requiresAuth(AdminStaffCreateStep4Container)} />
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

                                /*
                                -------
                                WATCHES
                                -------
                                */
                                <Route path="/admin/watches" exact component={requiresAuth(AdminWatchListContainer)} />
                                <Route path="/admin/watches/step-1-create" exact component={requiresAuth(AdminWatchCreateStep1Container)} />
                                <Route path="/admin/watches/step-2-create" exact component={requiresAuth(AdminWatchCreateStep2Container)} />
                                <Route path="/admin/watches/step-3-create" exact component={requiresAuth(AdminWatchCreateStep3Container)} />
                                <Route path="/admin/watches/step-4-create" exact component={requiresAuth(AdminWatchCreateStep4Container)} />
                                <Route path="/admin/watch/:slug" exact component={requiresAuth(AdminWatchRetrieveContainer)} />
                                <Route path="/admin/watch/:slug/comments" exact component={requiresAuth(AdminWatchCommentContainer)} />
                                <Route path="/admin/watch/:slug/operations" exact component={requiresAuth(AdminWatchOperationsContainer)} />
                                <Route path="/admin/watch/:slug/operation/archive" exact component={requiresAuth(AdminWatchArchiveOperationContainer)} />
                                <Route path="/admin/watch/:slug/operation/unarchive" exact component={requiresAuth(AdminWatchUnarchiveOperationContainer)} />
                                <Route path="/admin/watch/:slug/update/info" exact component={requiresAuth(AdminWatchInfoUpdateContainer)} />
                                <Route path="/admin/watch/:slug/update/street" exact component={requiresAuth(AdminWatchStreetUpdateContainer)} />
                                <Route path="/admin/watches/search" exact component={requiresAuth(AdminWatchSearchContainer)} />
                                <Route path="/admin/watches/search-results" exact component={requiresAuth(AdminWatchSearchResultContainer)} />

                                /*
                                -------
                                REPORTS
                                -------
                                */
                                <Route path="/admin/reports" exact component={requiresAuth(ReportListContainer)} />
                                <Route path="/admin/report/1" exact component={requiresAuth(Report01Container)} />
                                <Route path="/admin/report/2" exact component={requiresAuth(Report02Container)} />
                                <Route path="/admin/report/3" exact component={requiresAuth(Report03Container)} />
                                <Route path="/admin/report/4" exact component={requiresAuth(Report04Container)} />
                                <Route path="/admin/report/5" exact component={requiresAuth(Report05Container)} />
                                <Route path="/admin/report/6" exact component={requiresAuth(Report06Container)} />
                                <Route path="/admin/report/7" exact component={requiresAuth(Report07Container)} />



                                /*
                                -----
                                ITEMS
                                -----
                                */
                                <Route path="/admin/items" exact component={requiresAuth(AdminItemListContainer)} />
                                <Route path="/admin/items/search" exact component={requiresAuth(ItemSearchContainer)} />
                                <Route path="/admin/items/search-results" exact component={requiresAuth(ItemSearchResultContainer)} />
                                <Route path="/admin/item/add/step-1" exact component={requiresAuth(ItemCreateStep1Container)} />
                                <Route path="/admin/item/add/step-2-concern" exact component={requiresAuth(ItemCreateStep2ConcernContainer)} />
                                <Route path="/admin/item/add/step-3-concern" exact component={requiresAuth(ItemCreateStep3ConcernContainer)} />
                                <Route path="/admin/item/add/step-4-concern" exact component={requiresAuth(ItemCreateStep4ConcernContainer)} />
                                <Route path="/admin/item/add/step-5-concern" exact component={requiresAuth(ItemCreateStep5ConcernContainer)} />
                                <Route path="/admin/item/add/step-2-event" exact component={requiresAuth(ItemCreateStep2EventContainer)} />
                                <Route path="/admin/item/add/step-3-event" exact component={requiresAuth(ItemCreateStep3EventContainer)} />
                                <Route path="/admin/item/add/step-4-event" exact component={requiresAuth(ItemCreateStep4EventContainer)} />
                                <Route path="/admin/item/add/step-5-event" exact component={requiresAuth(ItemCreateStep5EventContainer)} />
                                <Route path="/admin/item/add/step-2-incident" exact component={requiresAuth(ItemCreateStep2IncidentContainer)} />
                                <Route path="/admin/item/add/step-3-incident" exact component={requiresAuth(ItemCreateStep3IncidentContainer)} />
                                <Route path="/admin/item/add/step-4-incident" exact component={requiresAuth(ItemCreateStep4IncidentContainer)} />
                                <Route path="/admin/item/add/step-5-incident" exact component={requiresAuth(ItemCreateStep5IncidentContainer)} />
                                <Route path="/admin/item/add/step-2-information" exact component={requiresAuth(ItemCreateStep2InformationContainer)} />
                                <Route path="/admin/item/add/step-3-information" exact component={requiresAuth(ItemCreateStep3InformationContainer)} />
                                <Route path="/admin/item/add/step-4-information" exact component={requiresAuth(ItemCreateStep4InformationContainer)} />
                                <Route path="/admin/item/add/step-2-community-news" exact component={requiresAuth(ItemCreateStep2CommunityNewsContainer)} />
                                <Route path="/admin/item/add/step-3-community-news" exact component={requiresAuth(ItemCreateStep3CommunityNewsContainer)} />
                                <Route path="/admin/item/add/step-4-community-news" exact component={requiresAuth(ItemCreateStep4CommunityNewsContainer)} />
                                <Route path="/admin/item/add/step-5-community-news" exact component={requiresAuth(ItemCreateStep5CommunityNewsContainer)} />
                                <Route path="/admin/item/add/step-6-community-news" exact component={requiresAuth(ItemCreateStep6CommunityNewsContainer)} />
                                <Route path="/admin/item/:slug" exact component={requiresAuth(ItemRetrieveContainer)} />
                                <Route path="/admin/item/:slug/comments" exact component={requiresAuth(ItemCommentContainer)} />
                                <Route path="/admin/item/:slug/update-incidence" exact component={requiresAuth(ItemUpdateIncidentContainer)} />
                                <Route path="/admin/item/:slug/update-concern" exact component={requiresAuth(ItemUpdateConcernContainer)} />
                                <Route path="/admin/item/:slug/update-event" exact component={requiresAuth(ItemUpdateEventContainer)} />
                                <Route path="/admin/item/:slug/update-info" exact component={requiresAuth(ItemUpdateInfoContainer)} />
                                <Route path="/admin/item/:slug/archive" exact component={requiresAuth(ItemArchiveContainer)} />

                                /*
                                -------------
                                TODO: PROCESS
                                -------------
                                */
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
