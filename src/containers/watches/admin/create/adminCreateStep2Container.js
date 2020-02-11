import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminWatchCreateStep2Component from "../../../../components/watches/admin/create/adminCreateStep2Component";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageGetBooleanItem
} from '../../../../helpers/localStorageUtility';
import { validateStep2CreateInput } from "../../../../validators/watchValidator";
import { getAssociateReactSelectOptions } from '../../../../actions/watchActions';
import { pullDistrictList, getDistrictReactSelectOptions } from '../../../../actions/districtActions';
import { getAreaCoordinatorReactSelectOptions } from '../../../../actions/areaCoordinatorActions';
import { pullTagList, getTagReactSelectOptions } from "../../../../actions/tagActions";
import {
    BASIC_STREET_TYPE_CHOICES,
    STREET_DIRECTION_CHOICES,
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from "../../../../constants/api";



class AdminWatchCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("nwapp-watch-typeOf"),
            tags: localStorageGetArrayItem("nwapp-watch-tags"),
            isTagLoading: true,
            name: localStorage.getItem('nwapp-watch-name'),
            description: localStorage.getItem('nwapp-watch-description'),
            associate: localStorage.getItem('nwapp-watch-associate'),
            associateOption: localStorageGetObjectItem('nwapp-watch-associateOption'),
            district: localStorage.getItem('nwapp-watch-district'),
            districtOption: localStorageGetObjectItem('nwapp-watch-districtOption'),
            isDistrictLoading: true,
            isVirtual: localStorageGetBooleanItem('nwapp-watch-isVirtual'),
            errors: {},
        }

        // Page related.
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onDistrictSuccessCallback = this.onDistrictSuccessCallback.bind(this);
        this.onDistrictFailureCallback = this.onDistrictFailureCallback.bind(this);
        this.onTagSuccessCallback = this.onTagSuccessCallback.bind(this);
        this.onTagFailureCallback = this.onTagFailureCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Get our data.
        const parametersMap = new Map();
        parametersMap.set("is_archived", 3); // 3 = TRUE | 2 = FALSE
        parametersMap.set("o", "-created_at");
        this.props.pullTagList(
            1,
            10000,
            parametersMap,
            this.onTagSuccessCallback,
            this.onTagFailureCallback
        );
        parametersMap.set("type_of", this.state.typeOf);
        this.props.pullDistrictList(
            1,
            10000,
            parametersMap,
            this.onDistrictSuccessCallback,
            this.onDistrictFailureCallback
        );
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

    onDistrictSuccessCallback(response) {
        console.log(response);
        this.setState({ isDistrictLoading: false, }, ()=>{
            console.log("onDistrictSuccessCallback: Successfully loaded the districts list.");
        });
    }

    onDistrictFailureCallback(errors) {
        this.setState({ errors: errors, isDistrictLoading: false, }, ()=>{
            console.log("onDistrictSuccessCallback: Failed loading the districts list.");
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTagSuccessCallback(response) {
        console.log(response);
        this.setState({ isTagLoading: false, }, ()=>{
            console.log("onTagSuccessCallback: Successfully loaded the districts list.");
        });
    }

    onTagFailureCallback(errors) {
        this.setState({ errors: errors, isTagLoading: false, }, ()=>{
            console.log("onTagSuccessCallback: Failed loading the districts list.");
        });

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
        localStorage.setItem('nwapp-watch-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-watch-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-watch-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'nwapp-watch-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
        localStorage.setItem('nwapp-watch-'+[e.target.name], e.target.checked);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep2CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/admin/watches/step-3-create");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            tags, isTagLoading, name, description, district, isDistrictLoading, isVirtual, errors
        } = this.state;

        const districtOptions = getDistrictReactSelectOptions(this.props.districtList, "district");
        const tagOptions = getTagReactSelectOptions(this.props.tagList, "tags");

        // // For debugging purposes only.
        // console.log("districtOptions", districtOptions);
        // console.log("tagOptions", tagOptions);

        return (
            <AdminWatchCreateStep2Component
                tags={tags}
                isTagLoading={isTagLoading}
                tagOptions={tagOptions}
                name={name}
                description={description}
                district={district}
                isDistrictLoading={isDistrictLoading}
                isVirtual={isVirtual}
                districtOptions={districtOptions}
                errors={errors}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
                onCheckboxChange={this.onCheckboxChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        districtList: store.districtListState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDistrictList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullDistrictList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
        pullTagList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchCreateStep2Container);
