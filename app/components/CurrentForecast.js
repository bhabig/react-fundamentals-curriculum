'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
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
        <Link to={{
          pathname: '/forecast/' + props.data.name + '/five-day',
          search: '?city=' + props.data.name
        }}>
          5 day forecast for {props.data.name}
        </Link>
        <br />
        <br />
        <Link to='/'>
          return to home screen
        </Link>
        
      </div>
    </div>
  )
}

const ForecastContent = (props) => {
  let rise = new Date(props.data.sys.sunrise * 1000).toString().split(' ').slice(4,5);
  let set = new Date(props.data.sys.sunset * 1000).toString().split(' ').slice(4,5);
  debugger;
  return (
    <div id="current-weather">
      <h1><img src={"/app/images/weather-icons/" + props.data.weather[0].icon + ".svg"} alt="" /> {props.data.name}</h1><br />
      <p className='data'><strong>{props.data.weather[0].description}</strong></p>
      <p className='data'>{new Date().toString().split(' ').slice(0, 5).join(' ')}</p>
      <br />
      <table>
        <thead>
          <tr>
            <td>Weather right now:</td>
            <td>  </td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>temperature:</td>
            <td>{props.data.main.temp} °F</td>
        </tr>
        <tr>
          <td>humidity:</td>
          <td>{props.data.main.humidity}%</td>
        </tr>
        <tr>
          <td>wind:</td>
          <td>{props.data.wind.speed} mph</td>
        </tr>
        <tr>
          <td>sunrise:</td>
          <td>{rise}</td>
        </tr>
        <tr>
          <td>sunset:</td>
          <td>{set}</td>
        </tr>
        <tr>
          <td>latitude:</td>
          <td>{props.data.coord.lat}</td>
        </tr>
        <tr>
          <td>longitude:</td>
          <td>{props.data.coord.lon}</td>
        </tr>
        {props.data.clouds &&
          <tr>
            <td>clouds:</td>
            <td>{props.data.clouds.all}%</td>
        </tr>}
          {props.data.rain &&
            <tr>
              <td>rain:</td>
              <td>{props.data.rain} inches</td>}
            </tr>}
          {props.data.snow &&
            <tr>
              <td>snow:</td>
              <td>{props.data.snow} inches</td>}
            </tr>}
        </tbody>
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
      updateCount: 0
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
