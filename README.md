# Neighbourhood Watch Frontend
[![Documentation Status](https://readthedocs.org/projects/nwapp-docs/badge/?version=latest)](https://nwapp-docs.readthedocs.io/en/latest/?badge=latest)

TODO: Add description.

## Installation

1. Clone this project by running the following command.

    ```bash
    git clone https://github.com/nwatchcanada/nwapp-front.git
    cd nwapp-front
    ```

2. Intall the dependent libraries.

    ```bash
    npm install
    ```

3. (OPTIONAL) If you are using [Google Chrome](https://www.google.com/chrome/) web-browser, Please download the following **Chrome extensions** to assist you in your development.

    * [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
    * [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
    * [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

4. This project is uses subdomains to seperate tenants. As a result, we will need to bind a few subdomains to your ``hosts`` file. To do this follow these instructions.

5. Update your hosts file to support our applications domain.

    ```bash
    sudo vi /etc/hosts
    ```

6. Append to the file...

    ```text
    127.0.0.1       public.localhost
    127.0.0.1       london.localhost
    127.0.0.1       toronto.localhost
    127.0.0.1       sub1.localhost
    127.0.0.1       sub2.localhost
    ```


7. Refresh the dns on your machine to support our new domains.

    ```bash
    dscacheutil -flushcache
    ```

8. (OPTIONAL) You can override the environment variables if you like. Simply copy the current file and change according to your specs.

    ```bash
    cp .env .env.local
    ```

9. (OPTIONAL) Edit your environment variables file to your specification.

    ```bash
    vi .env.local
    ```

10. You are now setup!


## Usage
To run the web-app, you’ll need to run the server instance and access the page from your browser.

Start up the web-server:

  ```
  npm start
  ```


## License
This library is licensed under the **BSD** license. See [LICENSE](LICENSE) for more information.


## Contact

Do you have any questions? Join our [nwl-app mailing list](https://groups.google.com/forum/#!forum/nwl-app) and ask your questions there.
