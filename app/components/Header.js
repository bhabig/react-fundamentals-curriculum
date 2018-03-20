'use strict';

import React from 'react';
import SearchForm from './SearchForm';
import slight_drizzle from '../img/slight_drizzle.png';

const Header = (props) => {
  return (
    <div id="header">
      <div id="img">
        <img src={slight_drizzle} alt="thermometer" />
        <p>What's The Weather?</p>
      </div>
      <div id="p">
        <p></p>
      </div>
      <div id="search">
        <SearchForm onSubmit={props.onSubmit} />
      </div>
    </div>
  )
}

module.exports = Header;