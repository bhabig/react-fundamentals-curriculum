'use strict';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import CurrentForecast from './CurrentForecast';
import FiveDay from './FiveDay';
import Header from './Header';

const App = (props) => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/forecast" component={CurrentForecast} />
          <Route path="/forecast/:location/five-day" component={FiveDay} />
          <Route render={() => {
            return (
              <div className="four-o-four">
                <h1>404</h1>
                <h3>Page not found...</h3>
              </div>
            )
          }} />
        </Switch>
      </div>
    </Router>
  )
}
module.exports = App;
