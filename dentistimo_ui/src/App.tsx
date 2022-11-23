import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Dentistries from "./pages/Dentistries/Dentistries";
import Landing from './pages/Landing/Landing'
import ScrollToTop from './ScrollToTop';
import {SignUp} from "./pages/SignUp"


interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Header/>
      <ScrollToTop/>
      <div style={{marginTop: '120px'}}>
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/appointments" element={<Dentistries/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;