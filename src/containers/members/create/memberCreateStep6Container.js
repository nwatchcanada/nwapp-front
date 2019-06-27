import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberCreateStep6Component from "../../../components/members/create/memberCreateStep6Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { localStorageGetObjectItem, localStorageGetDateItem } from '../../../helpers/localStorageUtility';
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
        const typeOf = parseInt(localStorage.getItem("temp-create-member-typeOf"));
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
            bizCompanyName: localStorage.getItem("temp-create-member-biz-companyName"),
            bizContactFirstName: localStorage.getItem("temp-create-member-biz-contactFirstName"),
            bizContactLastName: localStorage.getItem("temp-create-member-biz-contactLastName"),
            bizPrimaryPhone: localStorage.getItem("temp-create-member-biz-primaryPhone"),
            bizSecondaryPhone: localStorage.getItem("temp-create-member-biz-secondaryPhone"),
            bizEmail: localStorage.getItem("temp-create-member-biz-email"),
            rezFirstName: localStorage.getItem("temp-create-member-rez-or-com-firstName"),
            rezLastName: localStorage.getItem("temp-create-member-rez-or-com-lastName"),
            rezPrimaryPhone: localStorage.getItem("temp-create-member-rez-or-com-primaryPhone"),
            rezSecondaryPhone: localStorage.getItem("temp-create-member-rez-or-com-secondaryPhone"),
            rezEmail: localStorage.getItem("temp-create-member-rez-or-com-email"),
            streetNumber: localStorage.getItem("temp-create-member-streetNumber"),
            streetName: localStorage.getItem("temp-create-member-streetName"),
            streetType: localStorage.getItem("temp-create-member-streetType"),
            streetTypeOption: localStorageGetObjectItem('temp-create-member-streetTypeOption'),
            streetTypeOther: localStorage.getItem("temp-create-member-streetTypeOther"),
            streetDirection: localStorage.getItem("temp-create-member-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('temp-create-member-streetDirectionOption'),
            watchSlug: localStorage.getItem('temp-create-member-watch-slug'),
            watchIcon: localStorage.getItem('temp-create-member-watch-icon'),
            watchName: localStorage.getItem('temp-create-member-watch-name'),
            dateOfBirth: localStorageGetDateItem("temp-create-member-dateOfBirth"),
            howDidYouHear: localStorage.getItem("temp-create-member-howDidYouHear"),
            howDidYouHearOption: localStorageGetObjectItem('temp-create-member-howDidYouHearOption'),
            howDidYouHearOther: localStorage.getItem("temp-create-member-howDidYouHearOther"),
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
            watchSlug, watchIcon, watchName, dateOfBirth,
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
