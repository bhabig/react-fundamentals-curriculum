const token = '3bee2f7e1f3337ee96d113b51dd8fa06';
import axios from 'axios';

const propsToLocation = props => {
  let arr = props.history.location.search.split('&');
  let city = arr[0].split('=')[1];
  let region = arr[1].split('=')[1];

  if (['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MA', 'MD', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].includes(region.toUpperCase()))
    region = "us";

  return {
    currentCity: city,
    currentRegion: region
  };
}

const getCurrentWeather = (city, stateOrCountry, type) => {
  return axios.get('https://api.openweathermap.org/data/2.5/' + type + '?q=' + city + ',' + stateOrCountry + '&units=imperial&mode=json&appid=' + token)
}

module.exports = {
  currentWeather: (city, stateOrCountry, type) => getCurrentWeather(city, stateOrCountry, type),
  convertPropsToLocation: props => propsToLocation(props),
  convertPropsToLocationFiveDay: props => propsToLocation(props)
}