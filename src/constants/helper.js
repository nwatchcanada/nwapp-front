import React from "react";


import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF,
   ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES
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
