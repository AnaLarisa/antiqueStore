import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Client from './Client';
import Agent from './Agent';
import {BookProvider} from "./contexts/BookContext";

const App = () => {
  return (
      <BookProvider>
        <Router>
          <React.Fragment>
            <ul>
              <li>
                <Link to='/'>Client Home</Link>
              </li>
              <li>
                <Link to='/agent'>Agent Dashboard</Link>
              </li>
            </ul>
            <hr />
            <Route exact path='/' component={Client} />
            <Route path='/agent' component={Agent} />
          </React.Fragment>
        </Router>
      </BookProvider>
  );
}

export default App;
