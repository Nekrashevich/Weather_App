import React from 'react';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';
import HelloThere from './HelloThere';

export default (props) => {

  return <div className="CommonDisplay">
    {(props.code[0] == '0') ? <HelloThere /> : ''}
    {(props.code[0] == '1') ? <WeatherDisplay zip={props.zip} lon={props.lon} lat={props.lat} /> : ''}
    {(props.code[0] == '2') ? <ForecastDisplay zip={props.zip} lon={props.lon} lat={props.lat} /> : ''}
  </div>
};  