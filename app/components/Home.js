import React from 'react';
import SearchForm from './SearchForm';

const Home = (props) => {
  return (
    <div id="home">
      <p id="alexa">"Alexa, what's the weather today?"</p>
      <p id="home-text">It's easy, but not <em>that</em> easy<br /><br /> Enter your location below:</p>
      <div id="home-search">
        <SearchForm />
      </div>
    </div>
  )
}

module.exports = Home;