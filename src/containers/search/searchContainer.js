import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminSearchComponent from "../../components/search/searchComponent";
import { localStorageRemoveItemsContaining, localStorageSetObjectOrArrayItem } from '../../helpers/localStorageUtility';
import { validateInput } from "../../validators/tagSearchValidator";

import { getTagReactSelectOptions, pullTagList } from "../../actions/tagActions";


class AdminSearchContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            keyword: "",
            tags: [],
            errors: {},
            isLoading: false,
            isTagsLoading: true,
        }

        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        localStorageRemoveItemsContaining("nwapp-search-");

        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our skillset list.
        this.props.pullTagList(1, 1000, new Map(), this.onSuccessCallback);
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

    onSuccessCallback(response) {
        this.setState({ isTagsLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const key = "nwapp-search-"+[e.target.name].toString();
        localStorage.setItem(key, e.target.value);
    }

    onTagMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the skill sets we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'nwapp-search-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform associate-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/admin/search/results");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors, isLoading: false, });

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
            keyword, tags, errors, isLoading, isTagsLoading
        } = this.state;

        const { user } = this.props;
        return (
            <AdminSearchComponent
                keyword={keyword}
                tags={tags}
                tagOptions={getTagReactSelectOptions(this.props.tagList)}
                onTagMultiChange={this.onTagMultiChange}
                onTextChange={this.onTextChange}
                isTagsLoading={isTagsLoading}

                onClick={this.onClick}
                errors={errors}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSearchContainer);
