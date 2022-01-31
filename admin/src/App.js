import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserList/>} />
        </div>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
