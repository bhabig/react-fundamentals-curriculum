'use strict';

import React from 'react';
import { Redirect } from 'react-router';
import mag from '../img/mag.png';

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
    this.resetState = this.resetState.bind(this);
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
    }, this.resetState)
  }

  resetState() {
    this.setState(() => {
      return {
        location: '',
        city: '',
        region: ''
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
            src={mag}
          />
        </form>
        {/* only redirect when form is submitted somehow */}
        {(this.state.city !== '' && this.state.region !== '') &&
          <Redirect to={{
            pathname: '/forecast',
            search: `?city=${this.state.city}&region=${this.state.region}&units=imperial`
          }} />
        }
      </div>
    )
  }
}
