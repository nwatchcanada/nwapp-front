
#### Chrome Extensions Required
Please download the following Chrome extensions.

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

#### Host File Setup
This project is uses ``django-tenants`` library and is setup to work with multiple domains. As a result, we will need to bind the address **workery.ca** to your ``localhost``. To do this follow these instructions.

1. Update your hosts file to support our applications domain.

  ```
  sudo vi /etc/hosts
  ```

2. Append to the file...

  ```
  127.0.0.1       public.localhost
  127.0.0.1       london.localhost
  127.0.0.1       toronto.localhost
  127.0.0.1       sub1.localhost
  127.0.0.1       sub2.localhost
  ```


3. Refresh the dns on your machine to support our new domains.

  ```
  dscacheutil -flushcache
  ```

## Usage
To run the web-app, you’ll need to run the server instance and access the page from your browser.

Start up the web-server:

  ```
  npm start
  ```
