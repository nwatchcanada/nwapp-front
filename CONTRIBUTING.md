# Contributing to Neigbhourhood Watch App

## Do you have questions about the source code?

* Ask any question about how to use Neigbhourhood Watch App in the [nwl-app mailing list](https://groups.google.com/forum/#!forum/nwl-app).

## Do you intend to add a new feature or change an existing one?
* Suggest your change in the [nwl-app mailing list](https://groups.google.com/forum/#!forum/nwl-app). and start writing code.

* Do not open an issue on GitHub until you have collected positive feedback about the change. GitHub issues are primarily intended for bug reports and fixes.

## What libraries does this project use?
Here are the libraries that this project utilizes, please update this list as
new libraries get added.

```bash
npm install --save prop-types
npm install --save classnames
npm install --save validator
npm install --save react-router-dom
npm install --save lodash
npm install --save axios
npm install --save redux
npm install --save react-redux
npm install --save redux-devtools-extension
npm install --save redux-thunk
npm install --save humps
npm install --save react-datepicker
npm install --save react-select
npm install --save react-scroll
npm install --save shortid
npm install --save moment
npm install --save moment-timezone
npm install --save react-moment
npm install --save recharts
npm install --save react-custom-scrollbars
npm install --save react-country-region-selector
npm install --save pace-js pace
npm install --save react-to-print
npm install --save react-scroll-up-button
npm install --save react-modal
npm install --save react-spinners
npm install --save msgpack-lite
npm install --save react-dropzone
npm install --save react-number-format
npm install --save react-bootstrap-table-next
npm install --save react-bootstrap-table2-paginator
```

## What ``Chrome Plugins`` should I use?

1. [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

2. [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)


## What coding conventions should I use?

1. Please use [container-component pattern](https://medium.com/@learnreact/container-components-c0e67432e005) when creating new pages / views / etc.

2. In the container, please add the following comments to help organization. The following is an example of how it should be organized:

    ```javascript
    import React from 'react';
    import { connect } from 'react-redux';

    import RegisterSuccessComponent from '../../../components/account/register/registerSuccessComponent';


    class RegisterSuccessContainer extends React.Component {

        /**
         *  Initializer
         *------------------------------------------------------------
         */

        /**
         *  Utility
         *------------------------------------------------------------
         */

        /**
         *  Component Life-cycle Management
         *------------------------------------------------------------
         */

        /**
         *  API callback functions
         *------------------------------------------------------------
         */

        /**
         *  Event handling functions
         *------------------------------------------------------------
         */

        /**
         *  Main render function
         *------------------------------------------------------------
         */

        componentDidMount() {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
        }

        render () {
            return (
                <RegisterSuccessComponent />
            )
        }
    }

    const mapStateToProps = function(store) {
        return {
            user: store.userState
        };
    }

    const mapDispatchToProps = dispatch => {
        return {

        }
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterSuccessContainer);
    ```

3. Please use ``camelCase`` text for all javascript code and use ``snake_case`` text when dealing with our API.

4. Please ue 4 line white characters for a 1 single tab.

5. When using ``localStorage`` please add the ``nwapp`` namespace to every key name.
