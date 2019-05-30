import React, { Component } from 'react';
import Scroll from 'react-scroll';
// import { connect } from 'react-redux';

import RegisterComponent from '../../components/account/registerComponent';
// import { postRegister, clearRegister } from "../../actions/registerAction";


class RegisterContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract the ``referral`` code from the URL argument if the value
        // was specified.
        const referralCode = this.props.match.params['referral']

        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
            firstName: '',
            lastName: '',
            referrer: '',
            hasSignedTos: false,
            referralCode: referralCode,
            errors: {},
            isLoading: false,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        this.setState = (state,callback)=>{ return; };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback() {
        this.setState({
            errors: {},
        });
        // this.props.history.push(this.props.productionDetail.absoluteUrl+"/inspection");
    }

    onFailedSubmissionCallback() {
        // this.setState({
        //     errors: this.props.productionInspectionDetail.errors
        // })

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

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        })
    }

    onSubmit(e) {
        e.preventDefault();
        alert("TODO: IMPLEMENT");
        // this.props.postRegister(
        //     this.state,
        //     (data) => {
        //         console.log(data); // Do nothing.
        //     },
        //     (data) => {
        //         console.log(data);
        //
        //         // The following code will cause the screen to scroll to the top of
        //         // the page. Please see ``react-scroll`` for more information:
        //         // https://github.com/fisshy/react-scroll
        //         var scroll = Scroll.animateScroll;
        //         scroll.scrollToTop();
        //     }
        // );
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            email,
            password,
            passwordRepeat,
            firstName,
            lastName,
            hasSignedTos,
            referralCode,
            errors,
            isLoading,
        } = this.state;
        return (
            <RegisterComponent
                email={email}
                password={password}
                passwordRepeat={passwordRepeat}
                firstName={firstName}
                lastName={lastName}
                hasSignedTos={hasSignedTos}
                referralCode={referralCode}
                errors={errors}
                onTextChange={this.onTextChange}
                onCheckboxChange={this.onCheckboxChange}
                onSubmit={this.onSubmit}
                isLoading={isLoading}
            />
        );
    }
}

export default RegisterContainer;
