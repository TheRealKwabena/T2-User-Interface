import { useState, useEffect } from "react";
import "../styles/SignUp.css"
import { publish, connectMQTT } from '../Infrastructure/PMQTTController';
import cryptojs from 'crypto-js';

export function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const private_key = process.env.REACT_APP_PRIVATE_KEY!;
    useEffect(() => {
      try {
          connectMQTT();
      } catch (e) {
          console.log(e);
      }
  })
  
  const createUser = async () => {
    const user = {
      jwtToken: null,
      name,
      email,
      password
    }
    const hash = cryptojs.AES.encrypt(JSON.stringify(user), private_key).toString();
    publish('authentication/signUp/request', JSON.stringify(hash))
    }
  
    return (
    <form className="SignUp-form">
      <div className="wrapper">
        <header id ="header">Sign up</header>
        <div className="input-area">
          <input type='text' id="fullname" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter your full name"/>
        </div>
        <div className="input-area">
          <input type="email" id='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email"/>
        </div>
        <div className="input-area">
          <input type="password" id='pass' placeholder="Enter your password "/>
        </div>
        <div className="input-area">
          <input type="password" id='confirm-pass' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password again"/>
        </div>
        <div className="pass-txt">
          <a href="./Login">Already have an account? click here</a>
        </div>
        <input type="submit" value="Sign up" onClick={() => createUser()}/> 
      </div>
    </form>
    )
}