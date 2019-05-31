/**
 *  The constant used for hydrating/re-hydrating the redux state.
 */
export const APP_STATE = 'APP_STATE';

/**
 *  The API web-services endpoints.
 */
export const NWAPP_LOGIN_API_URL = process.env.REACT_APP_API_HOST+'/api/login';
export const NWAPP_LOGOUT_API_URL = process.env.REACT_APP_API_HOST+'/api/logout';
export const NWAPP_REGISTER_API_URL = process.env.REACT_APP_API_HOST+'/api/register';
export const NWAPP_ACTIVATE_API_URL = process.env.REACT_APP_API_HOST+'/api/activate';
export const NWAPP_SEND_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/send-password-reset';
export const NWAPP_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/reset-password';
export const NWAPP_ONBOARDING_API_URL = process.env.REACT_APP_API_HOST+'/api/onboarding';
export const NWAPP_PURCHASE_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/purchase-device';
export const NWAPP_GET_PROFILE_API_URL = process.env.REACT_APP_API_HOST+'/api/profile';
export const NWAPP_DASHBOARD_API_URL = process.env.REACT_APP_API_HOST+'/api/dashboard';


/**
 *  The type of choices we have for the `Production` API endpoint for the
 *  `type_of` field.
 */
export const EXECUTIVE_GROUP_ID = 1
export const MANAGEMENT_GROUP_ID = 2
export const FRONTLINE_STAFF_GROUP_ID = 3
export const ASSOCIATE_GROUP_ID = 4
export const AREA_COORDINATOR_GROUP_ID = 5
export const MEMBER_GROUP_ID = 6
export const GROUP_MEMBERSHIP_CHOICES = [
    {
        selectName: "group",
        value: EXECUTIVE_GROUP_ID,
        label: "Aquaponics"
    },{
        selectName: "group",
        value: MANAGEMENT_GROUP_ID,
        label: "Hydroponics"
    },{
        selectName: "group",
        value: FRONTLINE_STAFF_GROUP_ID,
        label: "Aquaculture"
    },{
        selectName: "group",
        value: ASSOCIATE_GROUP_ID,
        label: "Aquaculture"
    },{
        selectName: "group",
        value: AREA_COORDINATOR_GROUP_ID,
        label: "Aquaculture"
    },{
        selectName: "group",
        value: MEMBER_GROUP_ID,
        label: "Aquaculture"
    }
];
