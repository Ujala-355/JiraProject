import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar bg-primary text-white d-flex flex-column">
            <h4 className="p-3">Teams in Space</h4>
            <ul className="list-unstyled ps-3">
                <li className="mb-3">
                    <i className="fas fa-columns me-2"></i> Board
                </li>
                <li className="mb-3">
                    <i className="fas fa-list me-2"></i> Backlog
                </li>
                <li className="mb-3">
                    <i className="fas fa-chart-bar me-2"></i> Reports
                </li>
                <li className="mb-3">
                    <i className="fas fa-box-open me-2"></i> Releases
                </li>
                <li className="mb-3">
                    <i className="fas fa-cog me-2"></i> Settings
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
