import React, { Component } from 'react';
import './App.css';
import $ from './jquery.min.js';
import SearchCity from './components/SearchCity.js';
import SearchCoords from './components/SearchCoords.js';
import CommonDisplay from './components/CommonDisplay.js';



const DISPLAYS = [
  { name: "Welcome", code: "0" },
  { name: "Current Weather", code: "1" },
  { name: "Forecast Weather", code: "2" }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 'Moscow',
      longitude: '',
      latitude: '',
      code: "0",
      searchVisible: false
    };
  }

  handleSubmitCity = (searchcity) => {
    this.setState({ activePlace: searchcity.city + "" });
  };

  handleSubmitCoords = (searchcoords) => {
    let sum_lol = searchcoords.lon + searchcoords.lat,
      searchcoordslat = searchcoords.lat,
      searchcoordslon = searchcoords.lon;

    if (!sum_lol) {
      let inplon = $('#lon').val() + '',
        inplat = $('#lat').val() + '';

      if (!inplon && !inplat) return;
      sum_lol = inplon + inplat;
      searchcoordslat = inplat;
      searchcoordslon = inplon;
    }

    this.setState({ activePlace: sum_lol + '.', longitude: searchcoordslon, latitude: searchcoordslat });
  }

  render() {
    const activePlace = this.state.activePlace;
    let visible = this.state.code;
    let searchVisible = this.state.searchVisible;
    return (
      <div className="App">
        <div className="App-Nav">
          <div className="Nav">
            <img className="NavIcon" src="sun.png" alt="sun"></img>
            {DISPLAYS.map((display, index) => (
              <a className={'NavLink ' + ((visible === DISPLAYS[index].code) ? 'NavLink-Active' : '')}
                key={display.name}
                onClick={() => {

                  /* function getRandomInt(min, max) {
                     return Math.floor(Math.random() * (max - min)) + min;
                   }
 
                   $(".NavLink").click(function () {
 
                     let url = getRandomInt(1, 13);
                     $('.wrap').css({
                       "background": 'url("img/img/' + url + '-min.jpg")',
                       "background-repeat": "no-repeat",
                       "background-size": "cover"
                     })
 
                   });*/

                  if (display.code === '0') {
                    $('#map')[0].style.display = "none";
                    this.setState({ code: display.code, searchVisible: false });
                  }
                  else {
                    this.setState({ code: display.code, searchVisible: true });
                    $('#map')[0].style.display = "block";
                  }
                }}
              >
                {display.name}
              </a>
            ))}</div>
        </div>
        <div className="App-Content">

          <CommonDisplay zip={activePlace} key={activePlace} lon={this.state.longitude} lat={this.state.latitude} code={this.state.code} />

          {(searchVisible === true) ? <div className="SearchForm">
            <span className="SearchFormSpan">Search:</span>
            <SearchCity handleSubmit={this.handleSubmitCity} />
            <SearchCoords handleSubmit={this.handleSubmitCoords} />
          </div> : ''}
        </div>
      </div>
    );
  }
}

export default App;
