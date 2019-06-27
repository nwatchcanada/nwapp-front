import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberFullRetrieveComponent from "../../../components/members/retrieve/memberFullRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


class MemberFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { urlArgument, slug } = this.props.match.params;

        // Update state.
        this.state = {
            urlArgument: urlArgument,
            slug: slug,
            memberData: {},
            errors: {},
            isLoading: false
        }
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        //TODO: REPLACE THIS CODE WITH API DATA.
        if (this.state.slug === 'argyle') {
            this.setState({
                memberData: {
                    slug: 'argyle',
                    number: 1,
                    name: 'Argyle',
                    absoluteUrl: '/member/argyle',
                    typeOf: RESIDENCE_TYPE_OF,
                    bizCompanyName: "",
                    bizContactFirstName: "",
                    bizContactLastName: "",
                    bizPrimaryPhone: "",
                    bizSecondaryPhone: "",
                    bizEmail: "",
                    rezFirstName: "Shinji",
                    rezLastName: "Ikari",
                    rezPrimaryPhone:  "(111) 111-1111",
                    rezSecondaryPhone: "(222) 222-2222",
                    rezEmail: "shinji.ikari@nerv.worldgov",
                    streetNumber: 123,
                    streetName: "Somewhere",
                    streetType: "Street",
                    streetTypeOption: "",
                    streetTypeOther: "",
                    streetDirection: "North",
                    streetDirectionOption: "",
                    watchSlug: "argyle",
                    watchIcon: "home",
                    watchName: "Argyle",
                    dateOfBirth: new Date(),
                    howDidYouHear: "Internet",
                    howDidYouHearOption: "",
                    howDidYouHearOther: "",
                }
            });
        } else if (this.state.slug === 'byron') {
            this.setState({
                memberData: {
                    slug: 'byron',
                    number: 1,
                    name: 'Byron',
                    absoluteUrl: '/member/byron',
                    typeOf: BUSINESS_TYPE_OF,
                    bizCompanyName: "City Pop Music",
                    bizContactFirstName: "Mariya",
                    bizContactLastName: "Takeuchi",
                    bizPrimaryPhone: "(321) 321-3210",
                    bizSecondaryPhone: "",
                    bizEmail: "plastic_lover@gmail.com",
                    rezFirstName: "",
                    rezLastName: "",
                    rezPrimaryPhone:  "",
                    rezSecondaryPhone: "",
                    rezEmail: "",
                    streetNumber: 666999,
                    streetName: "Shinjuku",
                    streetType: "Street",
                    streetTypeOption: "",
                    streetTypeOther: "",
                    streetDirection: "",
                    streetDirectionOption: "",
                    watchSlug: "byron",
                    watchIcon: "building",
                    watchName: "Byron",
                    dateOfBirth: new Date(),
                    howDidYouHear: "Internet",
                    howDidYouHearOption: "",
                    howDidYouHearOther: "",
                }
            });
        } else if (this.state.slug === 'carling') {
            this.setState({
                memberData: {
                    slug: 'carling',
                    number: 1,
                    name: 'Carling',
                    absoluteUrl: '/member/carling',
                    typeOf: COMMUNITY_CARES_TYPE_OF,
                    bizCompanyName: "",
                    bizContactFirstName: "",
                    bizContactLastName: "",
                    bizPrimaryPhone: "",
                    bizSecondaryPhone: "",
                    bizEmail: "",
                    rezFirstName: "Rei",
                    rezLastName: "Ayanami",
                    rezPrimaryPhone:  "(123) 123-12345",
                    rezSecondaryPhone: "(987) 987-0987",
                    rezEmail: "rei.ayanami@nerv.worldgov",
                    streetNumber: 451,
                    streetName: "Centre",
                    streetType: "Street",
                    streetTypeOption: "",
                    streetTypeOther: "",
                    streetDirection: "",
                    streetDirectionOption: "",
                    watchSlug: "carling",
                    watchIcon: "university",
                    watchName: "Carling",
                    dateOfBirth: new Date(),
                    howDidYouHear: "Internet",
                    howDidYouHearOption: "",
                    howDidYouHearOther: "",
                }
            });
        }
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <MemberFullRetrieveComponent
                urlArgument={this.state.urlArgument}
                slug={this.state.slug}
                memberData={this.state.memberData}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemberFullRetrieveContainer);
