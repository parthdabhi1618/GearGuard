import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./styles/global.css";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default App;
