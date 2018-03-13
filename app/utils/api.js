const token = '3bee2f7e1f3337ee96d113b51dd8fa06';
import axios from 'axios';

const getCurrentWeather = (city, stateOrCountry) => {
  return axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + stateOrCountry + '&mode=json&appid=7ee3bd3e17921a21a06a8bc1626e7f26')
}

module.exports = {
  currentWeather: (city, stateOrCountry) => getCurrentWeather(city, stateOrCountry)
}