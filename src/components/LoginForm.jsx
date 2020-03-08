import React from 'react'
import { Toast } from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const LoginForm = ({ submitFormHandler }) => {
  return (
    <form onSubmit={submitFormHandler} id='login'>
      <Toast>
        <label>Email</label>
        <input name='email' type='email' id='email'></input>

        <label>Password</label>
        <input name='password' type='password' id='password'></input>

        <button id='submit'>Submit</button>
      </Toast>
    </form>
  );
};

export default LoginForm;