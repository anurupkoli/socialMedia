import Home from "./components/pages/home/Home";
import Profile from "./components/pages/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./Contexts/User/UserState";
import PostState from "./Contexts/Post/PostState";
import Login from "./components/pages/login/Login";
import SignUp from "./components/pages/signUp/SignUp";
import Messenger from "./components/pages/messenger/Messenger";
import MessengerState from "./Contexts/Messenger/MessengerState";
import Notification from "./components/pages/notification/Notification";

function App() {
  return (
    <>
      <UserState>
        <PostState>
          <MessengerState>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signUp" element={<SignUp />} />
                <Route exact path="/messenger" element={<Messenger />} />
                <Route exact path="/notification" element={<Notification/>} />
              </Routes>
            </BrowserRouter>
          </MessengerState>
        </PostState>
      </UserState>
    </>
  );
}

export default App;
