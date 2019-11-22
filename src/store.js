import thunk from 'redux-thunk';
import  { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { APP_STATE } from "./constants/redux";
import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
    TENANT_LIST_SUCCESS, TENANT_DETAIL_SUCCESS, MEMBER_LIST_SUCCESS, MEMBER_DETAIL_SUCCESS,
    HOW_HEAR_LIST_SUCCESS, HOW_HEAR_DETAIL_SUCCESS, TAG_LIST_SUCCESS, TAG_DETAIL_SUCCESS,
    EXPECTATION_LIST_SUCCESS, EXPECTATION_DETAIL_SUCCESS, MEANING_LIST_SUCCESS, MEANING_DETAIL_SUCCESS,
} from "./constants/actionTypes";
import userReducer from "./reducers/userReducer";
import { tenantListReducer, tenantDetailReducer} from "./reducers/tenantReducers";
import { memberListReducer, memberDetailReducer} from "./reducers/memberReducers";
import { howHearListReducer, howHearDetailReducer } from "./reducers/howHearReducers";
import { meaningListReducer, meaningDetailReducer } from "./reducers/meaningReducers";
import { tagListReducer, tagDetailReducer } from "./reducers/tagReducers";
import { expectationListReducer, expectationDetailReducer } from "./reducers/expectationReducers";
import dashboardReducer from "./reducers/dashboardReducer";
import flashMessageReducer from "./reducers/flashMessageReducer";


// Combine Reducers
const appReducer = combineReducers({
    userState: userReducer,
    dashboardState: dashboardReducer,
    tenantListState: tenantListReducer,
    tenantDetailState: tenantDetailReducer,
    flashMessageState: flashMessageReducer,
    memberListState: memberListReducer,
    memberDetailState: memberDetailReducer,
    tagListState: tagListReducer, tagDetailState: tagDetailReducer,
    howHearListState: howHearListReducer, howHearDetailState: howHearDetailReducer,
    meaningListState: meaningListReducer, meaningDetailState: meaningDetailReducer,
    expectationListState: expectationListReducer, expectationDetailState: expectationDetailReducer,
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
            MEANING_LIST_SUCCESS, MEANING_DETAIL_SUCCESS,
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
