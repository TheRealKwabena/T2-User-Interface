import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Dentistries from "./pages/Dentistries/Dentistries";
import MyAppointments from "./components/myAppointments/UpcomingAppointments";
import Landing from './pages/Landing/Landing'
import ScrollToTop from './ScrollToTop';
import {SignUp} from "./pages/SignUp"
import UpcomingAppointments from "./components/myAppointments/MyAppointments";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
     <UpcomingAppointments></UpcomingAppointments>
    </BrowserRouter>
  );
};

export default App;
