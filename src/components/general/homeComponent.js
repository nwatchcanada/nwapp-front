import React, { Component } from 'react';
import { Link } from "react-router-dom";


class HomeComponent extends Component {
    render() {
        // Return our GUI.
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-home"></i>&nbsp;Home
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-home"></i>&nbsp;Home</h1>

                <div className="row">
                    <div className="col-md-12">

                        <div className="jumbotron">
                            <h1 className="display-4">Neighourhood Watch</h1>
                            <p className="lead">TODO: PLEASE ADD DESCRIPTION.</p>
                            <hr className="my-4" />
                            <p>If you already have an account, login through here.</p>

                            <Link to="/login" role="button" className="btn btn-primary btn-lg">
                                <i className="fas fa-sign-in-alt"></i>&nbsp;Login
                            </Link><br />

                            <hr className="my-4" />
                            <p>Don't have an account? Here is where you can create your account.</p>
                            <Link to="/register" role="button" className="btn btn-primary btn-lg">
                                <i className="fas fa-user"></i>&nbsp;Register
                            </Link>

                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                What is this?
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Open-source telemetry</h5>
                                <p className="card-text">We believe sharing our code-base is important for you data and your business. You are welcome to view the code and create similar projects based off our code.</p>
                                <a href="https://github.com/mikaponics" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    Visit Github.com&nbsp;<i className="fas fa-external-link-alt"></i>&nbsp;
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Links and Resources
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                <ul>
                                    <li>Your privacy is important to us, please visit the <Link to="/privacy" target="_blank">privacy policy&nbsp;<i className="fas fa-external-link-alt"></i></Link> while using our services.</li>
                                    <li>The the <Link to="/terms" target="_blank">terms and services&nbsp;<i className="fas fa-external-link-alt"></i></Link> page describes what we expect from you.</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default HomeComponent;
