import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes";
import "./styles/global.css";

function App() {
  // State to manage the Mobile Sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function for the Hamburger button
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Close function for clicking the overlay or a link
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* 1. Pass the toggle function to the Navbar */}
      <Navbar onMenuClick={toggleSidebar} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* 2. Pass the state and close function to the Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* 3. Main Content Area */}
        <main 
          style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "24px",
            backgroundColor: "#f8fafc", /* Light gray background for contrast */
            position: "relative"
          }}
        >
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;