'use strict';

import React from 'react';
import PropTypes from 'prop-types';
const Link = require('react-router-dom').Link;

const Sidebar = (props) => {
  return (
    <div id="current-sidebar">
      <div id="title">
        <p>More Weather Options</p>
      </div>
      <br />
      <div id="sidebar-body">
        <br />
        {props.children}
        <br />
        <br />
        <Link to='/'>
          return to home screen
        </Link>

      </div>
    </div>
  )
}

module.exports = Sidebar;