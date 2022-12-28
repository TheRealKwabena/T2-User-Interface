import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Authentication/Login";
import Dentistries from "./pages/Dentistries/Dentistries";
import Landing from './pages/Landing/Landing'
import ScrollToTop from './ScrollToTop';
import {SignUp} from "./pages/Authentication/SignUp"
const token = localStorage.getItem('TOKEN');

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <ScrollToTop/>
      <div style={{marginTop: '120px'}}>
        <Routes>
          <Route path="/" element={<Landing pageName={'Home'}/>}></Route>
          <Route path="/appointments" element={<Dentistries />}></Route>
          {token == 'null' || token == undefined ? <><Route path="/login" element={<Login pageName='Login'/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route></> : <Route path="/signOut" />}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;