import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import SpotPage from "./components/SpotDetails/SpotPage";
import UserLogin from "./components/Auth/UserLogin";
import UserSignup from "./components/Auth/UserSignup";
import OtpVerification from "./components/Auth/OtpVerification";
import SpotBookingpage from "./components/SpotDetails/BookingContent/SpotBookingpage";
import Explore from "./components/Explore/Explore";
import { UserProvider } from "./Context/UserContext";
import Profile from "./components/Profile/Profile";
import MySpot from "./components/AddMySpot/MySpot";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/spots/:id" element={<SpotPage/>}></Route>
          <Route path="/book" element={<SpotBookingpage/>}></Route>
          <Route path="/explore" element={<Explore/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/addmyspot" element={<MySpot/>}></Route>
        </Route>
        <Route path="/login" element={<UserLogin/>}></Route>
        <Route path="/signup" element={<UserSignup/>}></Route>
        <Route path="/otpauth" element={<OtpVerification/>}></Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
