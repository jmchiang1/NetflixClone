import "./App.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Home/>
        {/* <div className="others">Other Pages</div> */}
      </div>
    </div>
  );
}

export default App;
