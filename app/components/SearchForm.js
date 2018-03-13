'use strict';

import React from 'react';
import { Redirect } from 'react-router'

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      city: '',
      region: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.formatLocation = this.formatLocation.bind(this);
  }

  handleChange(e) {
    let loc = e.target.value;
    this.setState(() => {
      return {
        location: loc
      }
    })
  }

  formatLocation(e) {
    e.preventDefault();

    let [currentCity, currentCountry] = this.state.location.split(', ');

    this.setState(() => {
      return {
        city: currentCity,
        region: currentCountry
      }
    })
  }

  render() {
    return (
      <div id="search-form">
        <form onSubmit={this.formatLocation}>
          <input 
            id="text-entry"
            type="text" 
            placeholder="City, State (if US) or Country (if int'l)" 
            onChange={this.handleChange} 
          />
          <input
            id="submit"
            type="image"
            src="/app/images/mag.png"
          />
        </form>
        {(this.state.city !== '' && this.state.region !== '') &&
          <Redirect to={{
            pathname: '/forecast',
            search: `?city=${this.state.city}&region=${this.state.region}`
          }} />
        }
      </div>
    )
  }
}