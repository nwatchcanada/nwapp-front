import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ClientMetricsUpdateComponent from "../../../components/clients/update/clientMetricsUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateMetricsInput } from "../../../validators/clientValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../actions/howHearActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../actions/tagActions";
import { putClientMetricsDetail } from "../../../actions/clientActions";


class ClientMetricsUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Get our dates based on our browsers timezone.
        // https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-55125516
        const birthdate = this.props.clientDetail.birthdate;
        const birthdateObj = birthdate === undefined || birthdate === null ? null : new Date(birthdate);
        if (birthdateObj) {
            birthdateObj.setMinutes( birthdateObj.getMinutes() + birthdateObj.getTimezoneOffset() );
        }

        const joinDateObj = new Date(this.props.clientDetail.joinDate);
        joinDateObj.setMinutes( joinDateObj.getMinutes() + joinDateObj.getTimezoneOffset() );

        this.state = {
            errors: {},
            isLoading: false,
            id: id,

            // STEP 3
            typeOf: this.props.clientDetail.typeOf,

            // STEP 4
            givenName: this.props.clientDetail.givenName,
            lastName: this.props.clientDetail.lastName,

            // STEP 6
            isTagsLoading: true,
            tags: this.props.clientDetail.tags,
            dateOfBirth: birthdateObj,
            gender: this.props.clientDetail.gender,
            isHowHearLoading: true,
            howHear: this.props.clientDetail.howHear,
            howHearOption: this.props.clientDetail.howHearOption,
            howHearOther: this.props.clientDetail.howHearOther,
            joinDate: joinDateObj,
            description: this.props.clientDetail.description,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
        this.onJoinDateChange = this.onJoinDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailedCallback = this.onFailedCallback.bind(this);
        this.onTagsSuccessFetch = this.onTagsSuccessFetch.bind(this);
        this.onHowHearSuccessFetch = this.onHowHearSuccessFetch.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (2) Middle name (API ISSUE)
        postData.middleName = this.state.middleName;

        // (2) Join date - We need to format as per required API format.
        const joinDateMoment = moment(this.state.joinDate);
        postData.joinDate = joinDateMoment.format("YYYY-MM-DD");

        const dateOfBirthMoment = moment(this.state.dateOfBirth);
        postData.birthdate = dateOfBirthMoment.format("YYYY-MM-DD")

        // (4) How Hear Other - This field may not be null, therefore make blank.
        if (this.state.howHearOther === undefined || this.state.howHearOther === null) {
            postData.howHearOther = "";
        }

        // // (5) Password & Password Repeat
        // if (this.state.password === undefined || this.state.password === null || this.state.password === '' || this.state.password.length == 0) {
        //     var randomString = Math.random().toString(34).slice(-10);
        //     randomString += "A";
        //     randomString += "!";
        //     postData.password = randomString;
        //     postData.passwordRepeat = randomString;
        // }

        // (6) Organization Type Of - This field may not be null, therefore make blank.
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null) {
            postData.organizationTypeOf = "";
        }

        // (8) Telephone type: This field is required.;
        if (this.state.telephoneTypeOf === undefined || this.state.telephoneTypeOf === null || this.state.telephoneTypeOf === "") {
            postData.telephoneTypeOf = 1;
        }
        if (this.state.otherTelephoneTypeOf === undefined || this.state.otherTelephoneTypeOf === null || this.state.otherTelephoneTypeOf === "") {
            postData.otherTelephoneTypeOf = 1;
        }

        // (9) Address Country: This field is required.
        postData.addressCountry = this.state.country;

        // (10) Address Locality: This field is required.
        postData.addressLocality = this.state.locality;

        // (11) Address Region: This field is required.
        postData.addressRegion = this.state.region

        // () First Name and Last Name if biz
        if (this.state.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {
            postData.givenName = this.state.givenName;
            postData.givenName = this.state.givenName;
            postData.givenName = this.state.givenName;
            postData.lastName = this.state.lastName;
        } else {

        }

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Fetch all our GUI drop-down options which are populated by the API.
        const parametersMap = new Map()
        parametersMap.set("isArchived", 3)
        this.props.pullHowHearList(1,1000, parametersMap, this.onHowHearSuccessFetch);
        this.props.pullTagList(1, 1000, parametersMap, this.onTagsSuccessFetch);
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

    onSuccessCallback(client) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Client has been successfully updated.");
        this.props.history.push("/client/"+this.state.id+"/full");
    }

    onFailedCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTagsSuccessFetch(tags) {
        this.setState({ isTagsLoading: false, });
    }

    onHowHearSuccessFetch(howHearList) {
        this.setState({ isHowHearLoading: false, });
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
        const { errors, isValid } = validateMetricsInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putClientMetricsDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailedCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedCallback(errors);
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

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-create-client-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onTagMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let idTags = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let tag = selectedOptions[i];
                idTags.push(tag.value);
            }
        }
        this.setState({ tags: idTags, });
    }

    onDateOfBirthChange(dateOfBirth) {
        this.setState({
            dateOfBirth: dateOfBirth,
        });
    }

    onJoinDateChange(joinDate) {
        this.setState({
            joinDate: joinDate,
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            errors, id, typeOf, givenName, lastName, isLoading,

            // STEP 6
            isTagsLoading, tags, birthdate, gender, isHowHearLoading, howHear, howHearOption, howHearOther, joinDate, description, dateOfBirth
        } = this.state;

        const howHearOptions = getHowHearReactSelectOptions(this.props.howHearList);
        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList)

        return (
            <ClientMetricsUpdateComponent
                // STEP 3
                typeOf={typeOf}

                // STEP 4
                givenName={givenName}
                lastName={lastName}

                // STEP 6
                isTagsLoading={isTagsLoading}
                tags={transcodedTags}
                tagOptions={tagOptions}
                onTagMultiChange={this.onTagMultiChange}
                dateOfBirth={dateOfBirth}
                gender={gender}
                isHowHearLoading={isHowHearLoading}
                howHear={howHear}
                howHearOptions={howHearOptions}
                howHearOption={howHearOption}
                howHearOther={howHearOther}
                joinDate={joinDate}
                description={description}

                // EVERYTHING ELSE
                isLoading={isLoading}
                givenName={givenName}
                lastName={lastName}
                id={id}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
                onDateOfBirthChange={this.onDateOfBirthChange}
                onJoinDateChange={this.onJoinDateChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        clientDetail: store.clientDetailState,
        howHearList: store.howHearListState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullHowHearList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullHowHearList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        putClientMetricsDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putClientMetricsDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientMetricsUpdateContainer);
