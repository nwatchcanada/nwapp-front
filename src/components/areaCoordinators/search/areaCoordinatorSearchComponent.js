import React, { Component } from 'react';
import { Link } from "react-router-dom";


class AreaCoordinatorSearchComponent extends Component {
    render() {
        const { onSearchClick, onAdvancedSearchClick, advancedSearchActive, onAdvancedSearchPanelToggle } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/area-coordinators`}><i className="fas fa-horse-head"></i>&nbsp;Area Coordinators</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-search"></i>&nbsp;Search
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Area Coordinators Search</h1>

                <div id="m-search" className="col-sm-5 mx-auto mt-4 pt-4">

                    <form id="searchForm" className="needs-validation" noValidate>
                        <div className="input-group mb-2">
                            <input type="text" className="form-control form-control-lg border border-primary" id="keyword"
                                name="search" placeholder="Search..." minLength="3" required="" />
                            <div className="input-group-append">
                                <button className="btn btn-primary btn-lg" type="button" onClick={onSearchClick}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <div id="search-error" className="invalid-feedback"></div>
                        </div>
                    </form>

                    <div className="col-md-12 text-center">
                        <h3 className="p-2">- or -</h3>
                        <button id="advance_search_btn"
                            className="btn btn-primary btn-lg"
                            type="button"
                            data-toggle="button"
                            style={{ display: advancedSearchActive ? "none" : "inline-block" }}
                            onClick = { onAdvancedSearchPanelToggle }>
                            Advanced Search
                        </button>
                        <button id="advance_search_btn_x"
                            className="btn btn-dark btn-lg"
                            type="button"
                            data-toggle="button"
                            style={{ display: advancedSearchActive ? "inline-block" : "none" }}
                            onClick = { onAdvancedSearchPanelToggle }>
                            <i className="fas fa-times"></i> Advanced Search
                        </button>
                    </div>
                </div>
                <div id="adv-search"
                    className="col-sm-5 mx-auto border-top mt-4"
                    style={{ display: advancedSearchActive ? "block" : "none" }}>
                    <p className="my-4"><strong>Please fill in atleast one field and hit search</strong></p>

                    <form id="advanced-searchForm" method="get" className="needs-validation" action="" noValidate>
                        <div className="form-row">
                            <div className="form-group col-md-12 mb-4">
                                <label htmlFor="firstname">First name</label>
                                <input type="text" className="form-control form-control-lg border border-primary" id="firstname"
                                    name="firstname" placeholder="First name" minLength="3" />
                                <div id="firstname-error" className="invalid-feedback"></div>
                            </div>
                            <div className="form-group col-md-12 mb-4">
                                <label htmlFor="lastname">Last name</label>
                                <input type="text" className="form-control form-control-lg border border-primary" id="lastname"
                                    name="lastname" placeholder="Last name" minLength="3" />
                                <div id="lastname-error" className="invalid-feedback"></div>
                            </div>
                            <div className="form-group col-md-7 mb-4">
                                <label htmlFor="phonenumber">Phone</label>
                                <input type="text" className="form-control form-control-lg border border-primary"
                                    id="phonenumber" name="phonenumber" placeholder="(xxx) xxx-xxxx" minLength="10"
                                    maxLength="14" />
                                <div id="phonenumber-error" className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-7 mb-4">
                                <label htmlFor="skill_1">Skill 1</label>
                                <select className="custom-select form-control-lg border-success" id="skill_1" name="skill_1" defaultValue="">
                                    <option value="">Choose...</option>
                                    <option value="developer">Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="accountant">Accountant</option>
                                    <option value="manager">Manager</option>
                                </select>
                                <div id="s1-error" className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-7 mb-4">
                                <label htmlFor="skill_2">Skill 2</label>
                                <select className="custom-select form-control-lg border-success" id="skill_2" name="skill_2" defaultValue="">
                                    <option value="">Choose...</option>
                                    <option value="developer">Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="accountant">Accountant</option>
                                    <option value="manager">Manager</option>
                                </select>
                                <div id="s2-error" className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-7 mb-4">
                                <label htmlFor="skill_3">Skill 3</label>
                                <select className="custom-select form-control-lg border-success" id="skill_3" name="skill_3" defaultValue="">
                                    <option value="">Choose...</option>
                                    <option value="developer">Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="accountant">Accountant</option>
                                    <option value="manager">Manager</option>
                                </select>
                                <div id="s3-error" className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="form-group mt-2 mb-4">
                            <div className="form-check custom-control custom-checkbox">
                                <input className="form-check-input custom-control-input" type="checkbox" value="yes"
                                    id="safetyCheck" name="safetyCheck" />
                                <label className="form-check-label custom-control-label" htmlFor="safetyCheck">
                                    Has WSIB?
                                </label>
                                <div id="checkbox-error" className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="form-group col-md-12 mb-3 mx-auto text-center">
                            <button className="btn btn-success btn-lg btn-fxw mt-3" type="button" onClick={onAdvancedSearchClick}>
                                <i className="fas fa-search"></i>&nbsp;Search
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        );
    }
}

export default AreaCoordinatorSearchComponent;
