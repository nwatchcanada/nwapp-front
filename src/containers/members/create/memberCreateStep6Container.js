import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberCreateStep6Component from "../../../components/members/create/memberCreateStep6Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetObjectItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class MemberCreateStep6Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-create-member-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/members/add/step-2-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/members/add/step-2-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            bizCompanyName: localStorage.getItem("nwapp-create-member-biz-companyName"),
            bizContactFirstName: localStorage.getItem("nwapp-create-member-biz-contactFirstName"),
            bizContactLastName: localStorage.getItem("nwapp-create-member-biz-contactLastName"),
            bizPrimaryPhone: localStorage.getItem("nwapp-create-member-biz-primaryPhone"),
            bizSecondaryPhone: localStorage.getItem("nwapp-create-member-biz-secondaryPhone"),
            bizEmail: localStorage.getItem("nwapp-create-member-biz-email"),
            rezFirstName: localStorage.getItem("nwapp-create-member-rez-or-com-firstName"),
            rezLastName: localStorage.getItem("nwapp-create-member-rez-or-com-lastName"),
            rezPrimaryPhone: localStorage.getItem("nwapp-create-member-rez-or-com-primaryPhone"),
            rezSecondaryPhone: localStorage.getItem("nwapp-create-member-rez-or-com-secondaryPhone"),
            rezEmail: localStorage.getItem("nwapp-create-member-rez-or-com-email"),
            streetNumber: localStorage.getItem("nwapp-create-member-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-member-streetName"),
            streetType: localStorage.getItem("nwapp-create-member-streetType"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-member-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-member-streetTypeOther"),
            streetDirection: localStorage.getItem("nwapp-create-member-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-member-streetDirectionOption'),
            watchSlug: localStorage.getItem('nwapp-create-member-watch-slug'),
            watchIcon: localStorage.getItem('nwapp-create-member-watch-icon'),
            watchName: localStorage.getItem('nwapp-create-member-watch-name'),
            tags: localStorageGetArrayItem("nwapp-create-member-tags"),
            dateOfBirth: localStorageGetDateItem("nwapp-create-member-dateOfBirth"),
            howDidYouHear: localStorage.getItem("nwapp-create-member-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('nwapp-create-member-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("nwapp-create-member-howDidYouHearOther"),
            errors: {},
            isLoading: false
        }

        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Member has been successfully created.");
        this.props.history.push("/members/active");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            returnURL, typeOf, errors,
            bizCompanyName, bizContactFirstName, bizContactLastName, bizPrimaryPhone, bizSecondaryPhone, bizEmail,
            rezFirstName, rezLastName, rezPrimaryPhone, rezSecondaryPhone, rezEmail,
            streetNumber, streetName, streetType, streetTypeOption, streetTypeOther, streetDirection, streetDirectionOption,
            watchSlug, watchIcon, watchName, dateOfBirth, tags,
            howDidYouHear, howDidYouHearOption, howDidYouHearOther
        } = this.state;

        return (
            <MemberCreateStep6Component
                returnURL={returnURL}
                typeOf={typeOf}
                bizCompanyName={bizCompanyName}
                bizContactFirstName={bizContactFirstName}
                bizContactLastName={bizContactLastName}
                bizPrimaryPhone={bizPrimaryPhone}
                bizSecondaryPhone={bizSecondaryPhone}
                bizEmail={bizEmail}
                rezFirstName={rezFirstName}
                rezLastName={rezLastName}
                rezPrimaryPhone={rezPrimaryPhone}
                rezSecondaryPhone={rezSecondaryPhone}
                rezEmail={rezEmail}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeOption={streetTypeOption}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOption={streetDirectionOption}
                watchSlug={watchSlug}
                watchIcon={watchIcon}
                watchName={watchName}
                tags={tags}
                dateOfBirth={dateOfBirth}
                howDidYouHear={howDidYouHear}
                howDidYouHearOption={howDidYouHearOption}
                howDidYouHearOther={howDidYouHearOther}
                errors={errors}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberCreateStep6Container);
