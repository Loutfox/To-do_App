import React, { Component } from "react";
import styles from "./login.module.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.Login(this.state.email, this.state.password)}
      } className={styles.login}>
            <h3>Log in</h3>
            <p className={styles.errorMessage}>{this.props.errors.email}</p>
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              placeholder="Put your email here..."
            />
            <p className={styles.errorMessage}>{this.props.errors.password}</p>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              placeholder="Put your password..."
            />
            <button type="submit">Log in</button>
            <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Login;
