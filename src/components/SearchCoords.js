import React from 'react';
import Button from './Button';

export default class SearchCoords extends React.Component {
  constructor() {
    super();

    this.state = {
      lon: '',
      lat: ''
    };
  }

  formClear() {
    this.setState({
      lon: '',
      lat: ''
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.formClear();
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return <form className="SearchCityCoords" onSubmit={this.handleSubmit}>
      <input className="InputClass InputCoords" id="lat" type="text" name='lat' value={this.state.lat} onChange={this.handleInputChange} placeholder='Latitude' autoComplete="off" />
      <input className="InputClass InputCoords" id="lon" type="text" name='lon' value={this.state.lon} onChange={this.handleInputChange} placeholder='Longitude' autoComplete="off" />
      <Button className="Button" type='submit'>By coordinates</Button>
    </form>
  }
}
