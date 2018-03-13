'use strict';

import React from 'react';
import SearchForm from './SearchForm';
import Header from './Header';
import FiveDay from './FiveDay';

const Home = (props) => {
  return (
    <div>
      <div id="home">
        <p id="alexa">"Alexa, what's the weather today?"</p>
        <p id="home-text1">It's easy, but not <em>that</em> easy</p><br /><p id="home-text2">Enter your location below:</p>
      </div>
      <div id="home-search">
        <SearchForm />
      </div>
    </div>
  )
}

module.exports = Home;