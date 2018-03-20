'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
const Link = require('react-router-dom').Link;
import Sidebar from './Sidebar';
import img from '../utils/img';

const SingleDay = props => {
  return (
      <tr>
        <td><img style={{height: "30px", width: "45px"}}src={img[props.data.weather[0].icon]} alt=""/></td>
      <td>{new Date(props.data.dt * 1000).toString().split(' ').slice(0,5).join(' ')}</td>
        <td>{props.data.weather[0].description}</td>
        <td>{Math.round(props.data.main.temp * 1)} °F</td>
        {props.data.clouds ?
          <td>{Math.round(props.data.clouds.all * 100) / 100}%</td> :
          <td> - - </td>
        }
        {(props.data.rain && props.data.rain['3h']) ?
          <td>{Math.round(props.data.rain['3h'] * 100) / 100}"</td> :
          <td> - - </td>
        }
        {(props.data.snow && props.data.snow['3h']) ?
          <td>{Math.round(props.data.snow['3h'] * 100) / 100}"</td> :
          <td> - - </td>
        }
      <td>{Math.round(props.data.main.humidity * 100) / 100}%</td>
      </tr>
  )
}

const FiveDayContent = props => {
  const days = props.data.list.map(day => {
    return (
      <SingleDay key={day.dt} data={day} />
    )
  })
  return (
    <div id='current-weather'>
      <h1>
        {props.data.city.name}
      </h1>
      <div>
        <table id="five-table">
          <tbody>
            <tr>
              <th></th>
              <th>day/time</th>
              <th>description</th>
              <th>temp</th>
              <th>clouds</th>
              <th>rain</th>
              <th>snow</th>
              <th>humidity</th>
            </tr>
            {days}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default class FiveDay extends React.Component {
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
    let { currentCity, currentRegion } = api.convertPropsToLocationFiveDay(this.props);

    api.currentWeather(currentCity, currentRegion, "forecast")
      .then(resp => {
        this.setState(() => {
          return {
            city: currentCity,
            region: currentRegion,
            weatherSymbol: resp.data,
            updateCount: this.state.updateCount + 1
          }
        })
      });
  }

  render() {
    if (this.state.updateCount === 0 && this.state.weatherSymbol === '') {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Sidebar data={this.state.weatherSymbol}>
            <Link to={{
              pathname: '/forecast',
              search: `?city=${this.state.city}&region=${this.state.region}&units=imperial`
            }}>
              Current weather in {this.state.city}
            </Link>
          </Sidebar>
          <FiveDayContent data={this.state.weatherSymbol} />
        </div>
      )
    }
  }
}
