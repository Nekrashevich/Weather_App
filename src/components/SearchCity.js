import React from 'react';
import Button from './Button';

export default class SearchCity extends React.Component {
  constructor() {
    super();

    this.state = {
      city: ''
    };
  }

  formClear() {
    this.setState({
      city: ''
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.city) {
      this.props.handleSubmit(this.state);

      this.formClear();
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return <form className="SearchCityForm" onSubmit={this.handleSubmit}>
      <input className="InputClass" type="text" name='city' value={this.state.city} onChange={this.handleInputChange} placeholder='City name' autoComplete="off" />

      <Button className="Button" type='submit'>By name</Button>
    </form>
  }
}
