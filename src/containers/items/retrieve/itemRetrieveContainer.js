import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemRetrieveComponent from "../../../components/items/retrieve/itemRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
   INCIDENT_ITEM_TYPE_OF,
   EVENT_ITEM_TYPE_OF,
   CONCERN_ITEM_TYPE_OF,
   INFORMATION_ITEM_TYPE_OF
} from "../../../constants/api";


class ItemRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
            itemData: {}
        }

        this.onBack = this.onBack.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        //TODO: REPLACE THIS CODE WITH API FETCHING CODE.
        const itemsArray = [{
            'typeOf': INCIDENT_ITEM_TYPE_OF,
            'icon': 'fire',
            'slug': 'argyle',
            'number': 1,
            'name': 'Argyle',
            'description': 'This is the description for argyle.',
            'location': 'London',
            'photos': [
                {
                    'path': 'Test File #1',
                    'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
                },{
                    'path': 'Test File #2',
                    'preview': 'https://nwapp.ca/img/nwl-compressed-logo.png',
                }
            ],
            'absoluteUrl': '/item/argyle'
        },{
            'typeOf': EVENT_ITEM_TYPE_OF,
            'icon': 'glass-cheers',
            'slug': 'byron',
            'number': 2,
            'name': 'Byron',
            'description': 'This is the description for byron.',
            'eventPrettyEventTypeOf': "Garage Sale",
            'logoPhoto': {
                'path': 'Test File #1',
                'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
            },
            'galleryPhotos': [
                {
                    'path': 'Test File #1',
                    'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
                },{
                    'path': 'Test File #2',
                    'preview': 'https://nwapp.ca/img/nwl-compressed-logo.png',
                }
            ],
            'shownToWhom': 1,
            'canBePostedOnSocialMedia': 1,
            'absoluteUrl': '/item/byron'
        },{
            'typeOf': CONCERN_ITEM_TYPE_OF,
            'icon': 'exclamation-circle',
            'slug': 'carling',
            'number': 3,
            'name': 'Carling',
            'description': 'This is the description for carling.',
            'location': 'London',
            'photos': [
                {
                    'path': 'Test File #1',
                    'preview': 'http://www.nwapp.ca/img/nwl-logo.png',
                },{
                    'path': 'Test File #2',
                    'preview': 'https://nwapp.ca/img/nwl-compressed-logo.png',
                }
            ],
            'absoluteUrl': '/item/carling'
        },{
            'typeOf': INFORMATION_ITEM_TYPE_OF,
            'icon': 'info-circle',
            'slug': 'darlyn',
            'number': 4,
            'name': null,
            'description': 'What is the contact information for my area coordinator, I need to speak with her, this is in regards to a private matter.',
            'absoluteUrl': '/item/darlyn'
        }];
        for (let i = 0; i < itemsArray.length; i++) {
            const itemData = itemsArray[i];
            if (itemData['slug'] === this.state.slug) {
                this.setState({
                    'itemData': itemData
                });
                console.log("componentDidMount | itemData:", itemData);
            }
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

    onBack(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/items/");
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/item/"+this.state.slug+"/update");
    }

    onArchiveClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.props.history.push("/item/"+this.state.slug+"/archive");
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {

        return (
            <ItemRetrieveComponent
                itemData={this.state.itemData}
                onBack={this.onBack}
                onClick={this.onClick}
                onArchiveClick={this.onArchiveClick}
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
)(ItemRetrieveContainer);
