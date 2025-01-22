import React from "react";
import { Link } from "react-router-dom"; 
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar bg-primary text-white d-flex flex-column">
            <h4 className="p-3">Teams in Space</h4>
            <ul className="list-unstyled ps-3">
            <li className="mb-3">
                    <i className="fas fa-list me-2"></i>
                    <Link to="/projects" className="text-white text-decoration-none">
                        Projects
                    </Link>
                </li>
                <li className="mb-3">
                    <i className="fas fa-list me-2"></i>
                    <Link to="/createproject"  className="text-white text-decoration-none">
                        Create Project
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
