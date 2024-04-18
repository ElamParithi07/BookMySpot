import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/" element={<Home/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
