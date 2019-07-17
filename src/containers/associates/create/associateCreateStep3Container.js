import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociateCreateStep3Component from "../../../components/associates/create/associateCreateStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class AssociateCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const slug = localStorage.getItem("nwapp-create-associate-slug");
        this.state = {
            slug: slug,
            typeOf: 0,
            bizCompanyName: "",
            bizContactFirstName: "",
            bizContactLastName: "",
            bizPrimaryPhone: "",
            bizSecondaryPhone: "",
            bizEmail: "",
            rezFirstName: "",
            rezLastName: "",
            rezPrimaryPhone: "",
            rezSecondaryPhone: "",
            rezEmail: "",
            streetNumber: "",
            streetName: "",
            streetType: "",
            streetTypeOption: "",
            streetTypeOther: "",
            streetDirection: "",
            streetDirectionOption: "",
            watchSlug: "",
            watchIcon: "",
            watchName: "",
            dobObj: "",
            howDidYouHear: "",
            howDidYouHearOption: "",
            howDidYouHearOther: "",
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // TODO: REPLACE THE FOLLOWING WITH API CODE.
        if (this.state.slug === "rodolfo-martinez") {
            this.setState({
                typeOf: RESIDENCE_TYPE_OF,
                rezFirstName: "Rodolfo",
                rezLastName: "Martinez",
                rezPrimaryPhone: "(519)521-3135",
                rezSecondaryPhone: "",
                rezEmail: "rodolfo@nwl.com",
                streetNumber: "1848",
                streetName: " Mickleborough",
                streetType: "Dr",
                streetTypeOption: "",
                streetTypeOther: "",
                streetDirection: "",
                streetDirectionOption: "",
                watchSlug: "carling",
                watchIcon: "home",
                watchName: "Carling",
                dobObj: "",
                howDidYouHear: "",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
            })
        } else if (this.state.slug === "frank-herbert") {
            this.setState({
                typeOf: BUSINESS_TYPE_OF,
                bizCompanyName: "Dune",
                bizContactFirstName: "Frank",
                bizContactLastName: "Herbert",
                bizPrimaryPhone: "(999)666-9999",
                bizSecondaryPhone: "",
                bizEmail: "fherbert@dune.com",
                streetNumber: "1234",
                streetName: " Dune",
                streetType: "Street",
                streetTypeOption: "",
                streetTypeOther: "",
                streetDirection: "",
                streetDirectionOption: "",
                watchSlug: "argyle",
                watchIcon: "buildiner",
                watchName: "Argyle",
                dobObj: "",
                howDidYouHear: "",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
            })
        } else if (this.state.slug === "robert-a-heinlein") {
            this.setState({
                typeOf: COMMUNITY_CARES_TYPE_OF,
                rezFirstName: "Robert",
                rezLastName: "Heinlein",
                rezPrimaryPhone: "(321)123-1234",
                rezSecondaryPhone: "",
                rezEmail: "rodolfo@nwl.com",
                streetNumber: "4567",
                streetName: "Startship Trooper",
                streetType: "Avenue",
                streetTypeOption: "",
                streetTypeOther: "",
                streetDirection: "",
                streetDirectionOption: "",
                watchSlug: "byron",
                watchIcon: "university",
                watchName: "Byron",
                dobObj: "",
                howDidYouHear: "",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
            })
        }
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

    onSuccessfulSubmissionCallback(associate) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Associate has been successfully created.");
        this.props.history.push("/associates/active");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.onSuccessfulSubmissionCallback();
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
        typeOf, errors,
           bizCompanyName, bizContactFirstName, bizContactLastName, bizPrimaryPhone, bizSecondaryPhone, bizEmail,
           rezFirstName, rezLastName, rezPrimaryPhone, rezSecondaryPhone, rezEmail,
           streetNumber, streetName, streetType, streetTypeOption, streetTypeOther, streetDirection, streetDirectionOption,
           watchSlug, watchIcon, watchName, dobObj,
           howDidYouHear, howDidYouHearOption, howDidYouHearOther
        } = this.state;
        return (
            <AssociateCreateStep3Component
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
                dobObj={dobObj}
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
)(AssociateCreateStep3Container);
