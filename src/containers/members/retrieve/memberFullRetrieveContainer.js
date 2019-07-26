import React, { Component } from 'react';
import { connect } from 'react-redux';

import MemberFullRetrieveComponent from "../../../components/members/retrieve/memberFullRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { getHowHearReactSelectOptions } from "../../../actions/howHearAction";
import { getTagReactSelectOptions } from "../../../actions/tagAction";
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

        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
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
                    apartmentUnit: "Upper",
                    streetDirection: "North",
                    streetDirectionOption: "",
                    postalCode: "N6J4X4",
                    watchSlug: "argyle",
                    watchIcon: "home",
                    watchName: "Argyle",
                    tags:[
                        "security", "fitness"
                    ],
                    // tags:[
                    //     {selectName: "tags", value: "security", label: "Security"},
                    //     {selectName: "tags", value: "fitness", label: "Fitness"}
                    // ],
                    birthYear: 1980,
                    gender: 2,
                    genderLabel: "Female",
                    howDidYouHear: "internet",
                    howDidYouHearOption: "",
                    howDidYouHearOther: "",
                    howDidYouHearLabel: "Internet",
                    meaning: "Insert meaning here",
                    expectations: "Insert expectations here",
                    willingToVolunteerLabel: "Yes",
                    anotherHouseholdMemberRegisteredLabel: "Yes",
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
                    apartmentUnit: null,
                    streetDirection: "",
                    streetDirectionOption: "",
                    postalCode: "N6J4X4",
                    watchSlug: "byron",
                    watchIcon: "building",
                    watchName: "Byron",
                    tags:[
                        "security", "fitness"
                    ],
                    birthYear: 1975,
                    gender: 1,
                    genderLabel: "Male",
                    howDidYouHear: "internet",
                    howDidYouHearOption: "",
                    howDidYouHearOther: "",
                    howDidYouHearLabel: "Internet",
                    meaning: "Insert meaning here",
                    expectations: "Insert expectations here",
                    willingToVolunteerLabel: "No",
                    anotherHouseholdMemberRegisteredLabel: "No",
                    companyEmployeeCount: 4,
                    companyYearsInOperation: 1,
                    companyType: "Construction Company",
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
                    apartmentUnit: null,
                    streetDirection: "",
                    streetDirectionOption: "",
                    postalCode: "N6J4X4",
                    watchSlug: "carling",
                    watchIcon: "university",
                    watchName: "Carling",
                    tags:[
                        "security", "fitness"
                    ],
                    birthYear: 1985,
                    gender: 0,
                    genderLabel: "Prefer not to say",
                    howDidYouHear: "internet",
                    howDidYouHearOption: "",
                    howDidYouHearOther: "",
                    howDidYouHearLabel: "Internet",
                    meaning: "Insert meaning here",
                    expectations: "Insert expectations here",
                    willingToVolunteerLabel: "Maybe",
                    anotherHouseholdMemberRegisteredLabel: "Yes",
                }
            });
        }

        // TODO: REPLACE THE FOLLOWING CODE WITH API ENDPOINT CALLING.
        this.setState({
            howDidYouHearData: {
                results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                    name: 'Word of mouth',
                    slug: 'word-of-mouth'
                },{
                    name: 'Internet',
                    slug: 'internet'
                }]
            },
            tagsData: {
                results: [{ //TODO: REPLACE WITH API ENDPOINT DATA.
                    name: 'Health',
                    slug: 'health'
                },{
                    name: 'Security',
                    slug: 'security'
                },{
                    name: 'Fitness',
                    slug: 'fitness'
                }]
            }
        });
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
        const howDidYouHearOptions = getHowHearReactSelectOptions(this.state.howDidYouHearData, "howDidYouHear");
        const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");
        return (
            <MemberFullRetrieveComponent
                slug={this.state.slug}
                memberData={this.state.memberData}
                flashMessage={this.props.flashMessage}
                tagOptions={tagOptions}
                howDidYouHearOptions={howDidYouHearOptions}
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
