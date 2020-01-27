import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminWatchCreateStep2Component from "../../../../components/watches/admin/create/adminCreateStep2Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { validateStep1CreateInput } from "../../../../validators/watchValidator";
import { getAssociateReactSelectOptions } from '../../../../actions/watchActions';
import { getDistrictReactSelectOptions } from '../../../../actions/districtActions';
import { getAreaCoordinatorReactSelectOptions } from '../../../../actions/areaCoordinatorActions';
import { getTagReactSelectOptions } from "../../../../actions/tagActions";
import {
    BASIC_STREET_TYPE_CHOICES,
    STREET_DIRECTION_CHOICES
} from "../../../../constants/api";


class AdminWatchCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            tags: localStorageGetArrayItem("nwapp-watch-tags"),
            name: localStorage.getItem('nwapp-watch-name'),
            description: localStorage.getItem('nwapp-watch-description'),
            associate: localStorage.getItem('nwapp-watch-associate'),
            associateOption: localStorageGetObjectItem('nwapp-watch-associateOption'),
            district: localStorage.getItem('nwapp-watch-district'),
            districtOption: localStorageGetObjectItem('nwapp-watch-districtOption'),
            errors: {},
        }

        // Page related.
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
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

    onSuccessfulSubmissionCallback(district) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/watches/step-3-create");
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // // Perform client-side validation.
        // const { errors, isValid } = validateResidentialStep2Input(this.state);
        //
        // // CASE 1 OF 2: Validation passed successfully.
        // if (isValid) {
        //     this.onSuccessfulSubmissionCallback();
        //
        // // CASE 2 OF 2: Validation was a failure.
        // } else {
        //     this.onFailedSubmissionCallback(errors);
        // }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            tags, name, description, district, errors
        } = this.state;

        // const districtListObject = {
        //     results: [
        //         {'slug': 'wanchai', 'name': 'Wanchai Market'},
        //         {'slug': 'versalife', 'name': 'VersaLife'},
        //         {'slug': 'battery-park', 'name': 'Battery Park'},
        //         {'slug': 'area-51', 'name': 'Area 51'}
        //     ]
        // }; // TODO: REPLACTE WITH API DATA.
        //
        // const tagOptions = getTagReactSelectOptions(this.state.tagsData, "tags");

        return (
            <AdminWatchCreateStep2Component
                tags={tags}
                // tagOptions={tagOptions}
                name={name}
                description={description}
                district={district}
                // districtOptions={getDistrictReactSelectOptions(districtListObject)}
                errors={errors}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWatchCreateStep2Container);
