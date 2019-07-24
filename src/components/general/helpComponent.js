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
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-question-circle"></i>&nbsp;Help</li>
                    </ol>
                </nav>


                <h1><i className="fas fa-question-circle"></i>&nbsp;Help</h1>
                { /* <p>Last updated: November 2014</p> */}

                <div class="row my-4 pt-4">
                    <div class="col-md-4 mx-auto">
                        <div class="card text-center">
                            <p class="mt-4 pt-3 mb-2"><i class="far fa-envelope fa-4x text-muted"></i></p>
                            <div class="card-body">
                                <h3 class="card-title">Contact</h3>
                            </div>
                            <ul class="list-group list-group-flush text-left">
                                <li class="list-group-item">
                                    <a href="mailto:info@nwlondon.ca"><i class="fas fa-envelope"></i> support@workery.ca</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="tel:5196614553"><i class="fas fa-phone"></i> +1(519)438-1111</a>
                                </li>
                                <li class="list-group-item"><i class="fas fa-map-marker-alt"></i> London, ON Canada</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default HelpComponent;
