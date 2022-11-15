import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments/Appointments";
import {SignUp} from "./pages/SignUp"


interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/appointments" element={<Appointments/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;