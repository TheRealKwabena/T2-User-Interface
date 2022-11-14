import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./pages/Login";


interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;