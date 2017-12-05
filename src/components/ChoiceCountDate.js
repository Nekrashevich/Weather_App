import React from 'react';
import Button from './Button';

export default class ChoiceCountDate extends React.Component {
  constructor() {
    super();

    this.state = {
      countdate: ''

    };
  }

  formClear() {
    this.setState({
      countdate: ''

    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.countdate && this.state.countdate <= this.props.valid && 0 <= this.state.countdate) {

      this.props.handleSubmit(this.state.countdate);
      this.formClear();
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input type="text" name='countdate' value={this.state.countdate} onChange={this.handleInputChange} placeholder='Введите дату' />
      <Button type='submit'>Отправить</Button>
    </form>
  }
}

