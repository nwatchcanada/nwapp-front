import thunk from 'redux-thunk';
import  { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { APP_STATE } from "./constants/redux";
import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
    TENANT_LIST_SUCCESS, TENANT_DETAIL_SUCCESS, MEMBER_LIST_SUCCESS, MEMBER_DETAIL_SUCCESS,
    HOW_HEAR_LIST_SUCCESS, HOW_HEAR_DETAIL_SUCCESS, TAG_LIST_SUCCESS, TAG_DETAIL_SUCCESS,
    EXPECTATION_LIST_SUCCESS, EXPECTATION_DETAIL_SUCCESS, MEANING_LIST_SUCCESS, MEANING_DETAIL_SUCCESS,
    MEMBER_COMMENT_LIST_SUCCESS, PRIVATE_FILE_UPLOAD_LIST_SUCCESS,
    AREA_COORDINATOR_LIST_SUCCESS, AREA_COORDINATOR_DETAIL_SUCCESS, AREA_COORDINATOR_COMMENT_LIST_SUCCESS,
    SCORE_POINT_LIST_SUCCESS, SCORE_POINT_DETAIL_SUCCESS,
    BADGE_LIST_SUCCESS, BADGE_DETAIL_SUCCESS, AWARD_LIST_SUCCESS, AWARD_DETAIL_SUCCESS,
    ASSOCIATE_LIST_SUCCESS, ASSOCIATE_DETAIL_SUCCESS, ASSOCIATE_COMMENT_LIST_SUCCESS,
    STAFF_LIST_SUCCESS, STAFF_DETAIL_SUCCESS, STAFF_COMMENT_LIST_SUCCESS,
    DISTRICT_LIST_SUCCESS, DISTRICT_DETAIL_SUCCESS,
    ANNOUNCEMENT_LIST_SUCCESS, ANNOUNCEMENT_DETAIL_SUCCESS,
    RESOURCE_ITEM_LIST_SUCCESS, RESOURCE_DETAIL_SUCCESS,
    WATCH_LIST_SUCCESS, WATCH_DETAIL_SUCCESS, WATCH_COMMENT_LIST_SUCCESS,
    ITEM_TYPE_LIST_SUCCESS, ITEM_TYPE_DETAIL_SUCCESS,
    ITEM_LIST_SUCCESS, ITEM_DETAIL_SUCCESS, ITEM_COMMENT_LIST_SUCCESS,
    TASK_ITEM_LIST_SUCCESS, TASK_ITEM_DETAIL_SUCCESS,
} from "./constants/actionTypes";
import userReducer from "./reducers/userReducer";
import { tenantListReducer, tenantDetailReducer} from "./reducers/tenantReducers";
import { memberListReducer, memberDetailReducer} from "./reducers/memberReducers";
import { memberCommentListReducer } from "./reducers/memberCommentReducers";
import { areaCoordinatorListReducer, areaCoordinatorDetailReducer} from "./reducers/areaCoordinatorReducers";
import { areaCoordinatorCommentListReducer } from "./reducers/areaCoordinatorCommentReducers";
import { associateListReducer, associateDetailReducer} from "./reducers/associateReducers";
import { associateCommentListReducer } from "./reducers/associateCommentReducers";
import { staffListReducer, staffDetailReducer} from "./reducers/staffReducers";
import { staffCommentListReducer } from "./reducers/staffCommentReducers";
import { howHearListReducer, howHearDetailReducer } from "./reducers/howHearReducers";
import { meaningListReducer, meaningDetailReducer } from "./reducers/meaningReducers";
import { tagListReducer, tagDetailReducer } from "./reducers/tagReducers";
import { expectationListReducer, expectationDetailReducer } from "./reducers/expectationReducers";
import { privateFileUploadListReducer } from "./reducers/privateFileUploadReducers";
import dashboardReducer from "./reducers/dashboardReducer";
import flashMessageReducer from "./reducers/flashMessageReducer";
import { scorePointListReducer, scorePointDetailReducer } from "./reducers/scorePointReducers";
import { badgeListReducer, badgeDetailReducer } from "./reducers/badgeReducers";
import { awardListReducer, awardDetailReducer } from "./reducers/awardReducers";
import { districtListReducer, districtDetailReducer } from "./reducers/districtReducers";
import { announcementListReducer, announcementDetailReducer } from "./reducers/announcementReducers";
import { resourceListReducer, resourceDetailReducer } from "./reducers/resourceReducers";
import { watchListReducer, watchDetailReducer} from "./reducers/watchReducers";
import { watchCommentListReducer } from "./reducers/watchCommentReducers";
import { itemTypeListReducer, itemTypeDetailReducer } from "./reducers/itemTypeReducers";
import { itemListReducer, itemDetailReducer } from "./reducers/itemReducers";
import { itemCommentListReducer } from "./reducers/itemCommentReducers";
import { taskItemListReducer, taskItemDetailReducer } from "./reducers/taskItemReducers";

// Combine Reducers
const appReducer = combineReducers({
    userState: userReducer,
    dashboardState: dashboardReducer,
    tenantListState: tenantListReducer,
    tenantDetailState: tenantDetailReducer,
    flashMessageState: flashMessageReducer,
    memberListState: memberListReducer,
    memberDetailState: memberDetailReducer,
    memberCommentListState: memberCommentListReducer,
    areaCoordinatorListState: areaCoordinatorListReducer,
    areaCoordinatorDetailState: areaCoordinatorDetailReducer,
    areaCoordinatorCommentListState: areaCoordinatorCommentListReducer,
    associateListState: associateListReducer,
    associateDetailState: associateDetailReducer,
    associateCommentListState: associateCommentListReducer,
    staffListState: staffListReducer,
    staffDetailState: staffDetailReducer,
    staffCommentListState: staffCommentListReducer,
    tagListState: tagListReducer, tagDetailState: tagDetailReducer,
    howHearListState: howHearListReducer, howHearDetailState: howHearDetailReducer,
    meaningListState: meaningListReducer, meaningDetailState: meaningDetailReducer,
    expectationListState: expectationListReducer, expectationDetailState: expectationDetailReducer,
    privateFileUploadListState: privateFileUploadListReducer,
    scorePointListState: scorePointListReducer, scorePointDetailState: scorePointDetailReducer,
    awardListState: awardListReducer, awardDetailState: awardDetailReducer,
    badgeListState: badgeListReducer, badgeDetailState: badgeDetailReducer,
    districtListState: districtListReducer, districtDetailState: districtDetailReducer,
    announcementListState: announcementListReducer, announcementDetailState: announcementDetailReducer,
    resourceListState: resourceListReducer, resourceDetailState: resourceDetailReducer,
    watchListState: watchListReducer,
    watchDetailState: watchDetailReducer,
    watchCommentListState: watchCommentListReducer,
    itemTypeListState: itemTypeListReducer, itemTypeDetailState: itemTypeDetailReducer,
    itemListState: itemListReducer, itemDetailState: itemDetailReducer,
    itemCommentListState: itemCommentListReducer,
    taskItemListState: taskItemListReducer, taskItemDetailState: taskItemDetailReducer,
});


/**
 *  Reducer to be used before the "appReducer" used. The difference with is
 *  this reducer will clear the `redux` state if the logout state was detected.
 *
 *  Special thanks to:
 *  https://stackoverflow.com/a/35641992
 */
const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined
    }
    return appReducer(state, action)
}


/**
 *  Function will save the application state if a specific 'react-redux' state
 *  was triggered.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        if ([
            LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
            TENANT_LIST_SUCCESS, TENANT_DETAIL_SUCCESS, MEMBER_LIST_SUCCESS,
            MEMBER_DETAIL_SUCCESS, HOW_HEAR_LIST_SUCCESS, HOW_HEAR_DETAIL_SUCCESS,
            TAG_LIST_SUCCESS, TAG_DETAIL_SUCCESS, EXPECTATION_LIST_SUCCESS, EXPECTATION_DETAIL_SUCCESS,
            MEANING_LIST_SUCCESS, MEANING_DETAIL_SUCCESS, PRIVATE_FILE_UPLOAD_LIST_SUCCESS,
            AREA_COORDINATOR_LIST_SUCCESS, AREA_COORDINATOR_DETAIL_SUCCESS, AREA_COORDINATOR_COMMENT_LIST_SUCCESS,
            SCORE_POINT_LIST_SUCCESS, SCORE_POINT_DETAIL_SUCCESS,
            BADGE_LIST_SUCCESS, BADGE_DETAIL_SUCCESS, AWARD_LIST_SUCCESS, AWARD_DETAIL_SUCCESS,
            ASSOCIATE_LIST_SUCCESS, ASSOCIATE_DETAIL_SUCCESS, ASSOCIATE_COMMENT_LIST_SUCCESS,
            STAFF_LIST_SUCCESS, STAFF_DETAIL_SUCCESS, STAFF_COMMENT_LIST_SUCCESS,
            DISTRICT_LIST_SUCCESS, DISTRICT_DETAIL_SUCCESS,
            ANNOUNCEMENT_LIST_SUCCESS, ANNOUNCEMENT_DETAIL_SUCCESS,
            RESOURCE_ITEM_LIST_SUCCESS, RESOURCE_DETAIL_SUCCESS,
            WATCH_LIST_SUCCESS, WATCH_DETAIL_SUCCESS, WATCH_COMMENT_LIST_SUCCESS,
            ITEM_TYPE_LIST_SUCCESS, ITEM_TYPE_DETAIL_SUCCESS,
            ITEM_LIST_SUCCESS, ITEM_DETAIL_SUCCESS, ITEM_COMMENT_LIST_SUCCESS,
        ].includes(result.type)) {
            // console.log("De-hydrating store...");
            localStorage.setItem(APP_STATE, JSON.stringify(getState()))
        }
        return result;
    };
};


/**
 *  Function will load up the saved app-state from the local storage on
 *  application initial startup.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const reHydrateStore = () => {
    const data = localStorage.getItem(APP_STATE);
    if (data) {
        // console.log("Re-hydrating Store...");
        const jsonData = JSON.parse(data);
        // console.log("Store Contents:", jsonData); // For debugging purposes only.
        return jsonData;
    }
    return undefined;
};


// Create our store singleton object and populate it with our initial data.
const store = createStore(
    rootReducer,
    reHydrateStore(),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            localStorageMiddleware
        )
    )
);


export default store;
