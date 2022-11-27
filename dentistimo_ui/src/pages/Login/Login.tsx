import React, { useEffect, useState } from 'react'
import "../../styles/Login.css";

interface LoginPageProps {
  pageName: string;
}

const Login = (props:LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {document.title = `${props.pageName.toString()} ⋅ Dentistimo`});

  return (
      <form className="login-form" onSubmit={() => {}}>
        <div className="wrapper">
          <header>Log in</header>    
            <input className ="email" type="text" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            <input className="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            <div className="pass-txt">
              <a href="./SignUp">
              Don't have an account? Sign Up. 
              </a>
            </div>
            <input type="submit" value="Login"/>
        </div>
      </form>
    ) 
}

export default Login;