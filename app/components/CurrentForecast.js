'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

const Sidebar = (props) => {
  return (
    <div id="current-sidebar">
      <h1>{props.data.name + ", " + props.data.sys.country}</h1>
    </div>
  )
}

const ForecastContent = (props) => {
  return (
    <div id="current-weather">
      <h1><img src={"/app/images/weather-icons/" + props.data.weather[0].icon + ".svg"} alt="" /></h1>
      <p>{"Longitude: " + props.data.coord.lon + ', Latitude: ' + props.data.coord.lat}</p>
      <table>

      </table>
    </div>
  )
}

export default class CurrentForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      region: '',
      weatherSymbol: '',
      updateCount: 0,
      onRender: null
    }
  }

  componentDidMount() {
    let { currentCity, currentRegion } = this.convertPropsToLocation(this.props);

    api.currentWeather(currentCity, currentRegion)
      .then(resp => {
        this.setState(() => {
          return {
            city: currentCity,
            region: currentRegion,
            weatherSymbol: resp.data,
            updateCount: this.state.updateCount + 1
          }
        })
      })
  }

  shouldComponentUpdate() {
    let { currentCity, currentRegion } = this.convertPropsToLocation(this.props);

    if (this.state.updateCount == 0 && currentCity === this.state.city && currentRegion === this.state.region) {
      return true;
    } else {
      return currentCity !== this.state.city
    }
  }

  componentWillUpdate() {
    let { currentCity, currentRegion } = this.convertPropsToLocation(this.props);
    api.currentWeather(currentCity, currentRegion)
      .then(resp => {
        this.setState(() => {
          return {
            city: currentCity,
            region: currentRegion,
            weatherSymbol: resp.data,
            updateCount: this.state.updateCount + 1
          }
        })
      })
  }
  //can import queryString to parse instead
  convertPropsToLocation(props) {
    let arr = props.history.location.search.split('&');
    let city = arr[0].split('=')[1];
    let region = arr[1].split('=')[1];

    if(['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MA', 'MD', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH','OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].includes(region.toUpperCase()))
      region = "us";

      return {
        currentCity: city,
        currentRegion: region
      };
  }

  render() {
    if (this.state.weatherSymbol !== '') {
    return (
      <div>
        <Sidebar data={this.state.weatherSymbol} />
        <ForecastContent data={this.state.weatherSymbol} />
      </div>
    )} else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}
