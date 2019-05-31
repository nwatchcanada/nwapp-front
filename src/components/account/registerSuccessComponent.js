import React from 'react';
import { Link } from "react-router-dom";


class RegisterSuccessComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <main id="main">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/"><i className="fas fa-home"></i>&nbsp;Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                 <i className="fas fa-user"></i>&nbsp;Register
                            </li>
                        </ol>
                    </nav>

                    <div className="jumbotron">
                        <h1 className="display-4">
                           <i className="fas fa-check"></i>&nbsp;Registered
                        </h1>
                        <p className="lead">Thank you for registration, an activation email has been sent to your inbox. Please follow the instructions provided to activate your account.</p>
                        <hr className="my-4" />
                        <p>Once you have been activated, you will be able to log into the system.</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/">Finish</Link>
                        </p>
                    </div>
                </main>
            </div>
        );
    }
}

export default RegisterSuccessComponent
