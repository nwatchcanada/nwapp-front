import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import MemberUpdateComponent from "../../../components/members/update/memberUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/memberValidator";
import {
    RESIDENCE_TYPE_OF, BUSINESS_TYPE_OF, COMMUNITY_CARES_TYPE_OF, BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES
} from '../../../constants/api';


class MemberUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { urlArgument, slug } = this.props.match.params;

        this.state = {
            errors: {},
            isLoading: false,
            urlArgument: urlArgument,
            slug: slug,


        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onDOBDateTimeChange = this.onDOBDateTimeChange.bind(this);
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

        //TODO: REPLACE THE FOLLOWING CODE WITH API LOADING CODE.
        if (this.state.slug === 'argyle') {
            this.setState({
                typeOf: RESIDENCE_TYPE_OF,
                slug: 'argyle',
                number: 1,
                name: 'Argyle',
                absoluteUrl: '/member/argyle',
                firstName: "Shinji",
                lastName: "Ikari",
                primaryPhone:  "(111) 111-1111",
                secondaryPhone: "(222) 222-2222",
                email: "shinji.ikari@nerv.worldgov",
                streetNumber: 123,
                streetName: "Somewhere",
                streetType: "Street",
                streetTypeOption: "",
                streetTypeOther: "",
                streetDirection: "North",
                streetDirectionOption: "",
                watchSlug: "argyle-watch",
                watchIcon: "home",
                watchName: "Argyle",
                watch: "argyle-watch",
                dateOfBirth: new Date(),
                howDidYouHear: "Internet",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
            });
        } else if (this.state.slug === 'byron') {
            this.setState({
                typeOf: BUSINESS_TYPE_OF,
                slug: 'byron',
                number: 1,
                name: 'Byron',
                absoluteUrl: '/member/byron',
                companyName: "City Pop Music",
                contactFirstName: "Mariya",
                contactLastName: "Takeuchi",
                primaryPhone: "(321) 321-3210",
                secondaryPhone: "",
                email: "plastic_lover@gmail.com",
                streetNumber: 666999,
                streetName: "Shinjuku",
                streetType: "Street",
                streetTypeOption: "",
                streetTypeOther: "",
                streetDirection: "",
                streetDirectionOption: "",
                watchSlug: "byron-watch",
                watchIcon: "building",
                watchName: "Byron",
                watch: "byron-watch",
                dateOfBirth: new Date(),
                howDidYouHear: "Internet",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
            });
        } else if (this.state.slug === 'carling') {
            this.setState({
                typeOf: COMMUNITY_CARES_TYPE_OF,
                slug: 'carling',
                number: 1,
                name: 'Carling',
                absoluteUrl: '/member/carling',
                firstName: "Rei",
                lastName: "Ayanami",
                primaryPhone:  "(123) 123-12345",
                secondaryPhone: "(987) 987-0987",
                email: "rei.ayanami@nerv.worldgov",
                streetNumber: 451,
                streetName: "Centre",
                streetType: "Street",
                streetTypeOption: "",
                streetTypeOther: "",
                streetDirection: "",
                streetDirectionOption: "",
                watchSlug: "carling-watch",
                watchIcon: "university",
                watchName: "Carling",
                watch: "carling-watch",
                dateOfBirth: new Date(),
                howDidYouHear: "Internet",
                howDidYouHearOption: "",
                howDidYouHearOther: "",
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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(member) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Member has been successfully updated.");
        this.props.history.push("/members/"+this.state.urlArgument+"/"+this.state.slug+"/full");
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

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }

    onDOBDateTimeChange(dateOfBirth) {
        this.setState({
            dateOfBirth: dateOfBirth,
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { typeOf, errors, urlArgument, slug } = this.state;
        const {
            name, companyName, email, firstName, contactFirstName, lastName, contactLastName, primaryPhone, secondaryPhone, streetNumber,
            streetName, streetType, streetTypeOption, streetTypeOther, streetDirection, streetDirectionOption,
            watchSlug, watchIcon, watchName, watch, dateOfBirth, howDidYouHear, howDidYouHearOption, howDidYouHearOther
        } = this.state;

        const howDidYouHearOptions = [
            {
                selectName: "howDidYouHear",
                value: "Friend",
                label: "Friend"
            },{
                selectName: "howDidYouHear",
                value: "Workplace",
                label: "Workplace"
            },{
                selectName: "howDidYouHear",
                value: "Social Media",
                label: "Social Media"
            },{
                selectName: "howDidYouHear",
                value: "Family",
                label: "Family"
            },{
                selectName: "howDidYouHear",
                value: "Internet",
                label: "Internet"
            },{
                selectName: "howDidYouHear",
                value: "Other",
                label: "Other"
            }
        ];

        // REPLACE THIS CODE WITH API CODE.
        const watchOptions = [
            {
                selectName: 'watch',
                value: "argyle-watch",
                label: "Argyle Community Watch"
            },{
                selectName: 'watch',
                value: "byron-watch",
                label: "Byron Business Watch"
            },{
                selectName: 'watch',
                value: "carling-watch",
                label: "Carling Retirement Centre Watch"
            }
        ];

        return (
            <MemberUpdateComponent
                urlArgument={urlArgument}
                slug={slug}
                typeOf={typeOf}

                name={name}
                companyName={companyName}
                firstName={firstName}
                contactFirstName={contactFirstName}
                lastName={lastName}
                contactLastName={contactLastName}
                primaryPhone={primaryPhone}
                secondaryPhone={secondaryPhone}
                email={email}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                streetTypeOption={streetTypeOption}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                streetDirectionOption={streetDirectionOption}
                watchSlug={watchSlug}
                watchIcon={watchIcon}
                watchName={watchName}
                watchOptions={watchOptions}
                watch={watch}
                dateOfBirth={dateOfBirth}
                howDidYouHear={howDidYouHear}
                howDidYouHearOption={howDidYouHearOption}
                howDidYouHearOptions={howDidYouHearOptions}
                howDidYouHearOther={howDidYouHearOther}

                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onDOBDateTimeChange={this.onDOBDateTimeChange}
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
)(MemberUpdateContainer);
