import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorUnarchiveOperationComponent from "../../../../components/areaCoordinators/admin/operations/adminUnarchiveOperationComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { postAreaCoordinatorDeactivationDetail } from "../../../../actions/areaCoordinatorActions";
import { validateActivationInput } from "../../../../validators/areaCoordinatorValidator";


class AdminAreaCoordinatorUnarchiveOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
            areaCoordinator: {},
            reason: "",
            reasonOther: "",
            isLoading: false,
            errors: [],
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getPostData = this.getPostData.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.areaCoordinator = this.props.areaCoordinatorDetail.slug;
        postData.state = "active";
        postData.deactivationReason = 0; // NOT_SPECIFIED
        postData.deactivationReasonOther = ""

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
        console.log("onSuccessCallback | Fetched:", response);
        this.props.setFlashMessage("success", "Area coordinator has been successfully activated.");
        this.props.history.push("/admin/area-coordinator/"+this.props.areaCoordinatorDetail.slug+"/operations");
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);

        this.setState({
            errors: errors,
            isLoading: false
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
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform areaCoordinator-side validation.
        const { errors, isValid } = validateActivationInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ isLoading: true, errors: [], }, ()=>{
                this.props.postAreaCoordinatorDeactivationDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback,
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailureCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, errors, isLoading, reason, reasonOther } = this.state;
        const areaCoordinator = this.props.areaCoordinatorDetail ? this.props.areaCoordinatorDetail : [];
        return (
            <AdminAreaCoordinatorUnarchiveOperationComponent
                slug={slug}
                errors={errors}
                isLoading={isLoading}
                reason={reason}
                reasonOther={reasonOther}
                areaCoordinator={areaCoordinator}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        areaCoordinatorDetail: store.areaCoordinatorDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postAreaCoordinatorDeactivationDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postAreaCoordinatorDeactivationDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorUnarchiveOperationContainer);
