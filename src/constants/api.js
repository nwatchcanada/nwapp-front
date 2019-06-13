/**
 *  The constant used for hydrating/re-hydrating the redux state.
 */
export const APP_STATE = 'APP_STATE';

/**
 *  The API web-services endpoints.
 */
export const NWAPP_LOGIN_API_URL = process.env.REACT_APP_API_HOST+'/api/login';
export const NWAPP_LOGIN_API_ENDPOINT = '/login';
export const NWAPP_LOGOUT_API_ENDPOINT ='/logout';
export const NWAPP_REGISTER_API_URL = process.env.REACT_APP_API_HOST+'/api/register';
export const NWAPP_ACTIVATE_API_URL = process.env.REACT_APP_API_HOST+'/api/activate';
export const NWAPP_ACTIVATE_API_ENDPOINT = '/activate';
export const NWAPP_SEND_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/send-password-reset';
export const NWAPP_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/reset-password';
export const NWAPP_ONBOARDING_API_URL = process.env.REACT_APP_API_HOST+'/api/onboarding';
export const NWAPP_PURCHASE_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/purchase-device';
export const NWAPP_PROFILE_API_URL = process.env.REACT_APP_API_HOST+'/api/profile';
export const NWAPP_PROFILE_API_ENDPOINT = '/profile';
export const NWAPP_DASHBOARD_API_ENDPOINT = '/dashboard';


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


/**
 *  The generic type of that we can use in the system.
 */
export const RESIDENCE_TYPE_OF = 1
export const BUSINESS_TYPE_OF = 2
export const COMMUNITY_CARES_TYPE_OF = 3


/**
 *  A list of simple street types to choose from.
 */
export const BASIC_STREET_TYPE_CHOICES = [
    {
        selectName: "streetType",
        value: "Avenue",
        label: "Avenue"
    },{
        selectName: "streetType",
        value: "Drive",
        label: "Drive"
    },{
        selectName: "streetType",
        value: "Road",
        label: "Road"
    },{
        selectName: "streetType",
        value: "Street",
        label: "Street"
    },{
        selectName: "streetType",
        value: "Way",
        label: "Way"
    },{
        selectName: "streetType",
        value: "Other",
        label: "Other"
    }
];


/**
 *  A list of directions to choose from.
 */
export const STREET_DIRECTION_CHOICES = [
    {
        selectName: "streetDirection", value: "", label: "-"
    },{
        selectName: "streetDirection", value: "E", label: "East"
    },{
        selectName: "streetDirection", value: "N", label: "North"
    },{
        selectName: "streetDirection", value: "NE", label: "Northeast"
    },{
        selectName: "streetDirection", value: "NW", label: "Northwest"
    },{
        selectName: "streetDirection", value: "S", label: "South"
    },{
        selectName: "streetDirection", value: "SE", label: "Southeast"
    },{
        selectName: "streetDirection", value: "SW", label: "Southwest"
    },{
        selectName: "streetDirection", value: "W", label: "West"
    }
];


/**
 *  The item type of that we can use in the system.
 */
export const INCIDENT_ITEM_TYPE_OF = 1
export const EVENT_ITEM_TYPE_OF = 2
export const CONCERN_ITEM_TYPE_OF = 3
export const INFORMATION_ITEM_TYPE_OF = 4
export const ITEM_TYPE_CHOICES = [
    {
        selectName: "typeOf",
        value: INCIDENT_ITEM_TYPE_OF,
        label: "Incident"
    },{
        selectName: "typeOf",
        value: EVENT_ITEM_TYPE_OF,
        label: "Event"
    },{
        selectName: "typeOf",
        value: CONCERN_ITEM_TYPE_OF,
        label: "Concern"
    },{
        selectName: "typeOf",
        value: INFORMATION_ITEM_TYPE_OF,
        label: "Information"
    }
];
