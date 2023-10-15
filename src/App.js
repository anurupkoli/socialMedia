import Home from "./components/pages/home/Home";
import Profile from "./components/pages/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
