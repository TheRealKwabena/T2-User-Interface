// code reference: https://www.freecodecamp.org/news/add-form-validation-in-react-app-with-react-hook-form/
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import "./SignUp.css"
import { publish, subscribe, connectMQTT } from '../../Infrastructure/PMQTTController';
import { encrypt, decrypt } from "../../utils/encryptionUtils";
import { User } from './UserType';

export function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const SIGN_UP_REQUEST_TOPIC = 'authentication/signUp/request';
    const SIGN_UP_RESPONSE_TOPIC = 'authentication/signUp/response';
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    //regex for email that states that email can contain letters, numbers before @,letters and numbers after and letters after .
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
    useEffect(() => {
      try {
          connectMQTT();
      } catch (e) {
          console.log(e);
      }
  })


  const createUser = async (user: Object) => {
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
        <div className="input-area">
            <input
              type='text'
              id="fullname"
              placeholder="Enter your full name"
              {...register("name", { required: true, minLength: 3, maxLength: 40 })} />
              {errors.name && <div className="form-value">Name is required and should not exceed 15 characters</div>}
        </div>
        <div className="input-area">
            <input
              type="email"
              id='email'
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: EMAIL_REGEX })} />
              {errors.email && <div className="form-value">Email is required and must follow the example@domain.com template</div>}
        </div>
        <div className="input-area">
          <input type="password" id='pass' placeholder="Enter your password "/>
        </div>
        <div className="input-area">
            <input
              type="password"
              placeholder="Enter your password again"
            //the password should include capital letters and lowercase letters. From 8 to 30 characters
              {...register("password", { required: true, minLength: 8, pattern: PASSWORD_REGEX })} />
              {errors.password && <div className="form-value">Password is required and should be more than 8 characters. It Should include at least one Capital letter, lowercase letter and a number</div>}
        </div>
        <div className="pass-txt">
          <a href="./Login">Already have an account? click here</a>
        </div>
        <input type="submit" value="Sign up" /> 
      </div>
    </form>
    )
}