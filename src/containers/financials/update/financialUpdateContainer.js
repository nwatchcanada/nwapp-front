import React, { Component } from 'react';
import { connect } from 'react-redux';

import FinancialUpdateComponent from "../../../components/financials/update/financialUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateInput } from "../../../validators/financialValidator";


class FinanciaUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { slug } = this.props.match.params;
        this.state = {
            slug: slug,
            errors: {},
        }
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
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

    onSuccessfulSubmissionCallback(profile) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Financial details has been successfully updated.");
        this.props.history.push("/financial/"+this.state.slug);
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onSubmitClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ errors: {}, isLoading: true });

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { slug, errors, isLoading } = this.state;
        return (
            <FinancialUpdateComponent
                slug={slug}
                errors={errors}
                isLoading={isLoading}
                onSubmitClick={this.onSubmitClick}
                onTextChange={this.onTextChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinanciaUpdateContainer);
