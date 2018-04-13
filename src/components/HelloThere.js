import React from 'react';

export default () => {

  return <div className="Screen HelloThereScreen">
    <p className="Welcome">Welcome to Meteoscreen Application!</p>
    <p>This application is the prototype of the developed Restmanager Application.</p>

    <p>You can use implementation of search functionality for current weather
      <br /> and its forecast for next 5 days at this stage.
      <br />Place can be set in two ways: by specifying the name of the city or its coordinates.
      <br />Yandex map is entered for convenience of a choice coordinates.</p>

    <p>Thanks for using our application!</p>
    <p> Sincerely, Meteoscreen Application Development Team.</p>
    <img src='sun.png' alt="sun"></img>
  </div>
};  