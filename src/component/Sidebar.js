import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar bg-primary text-white d-flex flex-column">
            <h4 className="p-3">Teams in Space</h4>
            <ul className="list-unstyled ps-3">
                <li className="mb-3">
                    <i className="fas fa-columns me-2"></i>
                    <Link to="/dashboard" className="text-white text-decoration-none">
                        Board
                    </Link>
                </li>
                <li className="mb-3">
                    <i className="fas fa-list me-2"></i>
                    <Link to="/createproject"  className="text-white text-decoration-none">
                        Create Project
                    </Link>
                </li>
                <li className="mb-3">
                    <i className="fas fa-chart-bar me-2"></i>
                    <Link to="/projects" className="text-white text-decoration-none">
                        Projects
                    </Link>
                </li>
                <li className="mb-3">
                    <i className="fas fa-box-open me-2"></i>
                    <Link to="/releases" className="text-white text-decoration-none">
                        Releases
                    </Link>
                </li>
                <li className="mb-3">
                    <i className="fas fa-cog me-2"></i>
                    <Link to="/settings" className="text-white text-decoration-none">
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
