import React, { Component } from "react";
import { Link } from "react-router-dom";


class AuthenticatedMessage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <p className="text-center text-secondary lead mb-4">Unfortunately we are having trouble loading the page your are looking for. You can return to your <Link to={user.dashboardPath}>dashboard</Link>. For immediate help, contact  <a href="mailto:support@mikaponics.com">support.</a></p>
                <br />
                <h4>Phone: <a href="tel:2262351368">(226) 235-1368</a></h4>
                <h4>E-Mail: <a href="mailto:support@mikaponics.com">support@mikaponics.com</a></h4>
                <br />
                <br />
                <p className="text-center">
                <Link className="btn btn-primary btn-lg" to={user.dashboardPath} role="button">Back to Dashboard</Link>
                </p>
            </div>
        );
    }
}

class AnonymousMessage extends Component {
    render() {
        return (
            <div>
                <p className="text-center text-secondary lead mb-4">Unfortunately we are having trouble loading the page your are looking for. You can return to the <Link to="/">home</Link> page. For immediate help, contact  <a href="mailto:support@mikaponics.com">support.</a></p>
                <br />
                <h4>Phone: <a href="tel:2262351368">(226) 235-1368</a></h4>
                <h4>E-Mail: <a href="mailto:support@mikaponics.com">support@mikaponics.com</a></h4>
                <br />
                <br />
                <p className="text-center">
                <Link className="btn btn-primary btn-lg" to="/home" role="button">Back to Home</Link>
                </p>
            </div>
        );
    }
}


class NotFound404Component extends Component {
    render() {
        const { user } = this.props;

        // Generate the 404 description text based on whether the user was
        // authenticated or is anonymous.
        let element;
        if (user !== null && user !== undefined) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
               element = <AuthenticatedMessage user={user} />
            }
        }

        if (element === null || element === undefined) {
            element = <AnonymousMessage />
        }

        return(
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">
                        <div className="row">
                            <div className="col-sm-6 mx-auto p-4">
                                <h3 className="text-center text-secondary mb-3"><i className="far fa-frown fa-5x"></i></h3>
                                <h1 className="text-center display-2 text-secondary mb-3">404</h1>
                                <h2 className="text-center text-secondary mb-3">Page Not Found</h2>
                                {element}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default NotFound404Component;
