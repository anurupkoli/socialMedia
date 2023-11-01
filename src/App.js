import Home from "./components/pages/home/Home";
import Profile from "./components/pages/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./Contexts/User/UserState";
import PostState from "./Contexts/Post/PostState";

function App() {
  return (
    <>
      <UserState>
        <PostState>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </PostState>
      </UserState>
    </>
  );
}

export default App;
