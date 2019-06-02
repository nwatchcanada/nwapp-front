import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

// import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import PrivacyContainer from './general/privacyContainer';
import TermsContainer from './general/termsContainer';
import HomeContainer from './general/homeContainer';
import LoginContainer from "./account/loginContainer";
// import LogoutContainer from "./account/logoutContainer";
import RegisterContainer from "./account/registerContainer";
import RegisterSuccessContainer from "./account/registerSuccessContainer";
// import ActivateContainer from "./account/activateContainer";
// import SendResetPasswordContainer from "./account/sendResetPasswordContainer";
// import SendResetPasswordSuccessContainer from "./account/sendResetPasswordSuccessContainer";
// import ResetPasswordContainer from "./account/resetPasswordContainer";
// import ResetPasswordSuccessContainer from "./account/resetPasswordSuccessContainer";
// import ReferralContainer from "./account/referralContainer";
import SharedOrganizationListContainer from "./organization/shared/sharedOrganizationListContainer";
import SharedOrganizationCreateContainer from "./organization/shared/sharedOrganizationCreateContainer";
import TenantDashboardRedirectContainer from "./dashboard/tenantDashboardRedirectContainer";
import DashboardContainer from "./dashboard/dashboardContainer";
import DistrictsListContainer from "./districts/districtsListContainer";
import DistrictRetrieveContainer from "./districts/districtRetrieveContainer";
import DistrictCreateContainer from "./districts/districtCreateContainer";
import DistrictUpdateContainer from "./districts/districtUpdateContainer";

import MemberListContainer from "./members/memberListContainer";
import MemberRetrieveContainer from "./members/memberRetrieveContainer";
import MemberCreateContainer from "./members/memberCreateContainer";
import MemberUpdateContainer from "./members/memberUpdateContainer";

import ItemListContainer from "./items/itemListContainer";
import ItemRetrieveContainer from "./items/itemRetrieveContainer";
import ItemCreateContainer from "./items/itemCreateContainer";
import ItemUpdateContainer from "./items/itemUpdateContainer";

class AppContainer extends React.Component {
    render() {
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
                                <Route path="/login" exact component={LoginContainer} />
                                <Route path="/register" exact component={RegisterContainer} />
                                <Route path="/register-success" exact component={RegisterSuccessContainer} />
                                <Route path="/privacy" exact component={PrivacyContainer} />
                                <Route path="/terms" exact component={TermsContainer} />
                                <Route path="/organizations" exact component={SharedOrganizationListContainer} />
                                <Route path="/organization/add" exact component={SharedOrganizationCreateContainer} />
                                <Route path="/dashboard-redirect/:accessToken/:expires/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={DashboardContainer} />
                                <Route path="/districts" exact component={DistrictsListContainer} />
                                <Route path="/district/add" exact component={DistrictCreateContainer} />
                                <Route path="/district/:slug" exact component={DistrictRetrieveContainer} />
                                <Route path="/district/:slug/update" exact component={DistrictUpdateContainer} />
                                <Route path="/members" exact component={MemberListContainer} />
                                <Route path="/member/add" exact component={MemberCreateContainer} />
                                <Route path="/member/:slug" exact component={MemberRetrieveContainer} />
                                <Route path="/member/:slug/update" exact component={MemberUpdateContainer} />
                                <Route path="/items" exact component={ItemListContainer} />
                                <Route path="/item/add" exact component={ItemCreateContainer} />
                                <Route path="/item/:slug" exact component={ItemRetrieveContainer} />
                                <Route path="/item/:slug/update" exact component={ItemUpdateContainer} />
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
