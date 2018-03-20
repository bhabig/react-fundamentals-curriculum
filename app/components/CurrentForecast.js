'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
const Link = require('react-router-dom').Link;
import Sidebar from './Sidebar';

// const Sidebar = (props) => {
//   return (
//     <div id="current-sidebar">
//       <div id="title">
//         <p>More Weather Options</p>
//       </div>
//       <br />
//       <div id="sidebar-body">
//       <br />
//         <Link to={{
//           pathname: '/forecast/' + props.data.name + '/five-day',
//           search: '?city=' + props.data.name + '&region=' + props.data.sys.country.toLowerCase()
//         }}>
//           5 day forecast for {props.data.name}
//         </Link>
//         <br />
//         <br />
//         <Link to='/'>
//           return to home screen
//         </Link>
        
//       </div>
//     </div>
//   )
// }

const ForecastContent = (props) => {
  let rise = new Date(props.data.sys.sunrise * 1000).toString().split(' ').slice(4,5);
  let set = new Date(props.data.sys.sunset * 1000).toString().split(' ').slice(4,5);
  
  return (
    <div id="current-weather">
      <Link to={{
        pathname: '/forecast/' + props.data.name + '/five-day',
        search: '?city=' + props.data.name + '&region=' + props.data.sys.country.toLowerCase()
      }}>
        <h1><img src={"../images/weather-icons/" + props.data.weather[0].icon + ".svg"} alt="" /> {props.data.name}</h1>
      </Link>
      <br />
      <p className='data'>{new Date().toString().split(' ').slice(0, 5).join(' ')}</p>
      <p className='data'><strong style={{fontSize: "22px"}}>{props.data.weather[0].description.toUpperCase()}</strong></p>
      <br />
      <h3>Current Weather:</h3>
      <table>
        <tbody>
          <tr>
            <td>temperature:</td>
              <td>{props.data.main.temp} °F</td>
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
          <tr>
            <td>humidity:</td>
            <td>{props.data.main.humidity}%</td>
          </tr>
          <tr>
            <td>wind:</td>
            <td>{props.data.wind.speed} mph</td>
          </tr>
          <tr>
            <td>pressure:</td>
            <td>{props.data.main.pressure} hPa</td>
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
      updateCount: 0,
      invalidSearch: false
    }
  }

  componentDidMount() {
    let { currentCity, currentRegion } = api.convertPropsToLocation(this.props);

    api.currentWeather(currentCity, currentRegion, "weather")
      .then(resp => {
        this.setState(() => {
          return {
            city: currentCity,
            region: currentRegion,
            weatherSymbol: resp.data,
            updateCount: this.state.updateCount + 1,
            invalidSearch: false
          }
        })
      }).catch(resp => {
        this.setState(() => {
          return {
            invalidSearch: true
          }
        })
      })
  }

  shouldComponentUpdate() {
    let { currentCity, currentRegion } = api.convertPropsToLocation(this.props);

    if (this.state.updateCount == 0 && currentCity === this.state.city && currentRegion === this.state.region) {
      return true;
    } else {
      return currentCity !== this.state.city
    }
  }

  componentWillUpdate() {
    let { currentCity, currentRegion } = api.convertPropsToLocation(this.props);
    api.currentWeather(currentCity, currentRegion, "weather")
      .then(resp => {
        this.setState(() => {
          return {
            city: currentCity,
            region: currentRegion,
            weatherSymbol: resp.data,
            updateCount: this.state.updateCount + 1,
            invalidSearch: false
          }
        })
      }).catch(resp => {
        this.setState(() => {
          return {
            invalidSearch: true
          }
        })
      })
  }
  //can import queryString to parse instead
  

  render() {
    if (this.state.invalidSearch) {
      return (
        <div>
          <h1>We could not find this city, please try again</h1>
          <p>[ remember to format in the manner the search bar specifies ]</p>
        </div>
      )
    } else if (this.state.weatherSymbol !== '') {
    return (
      <div>
        <Sidebar data={this.state.weatherSymbol}>
          <Link to={{
            pathname: '/forecast/' + this.state.weatherSymbol.name + '/five-day',
            search: '?city=' + this.state.weatherSymbol.name + '&region=' + this.state.weatherSymbol.sys.country.toLowerCase()
          }}>
            5 day forecast for {this.state.weatherSymbol.name}
          </Link>
        </Sidebar>
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
