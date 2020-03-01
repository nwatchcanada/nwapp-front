import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import isEmpty from 'lodash/isEmpty';

import ItemCategoryUpdateComponent from "../../../../components/items/admin/update/itemCategoryUpdateComponent";
import { validateIncidentStep2Input } from "../../../../validators/itemValidator";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { OTHER_INCIDENT_TYPE_OF, INCIDENT_ITEM_TYPE_OF } from "../../../../constants/api";
import { pullItemTypeList, getItemTypeReactSelectOptions } from "../../../../actions/itemTypeActions";
import { putItemCategory } from "../../../../actions/itemActions";
import { localStorageGetObjectItem } from '../../../../helpers/localStorageUtility';


class ItemCategoryUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The following code will extract our data from the local
        // storage if the data was previously saved.
        const item = localStorageGetObjectItem("nwapp-admin-retrieve-item-"+slug.toString() );

        const parametersMap = new Map();
        // parametersMap.set("is_archived", 3); // 3 = TRUE | 2 = FALSE
        parametersMap.set("o", "-created_at");
        parametersMap.set("category", item.typeOfCategory);

        this.state = {
            // Pagination
            page: 1,
            sizePerPage: 10000,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // The rest of the code.
            slug: slug,
            category: item.typeOfSlug,
            categoryOther: item.categoryOther,
            errors: {},
            isLoading: false,
            isItemTypeLoading: true,
            item: item,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessfulPutCallback = this.onSuccessfulPutCallback.bind(this);
        this.onFailurePutCallback = this.onFailurePutCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

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

    onSuccessfulPutCallback(item) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Item has been successfully updated.");
        this.props.history.push("/admin/item/"+this.state.slug);
    }

    onFailurePutCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Incident handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const key = "nwapp-item-create-incident-"+[e.target.name];
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
            }
        );
    }

    onClick(e) {
        // Princident the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateIncidentStep2Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putItemCategory(
                    this.getPostData(),
                    this.onSuccessfulPutCallback,
                    this.onFailurePutCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailurePutCallback(errors);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, category, categoryOther, isItemTypeLoading, errors, isLoading } = this.state;
        const item = isEmpty(this.state.item) ? {} : this.state.item;
        const itemTypeListOptions = getItemTypeReactSelectOptions(this.props.itemTypeList, "category");

        // For debugging purposes only.
        // console.log(itemTypeListOptions);
        // console.log("category |", category);
        // console.log("categoryOptions |", itemTypeListOptions);

        return (
            <ItemCategoryUpdateComponent
                slug={slug}
                category={category}
                categoryOptions={itemTypeListOptions}
                categoryOther={categoryOther}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
                isItemTypeLoading={isItemTypeLoading}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        item: store.itemDetailState,
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
        putItemCategory: (data, onSuccessfulPutCallback, onFailurePutCallback) => {
            dispatch(
                putItemCategory(data, onSuccessfulPutCallback, onFailurePutCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCategoryUpdateContainer);
