import React from "react";


import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF,
   COMMUNITY_NEWS_ITEM_TYPE_OF,
   VOLUNTEER_ITEM_TYPE_OF,
   RESOURCE_ITEM_TYPE_OF,
   ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES,
   LINK_RESOURCE_TYPE_OF,
   YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
   IMAGE_RESOURCE_TYPE_OF,
   FILE_RESOURCE_TYPE_OF,
   TASK_ITEM_TYPE_OF_ASSIGN_AREA_COORDINATOR_TO_WATCH,
   TASK_ITEM_TYPE_OF_ASSIGN_ASSOCIATE_TO_WATCH,
   TASK_ITEM_TYPE_OF_ASSIGN_ASSOCIATE_TO_DISTRICT,
   TASK_ITEM_TYPE_OF_ACTION_INCIDENT_ITEM,
   TASK_ITEM_TYPE_OF_ACTION_CONCERNT_ITEM,
   TASK_ITEM_STATE_UNASSIGNED,
   TASK_ITEM_STATE_PENDING,
   TASK_ITEM_STATE_CLOSED
} from "./api";


export const ItemTypeOfLabelHelper = ({ typeOf }) => {
    if (typeOf === INCIDENT_ITEM_TYPE_OF) {
        return "Incident";
    } else if (typeOf === EVENT_ITEM_TYPE_OF) {
        return "Event";
    } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
        return "Concern";
    } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
        return "Information";
    } else if (typeOf === COMMUNITY_NEWS_ITEM_TYPE_OF) {
        return "Community News";
    } else if (typeOf === VOLUNTEER_ITEM_TYPE_OF) {
        return "Volunteer";
    } else if (typeOf === RESOURCE_ITEM_TYPE_OF) {
        return "Resource";
    } else {
        return null;
    }
}


export const ItemIconHelper = ({ typeOf }) => {
    if (typeOf === INCIDENT_ITEM_TYPE_OF) {
        return <i className="fas fa-fire"></i>;
    } else if (typeOf === EVENT_ITEM_TYPE_OF) {
        return <i className="fas fa-glass-cheers"></i>;
    } else if (typeOf === CONCERN_ITEM_TYPE_OF) {
        return <i className="fas fa-exclamation-circle"></i>;
    } else if (typeOf === INFORMATION_ITEM_TYPE_OF) {
        return <i className="fas fa-info-circle"></i>;
    } else if (typeOf === COMMUNITY_NEWS_ITEM_TYPE_OF) {
        return <i className="fas fa-glass-cheers"></i>;
    } else if (typeOf === VOLUNTEER_ITEM_TYPE_OF) {
        return <i className="fas fa-user-friends"></i>;
    } else if (typeOf === RESOURCE_ITEM_TYPE_OF) {
        return <i className="fas fa-atlas"></i>;
    } else {
        return null;
    }
}


export const ItemShownToWhomLabelHelper = ({ shownToWhomId }) => {
    let option;
    for (option of ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES) {
        if (option.value === parseInt(shownToWhomId)) {
            return option.label;
        }
    }
    return null;
}


export const ItemFormatTypeLabelHelper = ({ formatTypeId }) => {
    if (formatTypeId === LINK_RESOURCE_TYPE_OF) {
        return "Link";
    } else if (formatTypeId === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
        return "YouTube";
    } else if (formatTypeId === IMAGE_RESOURCE_TYPE_OF) {
        return "Image";
    } else if (formatTypeId === FILE_RESOURCE_TYPE_OF) {
        return "File";
    } else {
        return null;
    }
}



export const ItemFormatTypeIconHelper = ({ formatTypeId }) => {
    if (formatTypeId === LINK_RESOURCE_TYPE_OF) {
        return <i className="fas fa-link"></i>;
    } else if (formatTypeId === YOUTUBE_VIDEO_RESOURCE_TYPE_OF) {
        return <i className="fas fa-film"></i>;
    } else if (formatTypeId === IMAGE_RESOURCE_TYPE_OF) {
        return <i className="fas fa-image"></i>;
    } else if (formatTypeId === FILE_RESOURCE_TYPE_OF) {
        return <i className="fas fa-file"></i>;
    } else {
        return null;
    }
}


/*
 * See:
 * https://github.com/nwatchcanada/nwapp-back/blob/master/nwapp/tenant_foundation/models/task_item.py
 */
export const TaskItemTypeOfLabelHelper = ({ typeOfId }) => {
    if (typeOfId === TASK_ITEM_TYPE_OF_ASSIGN_AREA_COORDINATOR_TO_WATCH) {
        return "Assign Area Coordinator to Watch";
    } else if (typeOfId === TASK_ITEM_TYPE_OF_ASSIGN_ASSOCIATE_TO_WATCH) {
        return "Assign Associate to Watch";
    } else if (typeOfId === TASK_ITEM_TYPE_OF_ASSIGN_ASSOCIATE_TO_DISTRICT) {
        return "Assign Associate to District";
    } else if (typeOfId === TASK_ITEM_TYPE_OF_ACTION_INCIDENT_ITEM) {
        return "Action a NW concern item";
    } else if (typeOfId === TASK_ITEM_TYPE_OF_ACTION_CONCERNT_ITEM) {
        return "Action a NW item item";
    } else {
        return null;
    }
}


/*
 * See:
 * https://github.com/nwatchcanada/nwapp-back/blob/master/nwapp/tenant_foundation/models/task_item.py
 */
export const TaskItemStateLabelHelper = ({ stateId }) => {
    if (stateId === TASK_ITEM_STATE_UNASSIGNED) {
        return "Unassigned";
    } else if (stateId === TASK_ITEM_STATE_PENDING) {
        return "Pending";
    } else if (stateId === TASK_ITEM_STATE_CLOSED) {
        return "Closed";
    } else {
        return null;
    }
}
