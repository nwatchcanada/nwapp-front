// import React, { Component } from 'react';
// import { connect } from 'react-redux';
//
//
// import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
//
//
// class AssignWatchAreaCoordinatorTaskStep3Container extends Component {

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AssignWatchAreaCoordinatorTaskStep3Component from "../../../../../components/taskItems/admin/operations/assignWatchAreaCoordinator/step3Component";
import { clearFlashMessage } from "../../../../../actions/flashMessageActions";
import { pullAreaCoordinatorList } from "../../../../../actions/areaCoordinatorActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../../constants/api";
import { localStorageGetObjectItem } from '../../../../../helpers/localStorageUtility';


class AssignWatchAreaCoordinatorTaskStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const search = localStorageGetObjectItem('nwapp-task-1-areaCoordinator');

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { uuid } = this.props.match.params;

        this.state = {
            // Pagination
            page: 1,
            sizePerPage: 100,
            totalSize: 0,

            // Everything else
            uuid: uuid,
            isLoading: true,
            search: search,
        }
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onAreaCoordinatorClick = this.onAreaCoordinatorClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const search = localStorageGetObjectItem('nwapp-task-1-areaCoordinator');
        const parametersMap = new Map();
        if (search.keyword !== undefined && search.keyword !== "") {
            parametersMap.set("search", search.keyword);
        }
        if (search.firstName !== undefined && search.firstName !== "") {
            parametersMap.set("first_name", search.firstName);
        }
        if (search.lastName !== undefined && search.lastName !== "") {
            parametersMap.set("last_name", search.lastName);
        }
        if (search.telephone !== undefined && search.telephone !== "") {
            parametersMap.set("telephone", search.telephone);
        }
        if (search.email !== undefined && search.email !== "") {
            parametersMap.set("email", search.email);
        }
        console.log("FILTERING", parametersMap); // For debugging purposes only.
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.setState(
            { parametersMap: this.getParametersMapFromState(), isLoading: true, },
            ()=>{
                // STEP 3:
                // SUBMIT TO OUR API.
                this.props.pullAreaCoordinatorList(this.state.page, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        );
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

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

    onAreaCoordinatorClick(e, areaCoordinatorSlug) {
        this.setState(
            { isLoading: true },
            ()=>{
                localStorage.setItem('nwapp-task-1-areaCoordinator-slug', areaCoordinatorSlug);
                this.props.history.push("/admin/task/1/"+this.state.uuid+"/step-4");
            }
        );
    }

    onNextClick(e) {
        const page = this.state.page + 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullAreaCoordinatorList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    onPreviousClick(e) {
        const page = this.state.page - 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullAreaCoordinatorList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }



    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { uuid, page, sizePerPage, totalSize, isLoading, errors } = this.state;
        const areaCoordinators = (this.props.areaCoordinatorList && this.props.areaCoordinatorList.results) ? this.props.areaCoordinatorList.results : [];
        const hasNext = this.props.areaCoordinatorList.next !== null;
        const hasPrevious = this.props.areaCoordinatorList.previous !== null;
        return (
            <AssignWatchAreaCoordinatorTaskStep3Component
                uuid={uuid}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                areaCoordinators={areaCoordinators}
                isLoading={isLoading}
                errors={errors}
                onAreaCoordinatorClick={this.onAreaCoordinatorClick}
                hasNext={hasNext}
                onNextClick={this.onNextClick}
                hasPrevious={hasPrevious}
                onPreviousClick={this.onPreviousClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        areaCoordinatorList: store.areaCoordinatorListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAreaCoordinatorList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAreaCoordinatorList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignWatchAreaCoordinatorTaskStep3Container);
