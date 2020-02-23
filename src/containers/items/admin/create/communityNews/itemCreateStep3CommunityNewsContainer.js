import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep3CommunityNewsComponent from "../../../../../components/items/admin/create/communityNews/itemCreateStep3CommunityNewsComponent";
import { localStorageGetIntegerItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from '../../../../../helpers/localStorageUtility';
import { validateCommunityNewsStep3Input } from "../../../../../validators/itemValidator";


class ItemCreateStep3CommunityNewsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            whoNewsFor: localStorageGetIntegerItem("nwapp-item-create-community-news-whoNewsFor"),
            errors: {},
            isLoading: false,
        }

        this.onRadioChange = this.onRadioChange.bind(this);
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

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "nwapp-item-create-community-news-"+[e.target.name];
        const storageLabelKey =  "nwapp-item-create-community-news-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

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


    onClick(e) {
        // PrcommunityNews the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateCommunityNewsStep3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/admin/item/add/step-4-community-news");

        //     // Save for convinence the communityNews type depending on if the user
        //     // chose a standard option or the `other` option.
        //     if (this.state.category === OTHER_COMMUNITY_NEWS_TYPE_OF) {
        //         localStorage.setItem('nwapp-item-create-communityNews-pretty-communityNews-type', this.state.categoryOther);
        //     } else {
        //         localStorage.setItem('nwapp-item-create-communityNews-pretty-communityNews-type', this.state.categoryOption.label);
        //     }
        //     this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                errors: errors
            })

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
        const { whoNewsFor, isLoading, errors } = this.state;
        return (
            <ItemCreateStep3CommunityNewsComponent
                whoNewsFor={whoNewsFor}
                onRadioChange={this.onRadioChange}
                errors={errors}
                onClick={this.onClick}
                isLoading={isLoading}
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

    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCreateStep3CommunityNewsContainer);
