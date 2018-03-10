'use strict';

import React from 'react';
import SearchForm from './SearchForm';
import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (location) {
    this.setState(() => {
      return {
        x: ''
      }
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div id="home">
          <p id="alexa">"Alexa, what's the weather today?"</p>
          <p id="home-text1">It's easy, but not <em>that</em> easy</p><br /><p id="home-text2">Enter your location below:</p>
          <div id="home-search">
            <SearchForm />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Home;