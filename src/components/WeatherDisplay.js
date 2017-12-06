import React from 'react';

export default class WeatherDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      longtitudeWeather: '',
      latitudeWeather: ''/*,
      zip: 'London'*/
    };
  }

  componentDidMount() {
    const zip = this.props.zip,
      lon = this.props.lon,
      lat = this.props.lat;
    let URL,
      cnt = zip.indexOf('.');

    /*this.setState({ zip: this.props.zip });*/
    if (cnt != -1) {
      URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + lon + "&APPID=3a03952b75ba92098434edd9793dd61c";
    }
    else {
      URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + zip + "&APPID=3a03952b75ba92098434edd9793dd61c";

    }
    fetch(URL).then(response => response.json()).then(json => {
      this.setState({ weatherData: json });
    });

    //  <p>dt: {weatherData.dt}°</p>
  }
  render() {
    const weatherData = this.state.weatherData;

    if (!weatherData) return <div className="Screen"></div>;
    if (weatherData.cod != 200)
      return (
        <div className="Screen">
          Error - HTTP status code: {weatherData.cod}
        </div>
      );
    else {
      const weather = weatherData.weather[0];
      const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
      return (
        <div className="Screen">
          <h1>
            {weather.main} in {weatherData.name} -
            <img className="Icon" src={iconUrl} alt={weatherData.description} />
          </h1>
          <p>Current temperature: {weatherData.main.temp}°</p>
          <p>High temperature: {weatherData.main.temp_max}°</p>
          <p>Low temperature: {weatherData.main.temp_min}°</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      );
    }
  }
}