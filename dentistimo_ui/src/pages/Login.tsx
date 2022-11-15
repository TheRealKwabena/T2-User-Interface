import React from 'react'
import Header from '../components/Header/Header';
import "../styles/Login.css";


export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  return (
    <form className="login-form">
    <div className="wrapper">
      <header>Log in</header>

    
        <input className ="email" type="text" 
        placeholder="Enter your email"></input>


        <input className="password" type="password"
         placeholder="Enter your password" ></input>
    

      
    <div className="pass-txt"><a href="./SignUp">
      Don't have an account? click here to sign up</a></div>
    <input type="submit" value="Login"/>
    </div>

  </form>
  )
}

export default Login;