import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ItemCreateStep5CommunityNewsComponent from "../../../../../components/items/admin/create/communityNews/itemCreateStep5CommunityNewsComponent";
import { localStorageGetIntegerItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from '../../../../../helpers/localStorageUtility';
import { validateCommunityNewsStep5Input } from "../../../../../validators/itemValidator";


class ItemCreateStep5CommunityNewsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            description: localStorage.getItem("nwapp-item-create-community-news-description"),
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
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

     onTextChange(e) {
         this.setState({
             [e.target.name]: e.target.value,
         });
         const key = "nwapp-item-create-community-news-"+[e.target.name];
         localStorage.setItem(key, e.target.value)
     }


    onClick(e) {
        // PrcommunityNews the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateCommunityNewsStep5Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, })
            this.props.history.push("/admin/item/add/step-6-community-news");

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
        const { description, isLoading, errors } = this.state;
        return (
            <ItemCreateStep5CommunityNewsComponent
                description={description}
                onTextChange={this.onTextChange}
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
)(ItemCreateStep5CommunityNewsContainer);
