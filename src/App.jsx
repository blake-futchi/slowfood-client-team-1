import React, { Component } from "react";
import DisplayMenuAndOrder from "./components/DisplayMenuAndOrder";
import LoginForm from "./components/LoginForm";
import { authenticate, register } from "./modules/authenticate";
import RegistrationForm from "./components/RegistrationForm";
import { Button, Toolbar } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import hero from './img/hero.jpg';

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    renderRegistrationForm: false
  };

  onSignIn = async e => {
    let response;
    e.preventDefault();
    if (e.target.id === "signup") {
      response = await register(
        e.target.name.value,
        e.target.email.value,
        e.target.password.value,
        e.target.confirm_password.value
      );
    } else {
      response = await authenticate(
        e.target.email.value,
        e.target.password.value
      );
    }

    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({
        message: response.message[0],
        renderRegistrationForm: false,
        renderLoginForm: false
      });
    }
  };

  render() {
    const {
      renderLoginForm,
      renderRegistrationForm,
      authenticated,
      message
    } = this.state;
    let renderLogin;
    let renderRegister;
    let renderResponse;
    let renderSignIn;

    switch (true) {
      case renderRegistrationForm && !authenticated:
        renderRegister = <RegistrationForm submitFormHandler={this.onSignIn} />;
        break;
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onSignIn} />;
        break;
      case !authenticated:
        renderSignIn = (
          <>
            <div id="img" >
            <Button modifier="large--cta"
              id="render-signup"
              onClick={() => this.setState({ renderRegistrationForm: true })}
            >
              Sign up
            </Button>

            <Button modifier="large--cta"
              id="render-login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </Button>
            <p id="message">{message}</p>
              <img src={hero} alt="fuck">
              </img> 
            </div> 
          </>
        );
        break;
      case authenticated:
        renderResponse = (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
    }
    return (
     
      <>
        <div>
          <Toolbar id="title">
          <div class="tabbar tabbar--top tabbar--material">
          <label class="tabbar__item tabbar--material__item">
    <input type="radio" name="tabbar-material-c" checked="checked"></input>
    <button class="tabbar__button tabbar--material__button">
      <div class="tabbar__label tabbar--material__label">Slowfood</div>
    </button>
  </label>
  <label class="tabbar__item tabbar--material__item">
    <input type="radio" name="tabbar-material-c" checked="checked"></input>
    <button class="tabbar__button tabbar--material__button">
      <i class="tabbar__icon tabbar--material__icon zmdi zmdi-phone"></i>
      <div class="tabbar__label tabbar--material__label">Call</div>
    </button>
  </label>

  <label class="tabbar__item tabbar--material__item">
    <input type="radio" name="tabbar-material-c"></input>
    <button class="tabbar__button tabbar--material__button">
      <i class="tabbar__icon tabbar--material__icon zmdi zmdi-favorite"></i>
      <div class="tabbar__label tabbar--material__label">Favorites</div>
    </button>
  </label>
</div>
          </Toolbar>
        </div>
        
        {renderLogin}
        {renderRegister}
        {renderResponse}
        {renderSignIn}
        {this.state.authenticated === true && <DisplayMenuAndOrder />}
      </>
    );
  }
}
export default App;
