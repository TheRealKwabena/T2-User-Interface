import { useState } from "react";
import  "../styles/SignUp.css"

export function SignUp(){
    const [name, setName] = useState('');

    return (
    <form className="SignUp-form">
      <div className="wrapper">
        <header id ="header">Sign up</header>
        <div className="input-area">
          <input type='text' id="fullname" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter your full name"/>
        </div>
        <div className="input-area">
          <input type="email" id='email' placeholder="Enter your email"/>
        </div>
        <div className="input-area">
          <input type="phone" id='phone' placeholder="Enter your phone number"/>
        </div>
        <div className="input-date">
          <input type="date" id='dob' placeholder="Choose a date "/>
        </div>
        <div className="input-area">
          <input type="password" id='pass' placeholder="Enter your password "/>
        </div>
        <div className="input-area">
          <input type="password" id='confirm-pass' placeholder="Enter your password again"/>
        </div>
        <div className="pass-txt">
          <a href="./Login">Already have an account? click here</a>
        </div>
        <input type="submit" value="Sign up"/> 
      </div>
    </form>
    )
}