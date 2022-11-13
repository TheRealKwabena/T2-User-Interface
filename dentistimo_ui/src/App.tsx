import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;