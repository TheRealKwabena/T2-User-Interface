// code reference: https://www.freecodecamp.org/news/add-form-validation-in-react-app-with-react-hook-form/
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import "./SignUp.css"
import { publish, subscribe, connectMQTT } from '../../Infrastructure/PMQTTController';
import { encrypt, decrypt } from "../../utils/encryptionUtils";
import { User } from './UserType';
import { EMAIL_REGEX, PASSWORD_REGEX } from "./Regex";

export function SignUp(){
    const SIGN_UP_REQUEST_TOPIC = 'authentication/signUp/request';
    const SIGN_UP_RESPONSE_TOPIC = 'authentication/signUp/response';
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
  
    useEffect(() => {
      try {
          connectMQTT();
      } catch (e) {
          console.log(e);
      }
  })

  const createUser = async (user: User) => {
    try {
      const encrypted_user = encrypt(user);
      publish(SIGN_UP_REQUEST_TOPIC, encrypted_user.toString());
      alert('User created sucessfully');
      window.location.assign('/Login');
    } catch (error) {
      console.log(error);
    }
    }
  
    return (
    <form className="SignUp-form" onSubmit={handleSubmit(createUser)}>
      <div className="wrapper">
        <header id ="header">Sign up</header>
     
          <input
              id="name"
              type='text'
              placeholder="Enter your full name"
              {...register("name", { required: true, minLength: 3, maxLength: 40 })} />
              {errors.name && <div className="form-value">Name is required</div>}
        
       
          <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: EMAIL_REGEX })} />
              {errors.email && <div className="form-value">Email is required and must follow the example@domain.com template</div>}
       
       
          <input
              id="password"
              type="password"
              placeholder="Enter your password"
            //the password should include capital letters and lowercase letters. From 8 to 30 characters
              {...register("password", { required: true, minLength: 8, pattern: PASSWORD_REGEX })} />
              {errors.password && <div className="form-value">Password is required and should be more than 8 characters. It Should include at least one Capital letter, lowercase letter and a number</div>}
       
        <div className="pass-txt">
          <a href="./Login">Already have an account? click here</a>
        </div>
        <input type="submit" value="Sign up" /> 
      </div>
    </form>
    )
}