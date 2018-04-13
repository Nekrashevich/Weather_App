import React from 'react';

const TIMES = [
  { time: "00:00:00", code: 0 },
  { time: "03:00:00", code: 1 },
  { time: "06:00:00", code: 2 },
  { time: "09:00:00", code: 3 },
  { time: "12:00:00", code: 4 },
  { time: "15:00:00", code: 5 },
  { time: "18:00:00", code: 6 },
  { time: "21:00:00", code: 7 }
];

const DAYTIMES = { 1: "Night", 3: "Morning", 5: "Afternoon", 7: "Evening" };

export default class ForecastDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      longtitudeWeather: '',
      latitudeWeather: '',
      countdate: '0'
    };
  }

  componentDidMount() {
    const zip = this.props.zip,
      lon = this.props.lon,
      lat = this.props.lat;

    let URL = (zip === '') ? "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + lat + "&lon=" + lon + "&APPID=3a03952b75ba92098434edd9793dd61c"
      : "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + zip + "&APPID=3a03952b75ba92098434edd9793dd61c";

    fetch(URL).then(response => response.json()).then(json => {
      this.setState({ weatherData: json });
    });

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

      const selectDate = Number(this.state.countdate);
      const countRequestDate = Number(weatherData.cnt);

      let initialTime = weatherData.list[0].dt_txt.split(' ')[1];
      let initcount;

      TIMES.map((function (times) {
        if (initialTime == times.time)
          initcount = (times.code == 7) ? 0 : times.code + 1;
      }));


      let lastTime = (8 - initcount);
      let lastDay = ((countRequestDate - lastTime) % 8 == 0) ? (countRequestDate - lastTime)
        / 8 : (Math.floor((countRequestDate - lastTime) / 8) + 1);

      //console.log(lastDay);
      //console.log(selectDate);

      let listArray = [];
      let listmin = Math.max(0, 8 * selectDate - initcount);
      let listmax = Math.min(countRequestDate - 1, 8 * selectDate + lastTime - 1);

      //console.log(initcount, listmin, listmax, countRequestDate);

      let tempinit = 1;
      if (selectDate == 0) {
        for (let i = listmax; i >= listmin; i = i - 2) {
          listArray.push({ list: i, title: DAYTIMES[i + initcount] });
        }
        listArray.reverse();
      }
      else {
        for (let i = listmin; i <= listmax; i = i + 2) {

          if (listmin == listmax) {
            listArray.push({ list: listmin, title: DAYTIMES[1] });
            break;
          }

          if (tempinit == 1)
            i++;
          listArray.push({ list: i, title: DAYTIMES[tempinit] });

          if (i == countRequestDate - 2 && i != listmax)
            listArray.push({ list: i + 1, title: DAYTIMES[tempinit + 2] });

          tempinit += 2;
        }
      }

      function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);

        let date = ((a.getDate() + '').length == 1) ? '0' + a.getDate() : '' + a.getDate();
        let hour = ((a.getHours() + '').length == 1) ? '0' + a.getHours() : '' + a.getHours();

        let time = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + date + ' ' + hour + ':00:00';
        return time;
      }

      //console.log(listArray);

      let [forecastDate,] = timeConverter(weatherData.list[listmin].dt).split(' ');

      return (
        <div className="ForecastDisplay">

          <div className="Screen ForecastHeader">

            <a className="ForecastDisplayLink LinkLeft" onClick={() => {
              this.setState({ countdate: this.state.countdate == 0 ? lastDay + "" : Number(this.state.countdate) - 1 + '' });
            }}></a>


            <a className="ForecastDisplayLink LinkRight" onClick={() => {
              this.setState({ countdate: this.state.countdate == lastDay ? "0" : Number(this.state.countdate) + 1 + '' });
            }}></a>

            <div className="ForecastHeader">
              <h1>
                Weather in {weatherData.city.name}
              </h1>

              <p className="ForecastHeaderDesc" >Possible dates for watching:<br />{timeConverter(weatherData.list[0].dt)} - {timeConverter(weatherData.list[countRequestDate - 1].dt)}</p>
              <p className="ForecastHeaderDesc" >Forecast for date: {forecastDate}</p>

            </div>

          </div>

          <div className="ForecastScreen">
            {listArray.map((display, index) => (
              <div className="ForecastScreenItem" key={index} >

                <h1 style={{ marginBottom: '10px' }}>
                  {display.title}
                </h1>
                <p> Time: {timeConverter(weatherData.list[display.list].dt).split(' ')[1]} </p>

                <p className="" style={{ marginTop: '-20px' }}>
                  {weatherData.list[display.list].weather[0].main}  &nbsp;-
                  <img className="Icon ForecastIcon" src={"https://openweathermap.org/img/w/" + weatherData.list[display.list].weather[0].icon + ".png"}
                    title={weatherData.list[display.list].weather[0].description} alt={weatherData.list[display.list].weather[0].description} />
                </p>

                <p>Average temperature: {weatherData.list[display.list].main.temp}°</p>
                <p>Pressure: {weatherData.list[display.list].main.pressure} hPa</p>
                <p>Wind Speed: {weatherData.list[display.list].wind.speed} m/s</p>
              </div>
            ))}
          </div>

        </div>
      );
    }
  }
}