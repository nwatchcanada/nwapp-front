import React, { Component } from 'react';
import { Link } from "react-router-dom";


class HelpComponent extends Component {
    render() {
        // Return our GUI.
        return (
            <div id="content">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-eye"></i>&nbsp;Help</li>
                    </ol>
                </nav>

                <h1><i className="fas fa-eye"></i>&nbsp;Help Policy</h1>
                <p>Last updated: November 2014</p>

                <br />
                <blockquote>Websites linking to this page have chosen to adopt this generic help policy as their own. This means that they agree to abide by the principles laid out below.</blockquote>

                <br />
                <br />

                <h2>Information that is gathered from visitors</h2>
                <p>In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type, referring page and time of visit.</p>
                <p>Cookies may be used to remember visitor preferences when interacting with the website.</p>
                <p>Where registration is required, the visitor's email and a username will be stored on the server.</p>

            </div>

        );
    }
}

export default HelpComponent;
