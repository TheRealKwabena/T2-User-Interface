import React, { useEffect, useState } from 'react'
import "./Login.css";
import { connectMQTT, publish, getJWT } from '../../Infrastructure/PMQTTController';
import { encrypt, decrypt } from "../../utils/encryptionUtils";
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

interface LoginPageProps {
  pageName: string;
  user?: {
    email: string, 
    password: string
  };
}

const Login = (props: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onLoad, setOnLoad] = useState(false);
  const SIGN_IN_REQUEST_TOPIC = 'authentication/signIn/request';

  const loggedIn = {
    email: email,
    password: password
  }

  useEffect(() => { document.title = `${props.pageName} ⋅ Dentistimo` });
  
  useEffect(() => {
    try {
        connectMQTT();
    } catch (e) {
        console.log(e);
    }
  })

  const logIn = async () => {
    try {
      const encrypted_user = encrypt(loggedIn);
      publish(SIGN_IN_REQUEST_TOPIC, encrypted_user.toString());
      localStorage.clear();
      getJWT();
      if (localStorage.getItem('TOKEN') == null || localStorage.getItem('TOKEN') == undefined) {
        setOnLoad(true);
      } else {
        setOnLoad(false);
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form className="login-form" onSubmit={function( event ) {
      event.preventDefault();
    }}>
        <div className="wrapper">
        <header>Log in</header>
            <input className ="email" type="text" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            <input className="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            <div className="pass-txt">
            <a href="./SignUp">
              Don't have an account? Sign Up. 
              </a>
            </div>
            <button value="Login" onClick={() => { logIn() }}> Log in</button>
              <div id='loading-screen' style={onLoad ? { display: 'contents'} : {display: 'none'}}>
                  <LoadingScreen />
              </div>
          </div>
      </form>
    ) 
}

export default Login;