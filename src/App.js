import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar";
import CreateProject from "./component/CreateProject";
import Projects from "./component/Projects";
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation(); // Get the current path

  const isLoginPage = location.pathname === "/"; // Check if the current route is the Login page

  return (
    <div className="app-container d-flex">
      {!isLoginPage && <Sidebar />} 
      {/* Show Sidebar only if not on Login page */}
      <div className="main-content flex-grow-1 p-3">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/tasks/:projectId" element={<Dashboard />} />
          <Route path='/projects' element={<Projects/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
