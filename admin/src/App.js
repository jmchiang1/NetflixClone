import "./App.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
      </div>
    </div> 
  );
}

export default App;
