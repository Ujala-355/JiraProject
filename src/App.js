// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Login from './component/Login.js';
// // import Dashboard from './component/Dashboard';

// // function App() {
// //     return (
// //         <Router>
// //             <div className="app-container">
// //                 <Routes>
// //                     <Route path="/" element={<Login />} />
// //                     <Route path="/dashboard" element={<Dashboard />} />
// //                 </Routes>
// //             </div>
// //         </Router>
// //     );
// // }

// // export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './component/Login.js';
// import Dashboard from './component/Dashboard';
// import Sidebar from "./component/Sidebar";
// import CreateProject from './component/Project.js';

// function App() {
//     return (
//         <Router>
//             <div className="app-container d-flex">
//                 <Sidebar /> 
//                 <div className="main-content flex-grow-1 p-3">
//                     <Routes>
//                     <Route path="/" element={<Login />} />
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route path="/project" element={<CreateProject />} />
//                         {/* <Route path="/reports" element={<Reports />} />
//                         <Route path="/releases" element={<Releases />} />
//                         <Route path="/settings" element={<Settings />} />
//                         <Route path="*" element={<Dashboard />} />  */}
//                     </Routes>
//                 </div>
//             </div>
//         </Router>
//     );
// }

// export default App;



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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="*" element={<Dashboard />} />
          <Route path='/projects' element={<Projects/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
