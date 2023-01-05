import React, { useEffect, useState } from 'react'
import "./Login.css";
import { connectMQTT, publish, getJWT } from '../../Infrastructure/PMQTTController';
import { encrypt, decrypt } from "../../utils/encryptionUtils";
import { User } from './UserType';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from './Regex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface LoginPageProps {
  pageName: string;
  user?: {
    email: string, 
    password: string
  };
}

const Login = (props: LoginPageProps) => {
  const [onLoad, setOnLoad] = useState(false);
  const SIGN_IN_REQUEST_TOPIC = 'authentication/signIn/request';
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  
  useEffect(() => { document.title = `${props.pageName} ⋅ Dentistimo` });
  
  useEffect(() => {
    try {
        connectMQTT();
    } catch (e) {
        console.log(e);
    }
  })

  const logIn = async (user: User) => {
    try {
      const encrypted_user = encrypt(user);
      publish(SIGN_IN_REQUEST_TOPIC, encrypted_user.toString());
      localStorage.clear();
      getJWT();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(logIn)}>
        <div className="wrapper">
        <header>Log in</header>
        <div>
        <input
          className="email"
          type="text"
          placeholder="Enter your email"
          {...register("email", { required: true, pattern: EMAIL_REGEX})} />
          {errors.email && <div className='form-value'>Please enter a valid email</div>}
        </div>

        <input
          className="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")} />
          {errors.email && <div className='form-value'>Please enter a valid password</div>}
            <div className="pass-txt">
            <a href="./SignUp">
              Don't have an account? Sign Up. 
              </a>
        </div>
        <ToastContainer
          position='bottom-center'
          autoClose={3000}
          draggable
          theme='colored'
          hideProgressBar
        />
            <button value="Login" type="submit"> Log in</button>
          </div>
      </form>
    ) 
}

export default Login;