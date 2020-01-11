import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAreaCoordinatorCreateStep1Component from "../../../../components/areaCoordinators/admin/create/adminCreateStep1Component";
import { validateSearchInput } from "../../../../validators/areaCoordinatorValidator";
import { localStorageSetObjectOrArrayItem } from '../../../../helpers/localStorageUtility';


class AdminAreaCoordinatorCreateStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props)
        this.state = {
            keyword: "",
            advancedSearchActive: false,
            firstName: "",
            lastName: "",
            telephone: "",
            email: "",
            errors: {},
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onAdvancedSearchPanelToggle = this.onAdvancedSearchPanelToggle.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onAdvancedSearchClick = this.onAdvancedSearchClick.bind(this);
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */
	handleKeyDown(e) {

		if (e.keyCode === 13) {
			this.setState({ advancedSearchActive: false, }, ()=> {
				// Perform areaCoordinator-side validation.
				const { errors, isValid } = validateSearchInput(this.state);

				// CASE 1 OF 2: Validation passed successfully.
				if (isValid) {

                    localStorageSetObjectOrArrayItem('nwapp-areaCoordinator-add-search', this.state);
                    this.props.history.push("/admin/area-coordinators/add/step-2");


				// CASE 2 OF 2: Validation was a failure.
				} else {
					this.setState({ errors: errors });

					// The following code will cause the screen to scroll to the top of
					// the page. Please see ``react-scroll`` for more information:
					// https://github.com/fisshy/react-scroll
					var scroll = Scroll.animateScroll;
					scroll.scrollToTop();
				}
			});
		}
	}

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
    }

    onAdvancedSearchPanelToggle() {
        this.setState({ advancedSearchActive: !this.state.advancedSearchActive });
    }

    onSearchClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({ advancedSearchActive: false, }, ()=> {
            // Perform areaCoordinator-side validation.
            const { errors, isValid } = validateSearchInput(this.state);

            // CASE 1 OF 2: Validation passed successfully.
            if (isValid) {

                localStorageSetObjectOrArrayItem('nwapp-areaCoordinator-add-search', this.state);
                this.props.history.push("/admin/area-coordinators/add/step-2");


            // CASE 2 OF 2: Validation was a failure.
            } else {
                this.setState({ errors: errors });

                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
        });
    }

    onAdvancedSearchClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({ advancedSearchActive: true, }, ()=> {
            // Perform areaCoordinator-side validation.
            const { errors, isValid } = validateSearchInput(this.state);

            // CASE 1 OF 2: Validation passed successfully.
            if (isValid) {

                localStorageSetObjectOrArrayItem('nwapp-areaCoordinator-add-search', this.state);
                this.props.history.push("/admin/area-coordinators/add/step-2");


            // CASE 2 OF 2: Validation was a failure.
            } else {
                this.setState({ errors: errors });

                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminAreaCoordinatorCreateStep1Component
                keyword={this.state.keyword}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                telephone={this.state.telephone}
                email={this.state.email}
                onTextChange={this.onTextChange}
                advancedSearchActive={this.state.advancedSearchActive}
                onAdvancedSearchPanelToggle={this.onAdvancedSearchPanelToggle}
                onSearchClick={this.onSearchClick}
				handleKeyDown={this.handleKeyDown}
                onAdvancedSearchClick={this.onAdvancedSearchClick}
                errors={this.state.errors}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAreaCoordinatorCreateStep1Container);
