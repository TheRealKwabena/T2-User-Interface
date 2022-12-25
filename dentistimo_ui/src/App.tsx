import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Landing from './pages/Landing/Landing'
import ScrollToTop from './ScrollToTop';
import {SignUp} from "./pages/SignUp"
import UpcomingAppointments from "./components/MyAppointments/UpcomingAppointments";
import { useEffect } from "react";
import { connectMQTT } from "./Infrastructure/PMQTTController";

const App = () => {
  
  useEffect(() => {
    try {
      connectMQTT();
    } catch (e) {
      console.log('MQTT cannot connect. Please try again.');
    }
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <ScrollToTop/>
      <div style={{marginTop: '120px'}}>
        <Routes>
          <Route path="/" element={<Landing pageName={'Home'}/>}></Route>
          <Route path="/appointments" element={<Landing pageName={'Home'}/>}></Route>
          <Route path="/login" element={<Login pageName='Login'/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/myslots" element={<UpcomingAppointments/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;