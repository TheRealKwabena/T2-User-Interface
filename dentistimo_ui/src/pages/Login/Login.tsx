import React from 'react'
import Header from '../../components/Header/Header';
import "../index.css";

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  return (
    <div>
      <h1 style={{display: "flex", justifyContent: "center"}}>Login</h1>
      <form className="login-form">
        <input type="email" placeholder='Email' className="input-options" id="reg_email"/>
        <input type="password" placeholder='Password' className="input-options" id="reg_pass"/>
        <input type="button" className="input-options" value="Login" id="press-login"/>
      </form>
    </div>
  )
}

export default Login;