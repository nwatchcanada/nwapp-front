import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientArchiveOperationComponent from "../../../components/clients/operations/clientArchiveOperationComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { postClientDeactivationDetail } from "../../../actions/clientActions";
import { validateDeactivationInput } from "../../../validators/clientValidator";


class ClientArchiveOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: id,
            client: {},
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

        postData.customer = this.props.clientDetail.id;
        postData.state = "inactive";
        postData.deactivationReason = this.state.reason;
        postData.deactivationReasonOther = this.state.reasonOther;

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
        this.props.setFlashMessage("success", "Client has been successfully deactivated.");
        this.props.history.push("/client/"+this.props.clientDetail.id+"/operations");
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

        // Perform client-side validation.
        const { errors, isValid } = validateDeactivationInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ isLoading: true, errors: [], }, ()=>{
                this.props.postClientDeactivationDetail(
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
        const { id, errors, isLoading, reason, reasonOther } = this.state;
        const client = this.props.clientDetail ? this.props.clientDetail : [];
        return (
            <ClientArchiveOperationComponent
                id={id}
                errors={errors}
                isLoading={isLoading}
                reason={reason}
                reasonOther={reasonOther}
                client={client}
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
        clientDetail: store.clientDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postClientDeactivationDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postClientDeactivationDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientArchiveOperationContainer);
