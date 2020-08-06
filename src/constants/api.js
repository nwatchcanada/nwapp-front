/**
 *  The constant used for hydrating/re-hydrating the redux state.
 */
export const APP_STATE = 'APP_STATE';

/**
 *  The base URL to apply to all the API endpoints.
 */
export const NWAPP_API_BASE_PATH = '/api'

/**
 *  The API web-services endpoints accessible from the public or tenant.
 */
export const NWAPP_LOGIN_API_ENDPOINT = '/v1/public/login';
export const NWAPP_LOGOUT_API_ENDPOINT = '/v1/public/logout';
export const NWAPP_REFRESH_TOKEN_API_ENDPOINT = '/v1/public/refresh-token';
export const NWAPP_PROFILE_API_ENDPOINT = '/v1/public/profile';
export const NWAPP_ORGANIZATION_LIST_API_ENDPOINT = '/v1/public/organizations';
export const NWAPP_ORGANIZATION_DETAIL_API_ENDPOINT = '/v1/public/organization/';
export const NWAPP_DASHBOARD_API_ENDPOINT = '/v1/dashboard';
export const WORKERY_TAG_LIST_API_ENDPOINT = '/v1/tags';
export const WORKERY_TAG_DETAIL_API_ENDPOINT = '/v1/tag/';
export const WORKERY_HOW_HEAR_LIST_API_ENDPOINT = '/v1/how-hears';
export const WORKERY_HOW_HEAR_DETAIL_API_ENDPOINT = '/v1/how-hear/';
export const WORKERY_EXPECTATION_LIST_API_ENDPOINT = '/v1/expectations';
export const WORKERY_EXPECTATION_DETAIL_API_ENDPOINT = '/v1/expectation/';
export const WORKERY_MEANING_LIST_API_ENDPOINT = '/v1/meanings';
export const WORKERY_MEANING_DETAIL_API_ENDPOINT = '/v1/meaning/';
export const NWAPP_PRIVATE_FILE_UPLOAD_LIST_API_ENDPOINT = '/v1/private-file-uploads';
export const NWAPP_PRIVATE_FILE_UPLOAD_ARCHIVE_API_ENDPOINT = '/v1/private-file-upload/<slug>';

export const NWAPP_SCORE_POINT_LIST_API_ENDPOINT = '/v1/score-points';
export const NWAPP_AWARD_LIST_API_ENDPOINT = '/v1/awards';
export const NWAPP_BADGES_LIST_API_ENDPOINT = '/v1/badges';
export const NWAPP_SCORE_POINT_DETAIL_API_ENDPOINT = '/v1/score-point/<uuid>';
export const NWAPP_AWARD_DETAIL_API_ENDPOINT = '/v1/award/<slug>';
export const NWAPP_BADGE_DETAIL_API_ENDPOINT = '/v1/badge/<slug>';

export const NWAPP_DISTRICT_LIST_API_ENDPOINT = '/v1/districts';
export const NWAPP_DISTRICT_DETAIL_API_ENDPOINT = '/v1/district/<slug>';
export const NWAPP_DISTRICT_BOUNDRY_OPERATION_API_ENDPOINT = '/v1/district/<slug>/operation/boundary';

export const WORKERY_ANNOUNCEMENT_LIST_API_ENDPOINT = '/v1/announcements';
export const WORKERY_ANNOUNCEMENT_DETAIL_API_ENDPOINT = '/v1/announcement/';

export const WORKERY_RESOURCE_ITEM_LIST_API_ENDPOINT = '/v1/resource-items';
export const WORKERY_RESOURCE_ITEM_DETAIL_API_ENDPOINT = '/v1/resource-item/';

export const WORKERY_ITEM_TYPE_LIST_API_ENDPOINT = '/v1/item-types';
export const WORKERY_ITEM_TYPE_DETAIL_API_ENDPOINT = '/v1/item-type/<slug>';

export const WORKERY_ITEM_LIST_API_ENDPOINT = '/v1/items';
export const WORKERY_ITEM_DETAIL_API_ENDPOINT = '/v1/item/<slug>';
export const WORKERY_ITEM_CATEGORY_UPDATE_API_ENDPOINT = '/v1/item/<slug>/update-category';
export const WORKERY_ITEM_AUTHORITIES_UPDATE_API_ENDPOINT = '/v1/item/<slug>/update-authorities';
export const WORKERY_ITEM_DETAILS_UPDATE_API_ENDPOINT = '/v1/item/<slug>/update-details';
export const WORKERY_ITEM_ARCHIVE_API_OPERATION_ENDPOINT = '/v1/items/operation/archive';
export const WORKERY_ITEM_COMMENT_LIST_API_ENDPOINT = '/v1/item-comments';

export const WORKERY_TASK_ITEM_LIST_API_ENDPOINT = '/v1/task-items';
export const WORKERY_TASK_ITEM_DETAIL_API_ENDPOINT = '/v1/task-item/<uuid>';

export const WORKERY_UNIFIED_SEARCH_ITEM_LIST_API_ENDPOINT = '/v1/search';

/**
 *  The full address of certain API endpoints from our backend server.
 */
export const NWAPP_LOGIN_API_URL = process.env.REACT_APP_API_HOST + NWAPP_API_BASE_PATH + NWAPP_LOGIN_API_ENDPOINT;
export const NWAPP_LOGOUT_API_URL = process.env.REACT_APP_API_HOST + NWAPP_API_BASE_PATH + NWAPP_LOGOUT_API_ENDPOINT;
export const NWAPP_REFRESH_TOKEN_API_URL = process.env.REACT_APP_API_HOST + NWAPP_API_BASE_PATH + NWAPP_REFRESH_TOKEN_API_ENDPOINT;
export const NWAPP_PROFILE_API_URL = process.env.REACT_APP_API_HOST + NWAPP_API_BASE_PATH + NWAPP_PROFILE_API_ENDPOINT;


//TODO: PROCESS THE FOLLOWING
export const WORKERY_MEMBER_LIST_API_ENDPOINT = '/v1/members';
export const WORKERY_MEMBER_DETAIL_API_ENDPOINT = '/v1/member/';
export const WORKERY_MEMBER_ARCHIVE_API_OPERATION_ENDPOINT = '/v1/members/operation/archive';
export const NWAPP_MEMBER_PROMOTE_OPERATION_API_ENDPOINT = '/v1/members/operation/promote';
export const WORKERY_MEMBER_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT = '/v1/members/operation/avatar';
export const WORKERY_MEMBER_COMMENT_LIST_API_ENDPOINT = '/v1/member-comments';
export const WORKERY_MEMBER_CONTACT_UPDATE_API_ENDPOINT = '/v1/member/XXX/contact';
export const WORKERY_MEMBER_ADDRESS_UPDATE_API_ENDPOINT = '/v1/member/XXX/address';
export const WORKERY_MEMBER_WATCH_UPDATE_API_ENDPOINT = '/v1/member/XXX/watch';
export const WORKERY_MEMBER_METRICS_UPDATE_API_ENDPOINT = '/v1/member/XXX/metrics';

//TODO: PROCESS THE FOLLOWING
export const WORKERY_AREA_COORDINATOR_LIST_API_ENDPOINT = '/v1/area-coordinators';
export const WORKERY_AREA_COORDINATOR_DETAIL_API_ENDPOINT = '/v1/area-coordinator/';
export const WORKERY_AREA_COORDINATOR_ARCHIVE_API_OPERATION_ENDPOINT = '/v1/area-coordinators/operation/archive';
export const NWAPP_AREA_COORDINATOR_PROMOTE_OPERATION_API_ENDPOINT = '/v1/area-coordinators/operation/promote';
export const NWAPP_AREA_COORDINATOR_DEMOTE_OPERATION_API_ENDPOINT = '/v1/area-coordinators/operation/demote';
export const WORKERY_AREA_COORDINATOR_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT = '/v1/area-coordinators/operation/avatar';
export const WORKERY_AREA_COORDINATOR_COMMENT_LIST_API_ENDPOINT = '/v1/area-coordinator-comments';
export const WORKERY_AREA_COORDINATOR_CONTACT_UPDATE_API_ENDPOINT = '/v1/area-coordinator/XXX/contact';
export const WORKERY_AREA_COORDINATOR_ADDRESS_UPDATE_API_ENDPOINT = '/v1/area-coordinator/XXX/address';
export const WORKERY_AREA_COORDINATOR_METRICS_UPDATE_API_ENDPOINT = '/v1/area-coordinator/XXX/metrics';

//TODO: PROCESS THE FOLLOWING
export const WORKERY_ASSOCIATE_LIST_API_ENDPOINT = '/v1/associates';
export const WORKERY_ASSOCIATE_DETAIL_API_ENDPOINT = '/v1/associate/';
export const WORKERY_ASSOCIATE_ARCHIVE_API_OPERATION_ENDPOINT = '/v1/associates/operation/archive';
export const NWAPP_ASSOCIATE_PROMOTE_OPERATION_API_ENDPOINT = '/v1/associates/operation/promote';
export const NWAPP_ASSOCIATE_DEMOTE_OPERATION_API_ENDPOINT = '/v1/associates/operation/demote';
export const NWAPP_ASSOCIATE_DISTRICT_OPERATION_API_ENDPOINT = '/v1/associates/operation/district';
export const WORKERY_ASSOCIATE_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT = '/v1/associates/operation/avatar';
export const WORKERY_ASSOCIATE_COMMENT_LIST_API_ENDPOINT = '/v1/associate-comments';
export const WORKERY_ASSOCIATE_CONTACT_UPDATE_API_ENDPOINT = '/v1/associate/XXX/contact';
export const WORKERY_ASSOCIATE_ADDRESS_UPDATE_API_ENDPOINT = '/v1/associate/XXX/address';
export const WORKERY_ASSOCIATE_METRICS_UPDATE_API_ENDPOINT = '/v1/associate/XXX/metrics';

//TODO: PROCESS THE FOLLOWING
export const WORKERY_STAFF_LIST_API_ENDPOINT = '/v1/staffs';
export const WORKERY_STAFF_DETAIL_API_ENDPOINT = '/v1/staff/';
export const WORKERY_STAFF_ARCHIVE_API_OPERATION_ENDPOINT = '/v1/staffs/operation/archive';
export const NWAPP_STAFF_PROMOTE_OPERATION_API_ENDPOINT = '/v1/staffs/operation/promote';
export const NWAPP_STAFF_DEMOTE_OPERATION_API_ENDPOINT = '/v1/staffs/operation/demote';
export const WORKERY_STAFF_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT = '/v1/staffs/operation/avatar';
export const WORKERY_STAFF_COMMENT_LIST_API_ENDPOINT = '/v1/staff-comments';
export const WORKERY_STAFF_CONTACT_UPDATE_API_ENDPOINT = '/v1/staff/XXX/contact';
export const WORKERY_STAFF_ADDRESS_UPDATE_API_ENDPOINT = '/v1/staff/XXX/address';
export const WORKERY_STAFF_METRICS_UPDATE_API_ENDPOINT = '/v1/staff/XXX/metrics';

//TODO: PROCESS THE FOLLOWING
export const WORKERY_WATCH_LIST_API_ENDPOINT = '/v1/watches';
export const WORKERY_WATCH_DETAIL_API_ENDPOINT = '/v1/watch/';
export const WORKERY_WATCH_ARCHIVE_API_OPERATION_ENDPOINT = '/v1/watches/operation/archive';
export const NWAPP_WATCH_PROMOTE_OPERATION_API_ENDPOINT = '/v1/watches/operation/promote';
export const WORKERY_WATCH_AVATAR_CREATE_OR_UPDATE_OPERATION_API_ENDPOINT = '/v1/watches/operation/avatar';
export const WORKERY_WATCH_COMMENT_LIST_API_ENDPOINT = '/v1/watch-comments';
export const WORKERY_WATCH_INFORMATION_UPDATE_API_ENDPOINT = '/v1/watch/XXX/info';
export const WORKERY_WATCH_STREET_MEMBERSHIP_UPDATE_API_ENDPOINT = '/v1/watch/XXX/street';
export const WORKERY_WATCH_METRICS_UPDATE_API_ENDPOINT = '/v1/watch/XXX/metrics';
export const NWAPP_WATCH_BOUNDRY_OPERATION_API_ENDPOINT = '/v1/watch/<slug>/operation/boundary';

// TODO: DO SOMETHING WITH BELOW
export const NWAPP_REGISTER_API_URL = process.env.REACT_APP_API_HOST+'/api/v1/public/register';
export const NWAPP_ACTIVATE_API_URL = process.env.REACT_APP_API_HOST+'/api/v1/activate';
export const NWAPP_ACTIVATE_API_ENDPOINT = '/api/v1/activate';
export const NWAPP_SEND_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/v1/send-password-reset';
export const NWAPP_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/v1/reset-password';
export const NWAPP_ONBOARDING_API_URL = process.env.REACT_APP_API_HOST+'/api/v1/onboarding';
export const NWAPP_PURCHASE_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/v1/purchase-device';


/**
 *  The type of choices we have for the `Production` API endpoint for the
 *  `type_of` field.
 */
export const EXECUTIVE_ROLE_ID = 1;
export const MANAGEMENT_ROLE_ID = 2;
export const FRONTLINE_STAFF_ROLE_ID = 3;
export const ASSOCIATE_ROLE_ID = 4;
export const AREA_COORDINATOR_ROLE_ID = 5;
export const MEMBER_ROLE_ID = 6;
export const ANONYMOUS_ROLE_ID = 0;
export const GROUP_MEMBERSHIP_CHOICES = [
    {
        selectName: "group",
        value: EXECUTIVE_ROLE_ID,
        label: "Executive"
    },{
        selectName: "group",
        value: MANAGEMENT_ROLE_ID,
        label: "Manager"
    },{
        selectName: "group",
        value: FRONTLINE_STAFF_ROLE_ID,
        label: "Frontline Staff"
    },{
        selectName: "group",
        value: ASSOCIATE_ROLE_ID,
        label: "Associate"
    },{
        selectName: "group",
        value: AREA_COORDINATOR_ROLE_ID,
        label: "Area Coordinator"
    },{
        selectName: "group",
        value: MEMBER_ROLE_ID,
        label: "Member"
    }
];
export const STAFF_GROUP_MEMBERSHIP_IDS_ARRAY = [
    EXECUTIVE_ROLE_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_STAFF_ROLE_ID,
];


/**
 *  The pagination values we use.
 */
export const STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION = 50;


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
        value: 2,
        label: "Avenue"
    },{
        selectName: "streetType",
        value: 3,
        label: "Boulevard"
    },{
        selectName: "streetType",
        value: 4,
        label: "Court"
    },{
        selectName: "streetType",
        value: 5,
        label: "Crescent"
    },{
        selectName: "streetType",
        value: 6,
        label: "Drive"
    },{
        selectName: "streetType",
        value: 7,
        label: "Gate"
    },{
        selectName: "streetType",
        value: 8,
        label: "Grove"
    },{
        selectName: "streetType",
        value: 9,
        label: "Hill"
    },{
        selectName: "streetType",
        value: 10,
        label: "Lane"
    },{
        selectName: "streetType",
        value: 11,
        label: "Place"
    },{
        selectName: "streetType",
        value: 12,
        label: "Road"
    },{
        selectName: "streetType",
        value: 13,
        label: "Street"
    },{
        selectName: "streetType",
        value: 14,
        label: "Terrace"
    },{
        selectName: "streetType",
        value: 15,
        label: "Way"
    },{
        selectName: "streetType",
        value: 1,
        label: "Other"
    }
];


/**
 *  A list of directions to choose from.
 */
export const STREET_DIRECTION_CHOICES = [
    {
        selectName: "streetDirection", value: 0, label: "-"
    },{
        selectName: "streetDirection", value: 1, label: "East"
    },{
        selectName: "streetDirection", value: 2, label: "North"
    },{
        selectName: "streetDirection", value: 3, label: "Northeast"
    },{
        selectName: "streetDirection", value: 4, label: "Northwest"
    },{
        selectName: "streetDirection", value: 5, label: "South"
    },{
        selectName: "streetDirection", value: 6, label: "Southeast"
    },{
        selectName: "streetDirection", value: 7, label: "Southwest"
    },{
        selectName: "streetDirection", value: 8, label: "West"
    }
];


/**
 *  The item type of that we can use in the system.
 */
export const INCIDENT_ITEM_TYPE_OF = 2;
export const EVENT_ITEM_TYPE_OF = 3;
export const CONCERN_ITEM_TYPE_OF = 4;
export const INFORMATION_ITEM_TYPE_OF = 5;
export const COMMUNITY_NEWS_ITEM_TYPE_OF = 6;
export const VOLUNTEER_ITEM_TYPE_OF = 7;
export const RESOURCE_ITEM_TYPE_OF = 8;
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
    },{
        selectName: "typeOf",
        value: COMMUNITY_NEWS_ITEM_TYPE_OF,
        label: "Community News"
    },{
        selectName: "typeOf",
        value: VOLUNTEER_ITEM_TYPE_OF,
        label: "Volunteer"
    },{
        selectName: "typeOf",
        value: RESOURCE_ITEM_TYPE_OF,
        label: "Resource"
    }
];
export const ITEM_TYPE_CATEGORY_CHOICES = [
    {
        selectName: "category",
        value: INCIDENT_ITEM_TYPE_OF,
        label: "Incident"
    },{
        selectName: "category",
        value: EVENT_ITEM_TYPE_OF,
        label: "Event"
    },{
        selectName: "category",
        value: CONCERN_ITEM_TYPE_OF,
        label: "Concern"
    },{
        selectName: "category",
        value: INFORMATION_ITEM_TYPE_OF,
        label: "Information"
    },{
        selectName: "category",
        value: COMMUNITY_NEWS_ITEM_TYPE_OF,
        label: "Community News"
    },{
        selectName: "category",
        value: VOLUNTEER_ITEM_TYPE_OF,
        label: "Volunteer"
    },{
        selectName: "category",
        value: RESOURCE_ITEM_TYPE_OF,
        label: "Resource"
    }
];

export const OTHER_EVENT_TYPE_OF = 1;
export const OTHER_COMMUNITY_NEWS_TYPE_OF = 1;
export const OTHER_VOLUNTEER_TYPE_OF = 1;
export const OTHER_RESOURCE_TYPE_OF = 1;


/**
 *  The item type of that we can use in the system.
 */
export const GARAGE_SALE_EVENT_TYPE_OF = 2;
export const GATHERING_EVENT_TYPE_OF = 3;
export const SPORTS_ITEM_TYPE_OF = 4;
export const BBQ_ITEM_TYPE_OF = 5;
export const FUNDRAISER_ITEM_TYPE_OF = 6;
export const ARTS_ITEM_TYPE_OF = 7;
export const EVENT_TYPE_CHOICES = [
    {
        selectName: "eventTypeOf",
        value: GARAGE_SALE_EVENT_TYPE_OF,
        label: "Garage Sale"
    },{
        selectName: "eventTypeOf",
        value: GATHERING_EVENT_TYPE_OF,
        label: "Gathering"
    },{
        selectName: "eventTypeOf",
        value: SPORTS_ITEM_TYPE_OF,
        label: "Sports"
    },{
        selectName: "eventTypeOf",
        value: BBQ_ITEM_TYPE_OF,
        label: "BBQ"
    },{
        selectName: "eventTypeOf",
        value: FUNDRAISER_ITEM_TYPE_OF,
        label: "Fundraiser"
    },{
        selectName: "eventTypeOf",
        value: ARTS_ITEM_TYPE_OF,
        label: "Arts"
    },{
        selectName: "eventTypeOf",
        value: OTHER_EVENT_TYPE_OF,
        label: "Other"
    }
];


/**
Break In
Fraud
Arson
Assault
Illegal Drugs
Person in Need
A Public Safety Issue
 */


/**
 *  The item type of that we can use in the system.
 */
export const OTHER_INCIDENT_TYPE_OF = 1;
export const BREAK_IN_INCIDENT_TYPE_OF = 2;
export const FRAUD_INCIDENT_TYPE_OF = 3;
export const ARSON_INCIDENT_TYPE_OF = 4;
export const ASSAULT_INCIDENT_TYPE_OF = 5;
export const ILLEGAL_DRUGS_INCIDENT_TYPE_OF = 6;
export const PERSON_IN_NEED_INCIDENT_TYPE_OF = 7;
export const PUBLIC_SAFETY_ISSUE_INCIDENT_TYPE_OF = 8;
export const INCIDENT_TYPE_CHOICES = [
    {
        selectName: "incidentTypeOf",
        value: BREAK_IN_INCIDENT_TYPE_OF,
        label: "Break In"
    },{
        selectName: "incidentTypeOf",
        value: FRAUD_INCIDENT_TYPE_OF,
        label: "Fraud"
    },{
        selectName: "incidentTypeOf",
        value: ARSON_INCIDENT_TYPE_OF,
        label: "Arson"
    },{
        selectName: "incidentTypeOf",
        value: ASSAULT_INCIDENT_TYPE_OF,
        label: "Assault"
    },{
        selectName: "incidentTypeOf",
        value: ILLEGAL_DRUGS_INCIDENT_TYPE_OF,
        label: "Illegal Drugs"
    },{
        selectName: "incidentTypeOf",
        value: PERSON_IN_NEED_INCIDENT_TYPE_OF,
        label: "Person in Need"
    },{
        selectName: "incidentTypeOf",
        value: PUBLIC_SAFETY_ISSUE_INCIDENT_TYPE_OF,
        label: "Public Safety Issue"
    },{
        selectName: "incidentTypeOf",
        value: OTHER_INCIDENT_TYPE_OF,
        label: "Other"
    }
];



/**
 *  The item type of that we can use in the system.
 */
export const OTHER_CONCERN_TYPE_OF = 1;
export const WITH_NW_CONCERN_TYPE_OF = 2;
export const WITH_NW_PARTNER = 3;
export const WITH_NW_ASSOCIATE = 4;
export const WITH_NW_AREA_COORDINATOR = 5;
export const WITH_NW_MEMBER = 6;
export const WITH_NW_BUSINESS_MEMBER = 7;
export const CONCERN_TYPE_CHOICES = [
    {
        selectName: "concernTypeOf",
        value: WITH_NW_CONCERN_TYPE_OF,
        label: "Concern with NW"
    },{
        selectName: "concernTypeOf",
        value: WITH_NW_PARTNER,
        label: "Concern with an NW Partner"
    },{
        selectName: "concernTypeOf",
        value: WITH_NW_ASSOCIATE,
        label: "Concern with an NW Associate"
    },{
        selectName: "concernTypeOf",
        value: WITH_NW_AREA_COORDINATOR,
        label: "Concern with an NW Area Coordinator"
    },{
        selectName: "concernTypeOf",
        value: WITH_NW_MEMBER,
        label: "Concern with an NW Member"
    },{
        selectName: "concernTypeOf",
        value: WITH_NW_BUSINESS_MEMBER,
        label: "Concern with an NW Business Member"
    },{
        selectName: "concernTypeOf",
        value: OTHER_CONCERN_TYPE_OF,
        label: "Other"
    }
];


/**
 *  The resource category of that we can use in the system.
 */
export const HEALTH_RESOURCE_CATEGORY = 2
export const HOUSING_RESOURCE_CATEGORY = 3
export const SOCIAL_RESOURCE_CATEGORY = 4
export const FOOD_AND_NUTRITION_RESOUCE_CATEGORY = 5
export const EDUCATION_RESOURCE_CATEGORY = 6
export const GOVERNMENT_RESOURCE_CATEGORY = 7
export const POLICE_RESOURCE_CATEGORY = 8
export const SAFETY_RESOURCE_CATEGORY = 9
export const RESOURCE_CATEGORY_CHOICES = [
    {
        selectName: "category",
        value: HEALTH_RESOURCE_CATEGORY,
        label: "Health"
    },{
        selectName: "category",
        value: HOUSING_RESOURCE_CATEGORY,
        label: "Housing"
    },{
        selectName: "category",
        value: SOCIAL_RESOURCE_CATEGORY,
        label: "Social"
    },{
        selectName: "category",
        value: FOOD_AND_NUTRITION_RESOUCE_CATEGORY,
        label: "Food & Nutrition"
    },{
        selectName: "category",
        value: EDUCATION_RESOURCE_CATEGORY,
        label: "Education"
    },{
        selectName: "category",
        value: GOVERNMENT_RESOURCE_CATEGORY,
        label: "Government"
    },{
        selectName: "category",
        value: POLICE_RESOURCE_CATEGORY,
        label: "Police"
    },{
        selectName: "category",
        value: SAFETY_RESOURCE_CATEGORY,
        label: "Safety"
    }
];


/**
 *  The resource type of that we can use in the system.
 */
export const LINK_RESOURCE_TYPE_OF = 2;
export const YOUTUBE_VIDEO_RESOURCE_TYPE_OF = 3;
export const IMAGE_RESOURCE_TYPE_OF = 4;
export const FILE_RESOURCE_TYPE_OF = 5;
export const RESOURCE_TYPE_OF_CHOICES = [
    {
        selectName: "typeOf",
        value: LINK_RESOURCE_TYPE_OF,
        label: "Link"
    },{
        selectName: "typeOf",
        value: YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
        label: "YouTube Video"
    },{
        selectName: "typeOf",
        value: IMAGE_RESOURCE_TYPE_OF,
        label: "Image"
    },{
        selectName: "typeOf",
        value: FILE_RESOURCE_TYPE_OF,
        label: "File"
    }
];



/**
 *  The reason why a user got demote
 */
export const OTHER_DEMOTION_REASON = 1;
export const RETIRED_DEMOTION_REASON = 2;
export const HEALTH_DEMOTION_REASON = 3;
export const NO_LONGER_WANTS_ROLE_DEMOTION_REASON = 4;
export const REPRIMAND_DEMOTION_REASON = 5;
export const DEMOTION_REASON_CHOICES = [
    {
        selectName: "reason",
        value: RETIRED_DEMOTION_REASON,
        label: "Retired"
    },{
        selectName: "reason",
        value: HEALTH_DEMOTION_REASON,
        label: "Health"
    },{
        selectName: "reason",
        value: NO_LONGER_WANTS_ROLE_DEMOTION_REASON,
        label: "No longer wants role"
    },{
        selectName: "reason",
        value: REPRIMAND_DEMOTION_REASON,
        label: "Reprimand"
    },{
        selectName: "reason",
        value: OTHER_DEMOTION_REASON,
        label: "Other"
    }
];

/**
 *  The associate demotion roles.
 */
export const ASSOCIATE_TO_AREA_COORDINATOR_DEMOTION_ROLE = 1;
export const ASSOCIATE_TO_MEMBER_DEMOTION_ROLE = 2;
export const ASSOCIATE_DEMOTION_ROLE_CHOICES = [
    {
        selectName: "role",
        value: ASSOCIATE_TO_AREA_COORDINATOR_DEMOTION_ROLE,
        label: "Area Coordinator"
    },{
        selectName: "role",
        value: ASSOCIATE_TO_MEMBER_DEMOTION_ROLE,
        label: "Member"
    }
];


/**
 *  The associate demotion roles.
 */
export const MALE_GENDER = 1;
export const FEMALE_GENDER = 2;
export const PREFER_NOT_TO_SAY_GENDER = 3;
export const OTHER_GENDER = 5;
export const GENDER_CHOICES = [
    {
        selectName: "gender",
        value: MALE_GENDER,
        label: "Male"
    },{
        selectName: "gender",
        value: FEMALE_GENDER,
        label: "Female"
    },{
        selectName: "gender",
        value: PREFER_NOT_TO_SAY_GENDER,
        label: "Prefer not to say"
    }
];
export const GENDER_RADIO_CHOICES = [
    {
        id: 'willingToVolunteer-m-choice',
        name: "gender",
        value: MALE_GENDER,
        label: "Male"
    },{
        id: 'willingToVolunteer-f-choice',
        name: "gender",
        value: FEMALE_GENDER,
        label: "Female"
    },{
        id: 'willingToVolunteer-pnts-choice',
        name: "gender",
        value: PREFER_NOT_TO_SAY_GENDER,
        label: "Prefer not to say"
    }
];


/**
 *  The tenant account roles.
 */
export const TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES = [
    {
        selectName: "accountType",
        value: MANAGEMENT_ROLE_ID,
        label: "Management"
    },{
        selectName: "accountType",
        value: FRONTLINE_STAFF_ROLE_ID,
        label: "Frontline Staff"
    }
];


/**
 *  Choices we have for the `willing_to_volunteer` field.
 */
export const WILLING_TO_VOLUNTEER_CHOICES = [
    {
        id: 'willingToVolunteer-yes-choice',
        name: 'willingToVolunteer',
        value: 2,
        label: 'Yes',
    },{
        id: 'willingToVolunteer-maybe-choice',
        name: 'willingToVolunteer',
        value: 1,
        label: 'Maybe',
    },{
        id: 'willingToVolunteer-no-choice',
        name: 'willingToVolunteer',
        value: 0,
        label: 'No',
    }
];

/**
 *  Choices we have for the `ho`
 */
export const ANOTHER_HOUSEHOLD_MEMBER_REGISTERED_CHOICES = [
    {
        id: 'anotherHouseholdMemberRegistered-y-choice',
        name: "anotherHouseholdMemberRegistered",
        value: 1,
        label: "Yes"
    },{
        id: 'anotherHouseholdMemberRegistered-n-choice',
        name: "anotherHouseholdMemberRegistered",
        value: 0,
        label: "No"
    }
];


export const ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES = [
    {
        id: 'shownToWhom-choice-1',
        name: "shownToWhom",
        value: 1,
        label: "General Public"
    },{
        id: 'shownToWhom-choice-2',
        name: "shownToWhom",
        value: 2,
        label: "All NWL Members"
    },{
        id: 'shownToWhom-choice-3',
        name: "shownToWhom",
        value: 3,
        label: "My Watch Area"
    }
];


export const ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES = [
    {
        id: 'canBePostedOnSocialMedia-m-choice',
        name: "canBePostedOnSocialMedia",
        value: 1,
        label: "Yes"
    },{
        id: 'canBePostedOnSocialMedia-f-choice',
        name: "canBePostedOnSocialMedia",
        value: 0,
        label: "No"
    }
];



export const ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES = [
    {
        id: 'hasNotifiedAuthorities-t-choice',
        name: "hasNotifiedAuthorities",
        value: 1,
        label: "Yes"
    },{
        id: 'hasNotifiedAuthorities-f-choice',
        name: "hasNotifiedAuthorities",
        value: 0,
        label: "No"
    }
];


export const WHO_NEWS_FOR_CHOICES = [
    {
        id: 'whoNewsFor-choice-1',
        name: "whoNewsFor",
        value: 2,
        label: "My City"
    },{
        id: 'whoNewsFor-choice-2',
        name: "whoNewsFor",
        value: 3,
        label: "My District"
    },{
        id: 'whoNewsFor-choice-3',
        name: "whoNewsFor",
        value: 4,
        label: "My Watch"
    }
];


export const ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES = [
    {
        id: 'hasAcceptAuthorityCooperation-t-choice',
        name: "hasAcceptAuthorityCooperation",
        value: 1,
        label: "Yes"
    },{
        id: 'hasAcceptAuthorityCooperation-f-choice',
        name: "hasAcceptAuthorityCooperation",
        value: 0,
        label: "No"
    }
];


export const WILL_ACTION_CHOICES = [
    {
        id: 'willAction-n-choice',
        name: "willAction",
        value: 1,
        label: "Yes"
    },{
        id: 'willAction-y-choice',
        name: "willAction",
        value: 0,
        label: "No"
    }
];






export const NOT_ACTIONING_CONCERN_ITEM_REASON_CHOICES = [
    {
        selectName: "reason",
        value: 2,
        label: "The concern has been referred to another community partner"
    },{
        selectName: "reason",
        value: 3,
        label: "This is outside the scope of NW"
    },{
        selectName: "reason",
        value: 4,
        label: "This concern has nothing to do with NW"
    },{
        selectName: "reason",
        value:5,
        label: "This concern is not serious"
    },{
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];



export const IS_OK_TO_EMAIL_CHOICES = [
    {
        id: 'isOkToEmail-t-choice',
        name: "isOkToEmail",
        value: 1,
        label: "Yes"
    },{
        id: 'isOkToEmail-f-choice',
        name: "isOkToEmail",
        value: 0,
        label: "No"
    }
];


export const IS_OK_TO_TEXT_CHOICES = [
    {
        id: 'isOkToText-t-choice',
        name: "isOkToText",
        value: 1,
        label: "Yes"
    },{
        id: 'isOkToText-f-choice',
        name: "isOkToText",
        value: 0,
        label: "No"
    }
];




export const ORGANIZATION_TYPE_OF_CHOICES = [
    {
        id: 'organizationTypeOf-t-choice',
        selectName: "organizationTypeOf",
        value: 2,
        label: "Private"
    },{
        id: 'organizationTypeOf-f-choice',
        selectName: "organizationTypeOf",
        value: 3,
        label: "Non-profit"
    },{
        id: 'organizationTypeOf-f-choice',
        selectName: "organizationTypeOf",
        value: 4,
        label: "Government"
    }
];


export const COMPANY_TYPE_OF_CHOICES = [
    {
        id: 'organizationTypeOf-t-choice',
        selectName: "organizationTypeOf",
        value: 2,
        label: "Private"
    },{
        id: 'organizationTypeOf-f-choice',
        selectName: "organizationTypeOf",
        value: 3,
        label: "Non-profit"
    },{
        id: 'organizationTypeOf-f-choice',
        selectName: "organizationTypeOf",
        value: 4,
        label: "Government"
    }
];


export const ARCHIVE_REASON_CHOICES = [
    {
        id: 'archive-reason-5-choice',
        selectName: "reason",
        value: 2,
        label: "Client is blacklisted"
    },{
        id: 'archive-reason-4-choice',
        selectName: "reason",
        value: 3,
        label: "Client has moved"
    },{
        id: 'archive-reason-3-choice',
        selectName: "reason",
        value: 4,
        label: "Client is deceased"
    },{
        id: 'archive-reason-2-choice',
        selectName: "reason",
        value: 5,
        label: "Client does not want us to contact them"
    },{
        id: 'archive-reason-1-choice',
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];


/**
 *  "ScorePoint" Model
 *  Type of options
 */
export const SCORE_POINT_TYPE_OF_CHOICES = [
    {
        id: 'typeOf-1-choice',
        selectName: "typeOf",
        value: 2,
        label: "Donation"
    },{
        id: 'typeOf-3-choice',
        selectName: "typeOf",
        value: 3,
        label: "Daily Usage"
    },{
        id: 'typeOf-1-choice',
        selectName: "typeOf",
        value: 1,
        label: "Other (Please specify)"
    }
];



/**
 *  "Badge" Model
 *  Type of options
 */
export const BADGE_TYPE_OF_CHOICES = [
    {
        id: 'typeOf-1-choice',
        selectName: "typeOf",
        value: 2,
        label: "Neighbourhood Watch Supporter"
    },{
        id: 'typeOf-1-choice',
        selectName: "typeOf",
        value: 1,
        label: "Other (Please specify)"
    }
];

/*
 *------------------------------------------------------------------------------
 *                                  TASK ITEM
 *------------------------------------------------------------------------------
 */
export const TASK_ITEM_TYPE_OF_ASSIGN_AREA_COORDINATOR_TO_WATCH = 1
export const TASK_ITEM_TYPE_OF_ASSIGN_ASSOCIATE_TO_WATCH = 2
export const TASK_ITEM_TYPE_OF_ASSIGN_ASSOCIATE_TO_DISTRICT = 3
export const TASK_ITEM_TYPE_OF_ACTION_INCIDENT_ITEM = 4
export const TASK_ITEM_TYPE_OF_ACTION_CONCERNT_ITEM = 5

export const TASK_ITEM_STATE_UNASSIGNED = 1
export const TASK_ITEM_STATE_PENDING = 2
export const TASK_ITEM_STATE_CLOSED = 3


/*
 *------------------------------------------------------------------------------
 *                                    WATCH
 *------------------------------------------------------------------------------
 */

export const WATCH_ARCHIVE_REASON_CHOICES = [
    {
        id: 'archive-reason-5-choice',
        selectName: "reason",
        value: 2,
        label: "No Area Coordinator"
    },{
        id: 'archive-reason-4-choice',
        selectName: "reason",
        value: 3,
        label: "Watch has collectively opted out of program"
    },{
        id: 'archive-reason-3-choice',
        selectName: "reason",
        value: 4,
        label: "Watch Area not compliant"
    },{
        id: 'archive-reason-1-choice',
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];

export const STREET_NUMBER_RANGE_TYPE_CHOICES = [
    {
        id: 'street-number-range-type-1-choice',
        selectName: "streetNumberRangeType",
        value: 1,
        label: "All"
    },{
        id: 'street-number-range-type-2-choice',
        selectName: "streetNumberRangeType",
        value: 2,
        label: "Odd"
    },{
        id: 'street-number-range-type-3-choice',
        selectName: "streetNumberRangeType",
        value: 3,
        label: "Even"
    }
];
