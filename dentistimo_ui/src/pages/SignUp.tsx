
import  "../styles/SignUp.css"


export function SignUp(){


    return (
    <form className="SignUp-form">
  
   <div className="wrapper">
    <header id ="header" > Sign up</header>
    
      
        <div className="input-area">
          <input className="fullname" placeholder="Enter your full name"/>
        </div>


        <div className="input-area">
          <input type="email" placeholder="Enter your email"/>
      </div>

      <div className="input-area">
          <input type="phone" placeholder="Enter your phone number"/>
      </div>
      <div className="input-date">
          <input type="date" placeholder="Choose a date "/>
      </div>

      <div className="input-area">
          <input type="password" placeholder="Enter your password "/>
      </div>
      <div className="input-area">
          <input type="password" placeholder="Confirm your"/>
      </div>

      <div className="pass-txt"> <a href="./Login">Already have an account? click here</a></div>

      <input type="signup" value="Sign up"/>
      
      
      </div>

    </form>
    )
}