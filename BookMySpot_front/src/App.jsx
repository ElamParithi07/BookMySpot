import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SpotPage from "./components/SpotDetails/SpotPage";
import UserLogin from "./components/Auth/UserLogin";
import UserSignup from "./components/Auth/UserSignup";
import OtpVerification from "./components/Auth/OtpVerification";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/spots/:id" element={<SpotPage/>}></Route>
        </Route>
        <Route path="/login" element={<UserLogin/>}></Route>
        <Route path="/signup" element={<UserSignup/>}></Route>
        <Route path="/otpauth" element={<OtpVerification/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
