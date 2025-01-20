

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    codeReview: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/tasks/project/1", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          const fetchedTasks = response.data;

          const groupedTasks = {
            todo: fetchedTasks.filter((task) => task.status === "todo"),
            inProgress: fetchedTasks.filter((task) => task.status === "inProgress"),
            codeReview: fetchedTasks.filter((task) => task.status === "codeReview"),
            done: fetchedTasks.filter((task) => task.status === "done"),
          };

          setTasks(groupedTasks);
        } else {
          setError("Unexpected response format from the server.");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError("Failed to fetch tasks. Please try again later.");
        }
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/tasks/1/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Status Update Response:", response.data);

      // Update tasks in the UI after successful status update
      setTasks((prevTasks) => {
        // Find and update the task in the state
        const updatedTasks = { ...prevTasks };
        Object.keys(updatedTasks).forEach((key) => {
          updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
        });

        const updatedTask = response.data; // Assuming the updated task is returned from the API
        if (updatedTasks[updatedTask.status]) {
          updatedTasks[updatedTask.status].push(updatedTask);
        }

        return updatedTasks;
      });
    } catch (err) {
      setError("Failed to update task status. Please try again later.");
      console.error("Error updating task status:", err);
    }
  };

  return (
    <div className="kanban-container">
      <h2 className="mb-4">Task Board</h2>
      {loading && <div>Loading tasks...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {Object.keys(tasks).map((column, index) => (
          <div key={index} className="col-md-3">
            <div className="kanban-column">
              <div className="kanban-header">{column.toUpperCase()}</div>
              <div className="kanban-body">
                {tasks[column].map((task) => (
                  <div key={task.id} className="kanban-card">
                    <div className="kanban-card-title">
                      <strong>{task.title}</strong>
                    </div>
                    <div className="kanban-card-description">
                      {task.description}
                    </div>
                    <div className="kanban-card-status">
                      <span className="badge bg-info">{task.status.toUpperCase()}</span>
                    </div>
                    <div className="kanban-card-actions">
                      <label htmlFor={`status-select-${task.id}`}>Change Status:</label>
                      <select
                        id={`status-select-${task.id}`}
                        className="form-select"
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      >
                        <option value="todo">To Do</option>
                        <option value="inProgress">In Progress</option>
                        <option value="codeReview">Code Review</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
