import React, { Component } from 'react';
import { Header, Main, Footer, Login } from './components';
import './App.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemError: "",
      userLogged: false,
      errors: {
        email: "",
        password: "",
      }
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.Login = this.Login.bind(this);
  }

  Login(email, password) {
    axios.post('api/users/login', { email, password })
      .then(response => {
        this.setState({
          userLogged: true,
        })
      })
      .catch(err => this.setState({
        errors: {
          email : err.response.data.email,
          password: err.response.data.password,
        }
      }))
  }
  deleteItem(id) {
    axios.delete('api/items/' + id)
      .then(response => this.setState({
        items: this.state.items.filter((item) => item._id !== response.data._id)
      }))
      .catch(err => console.log(err));
  }

  addItem(item) {
    axios.post('api/items', item)
      .then(response => {
        this.setState({
          items: [response.data, ...this.state.items],
          itemError: ""
        })
      })
      .catch(err => this.setState({
        itemError: err.response.data.errorName
      }));
  }
  componentDidMount() {
    axios.get('api/items')
      .then(response =>
        this.setState({
          items: response.data
        }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <Header />
        {this.state.userLogged ?
          <Main items={this.state.items} deleteItem={this.deleteItem} addItem={this.addItem} itemError={this.state.itemError} />
          : <Login Login={this.Login} errors={this.state.errors} />}
        <Footer />
      </>
    );
  }
}

export default App;
