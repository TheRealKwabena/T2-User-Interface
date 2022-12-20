import { useState, useEffect } from "react";
import "./SignUp.css"
import { publish, connectMQTT } from '../../Infrastructure/PMQTTController';
import { encrypt, decrypt } from "../../utils/encryptionUtils";

export function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      try {
          connectMQTT();
      } catch (e) {
          console.log(e);
      }
  })
  
  const createUser = async () => {
    const user = {
      name: name,
      email: email,
      password: password
    }

    const encrypted_user = encrypt(user);

    publish('authentication/signUp/request', encrypted_user.toString());
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