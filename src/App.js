import Home from "./components/pages/home/Home";
import Profile from "./components/pages/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./Contexts/User/UserState";

function App() {
  return (
    <>
      <UserState>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </UserState>
    </>
  );
}

export default App;
