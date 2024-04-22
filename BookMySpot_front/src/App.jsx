import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SpotPage from "./components/SpotDetails/SpotPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/spots/:id" element={<SpotPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
