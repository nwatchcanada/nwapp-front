import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep2CommunityNewsComponent from "../../../../../components/items/admin/create/communityNews/itemCreateStep2CommunityNewsComponent";
import { localStorageGetIntegerItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from '../../../../../helpers/localStorageUtility';
import { validateCommunityNewsStep2Input } from "../../../../../validators/itemValidator";
import { OTHER_COMMUNITY_NEWS_TYPE_OF, COMMUNITY_NEWS_ITEM_TYPE_OF } from "../../../../../constants/api";
import { pullItemTypeList, getItemTypeReactSelectOptions } from "../../../../../actions/itemTypeActions";


class ItemCreateStep2CommunityNewsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const parametersMap = new Map();
        // parametersMap.set("is_archived", 3); // 3 = TRUE | 2 = FALSE
        parametersMap.set("o", "id");
        parametersMap.set("category", COMMUNITY_NEWS_ITEM_TYPE_OF);

        this.state = {
            // Pagination
            page: 1,
            sizePerPage: 10000,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // The rest of the code..
            category:localStorage.getItem("nwapp-item-create-communityNews-category"),
            categoryOption: localStorageGetObjectItem('nwapp-item-create-communityNews-categoryOption'),
            categoryOther: localStorage.getItem("nwapp-item-create-communityNews-categoryOther"),
            errors: {},
            isLoading: false,
            isItemTypeLoading: true,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Get our data.
        this.props.pullItemTypeList(
            this.state.page,
            this.state.sizePerPage,
            this.state.parametersMap,
            this.onSuccessListCallback,
            this.onFailureListCallback
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

    onSuccessListCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isItemTypeLoading: false,
                errors: []
            },
            ()=>{
                console.log("onSuccessListCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessListCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureListCallback(errors) {
        console.log(errors);
        this.setState({ isItemTypeLoading: false });
    }

    onSuccessfulSubmissionCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/admin/item/add/step-3-community-news");
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
     *  CommunityNews handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const key = "nwapp-item-create-communityNews-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState(
            {
                [option.selectName]: option.value,
                [optionKey]: option,
            },
            ()=>{
                console.log(this.state);
                localStorage.setItem('nwapp-item-create-communityNews-'+[option.selectName], option.value);
                localStorageSetObjectOrArrayItem('nwapp-item-create-communityNews-'+optionKey, option);
            }
        );
    }

    onClick(e) {
        // PrcommunityNews the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateCommunityNewsStep2Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Save for convinence the communityNews type depending on if the user
            // chose a standard option or the `other` option.
            if (this.state.category === OTHER_COMMUNITY_NEWS_TYPE_OF) {
                localStorage.setItem('nwapp-item-create-communityNews-pretty-communityNews-type', this.state.categoryOther);
            } else {
                localStorage.setItem('nwapp-item-create-communityNews-pretty-communityNews-type', this.state.categoryOption.label);
            }
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { category, categoryOther, isItemTypeLoading, errors } = this.state;
        const itemTypeListOptions = getItemTypeReactSelectOptions(this.props.itemTypeList, "category");

        // For debugging purposes only.
        // console.log(itemTypeListOptions);
        // console.log("category |", category);
        // console.log("categoryOptions |", itemTypeListOptions);

        return (
            <ItemCreateStep2CommunityNewsComponent
                category={category}
                categoryOptions={itemTypeListOptions}
                categoryOther={categoryOther}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
                isItemTypeLoading={isItemTypeLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        itemTypeList: store.itemTypeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullItemTypeList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullItemTypeList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep2CommunityNewsContainer);
