import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Appointments from "./pages/Appointments/Appointments";
import Landing from './pages/Landing'

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/appointments" element={<Appointments/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;