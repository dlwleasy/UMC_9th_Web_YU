import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Mypage from "./pages/Mypage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SignupNickname from "./pages/SignupNickname.jsx";
import SignupPassword from "./pages/SignupPassword.jsx";
import { Routes, Route } from "react-router-dom";
import LPlist from "./pages/LPlist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>홈 페이지</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/password" element={<SignupPassword />} />
        <Route path="/signup/nickname" element={<SignupNickname />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/lp" element={<LPlist></LPlist>}></Route>
      </Routes>
    </>
  );
}

export default App;
