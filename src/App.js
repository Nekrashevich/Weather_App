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
      activePlace: '',
      longitude: '37.60121895979869',
      latitude: '55.739857437567906',
      code: "0",
      searchVisible: false
    };
  }

  handleSubmitCity = (searchcity) => {
    this.setState({ activePlace: searchcity.city });
  };

  handleSubmitCoords = (searchcoords) => {
    let slat = searchcoords.lat,
      slon = searchcoords.lon;

    if (!slat || !slon) {
      let inplon = $('#lon').val() + '',
        inplat = $('#lat').val() + '';

      if (!inplon || !inplat) return;
      slat = inplat;
      slon = inplon;
    }

    this.setState({ activePlace: '', longitude: slon, latitude: slat });
  };

  render() {
    const activePlace = this.state.activePlace;
    const key = activePlace + 'lon' + this.state.longitude + 'lat' + this.state.latitude;

    let activeLink = this.state.code;
    let searchVisible = this.state.searchVisible;
    return (
      <div className="App">
        <div className="App-Nav">
          <div className="Nav">
            <img className="NavIcon" src="sun.png" alt="sun"></img>
            {DISPLAYS.map((display, index) => (
              <a className={'NavLink ' + ((activeLink === DISPLAYS[index].code) ? 'NavLink-Active' : '')}
                key={display.name}
                onClick={() => {
                  $('#map')[0].style.display = display.code === '0' ? "none" : "block";
                  this.setState({ code: display.code, searchVisible: display.code === '0' ? false : true });
                }}>
                {display.name}
              </a>
            ))}</div>
        </div>
        <div className="App-Content">

          <CommonDisplay zip={activePlace} key={key} lon={this.state.longitude} lat={this.state.latitude} code={this.state.code} />

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
