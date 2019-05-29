import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

import getSubdomain from '../helpers/subdomainUtility';
// import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
// import PrivacyContainer from './general/privacyContainer';
// import TermsContainer from './general/termsContainer';
import HomeContainer from './general/homeContainer';
// import LoginContainer from "./account/loginContainer";
// import LogoutContainer from "./account/logoutContainer";
// import RegisterContainer from "./account/registerContainer";
// import RegisterSuccessContainer from "./account/registerSuccessContainer";
// import ActivateContainer from "./account/activateContainer";
// import SendResetPasswordContainer from "./account/sendResetPasswordContainer";
// import SendResetPasswordSuccessContainer from "./account/sendResetPasswordSuccessContainer";
// import ResetPasswordContainer from "./account/resetPasswordContainer";
// import ResetPasswordSuccessContainer from "./account/resetPasswordSuccessContainer";
// import ReferralContainer from "./account/referralContainer";
// import DashboardContainer from "./dashboard/dashboardContainer";



class AppContainer extends React.Component {
    render() {
        console.log("Subdomain:", getSubdomain());
        return (
            <Router>
                <div className="container-fluid" id="outer-container">

                    <NavigationContainer
                        history={this.props.history}
                        location={this.props.location}
                        match={this.props.match}
                        staticContext={this.props.staticContext}
                    />

                    <div className="d-flex align-items-stretch">
                        <main id="main" role="main">
                            <ScrollUpButton />
                            <Switch>
                                <Route path="/" exact component={HomeContainer} />
                                <Route component={NotFound404Container} />
                            </Switch>
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(AppContainer);
