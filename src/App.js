import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getTenantSchema } from "./helpers/subdomainUtility";


class App extends Component {
    render() {
        const tenantSchema = getTenantSchema();
        console.log("SCHEMA:", tenantSchema);

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
}

export default App;
