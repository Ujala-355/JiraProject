import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState({
        todo: [
            { id: "1", title: "Engage Jupiter Express for travel", tag: "Space Travel Partners" },
            { id: "2", title: "Create 90-day plans for Mars Office", tag: "Local Mars Office" },
            { id: "2", title: "Create 90-day plans for Mars Office", tag: "Local Mars Office" },

        ],
        inProgress: [
            { id: "3", title: "Fix flight booking issue", tag: "Seespace Plus" },
            { id: "3", title: "Fix flight booking issue", tag: "Seespace Plus" },
            { id: "3", title: "Fix flight booking issue", tag: "Seespace Plus" },

        ],
        codeReview: [
            { id: "4", title: "Register with Mars Revenue", tag: "Local Mars Office" },
            { id: "4", title: "Register with Mars Revenue", tag: "Local Mars Office" },
            { id: "4", title: "Register with Mars Revenue", tag: "Local Mars Office" },

        ],
        done: [
            { id: "5", title: "Complete JetShuttle SpaceWays review", tag: "Space Travel Partners" },
            { id: "5", title: "Complete JetShuttle SpaceWays review", tag: "Space Travel Partners" },
            { id: "5", title: "Complete JetShuttle SpaceWays review", tag: "Space Travel Partners" },

        ],
    });

    return (
        <div>
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
            <div className="kanban-container">
                <h2  className="mb-4">Board</h2>
                <div className="row">
                    {Object.keys(tasks).map((column, index) => (
                        <div key={index} className="col-md-3">
                            <div className="kanban-column">
                                <div className="kanban-header">
                                    {column.toUpperCase()}
                                </div>
                                <div className="kanban-body">
                                    {tasks[column].map((task) => (
                                        <div key={task.id} className="kanban-card">
                                            <div className="kanban-card-title">{task.title}</div>
                                            <span className="badge bg-secondary">{task.tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        // </div >
    );
}

export default Dashboard;
