import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    codeReview: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low", // Default priority
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/tasks/project/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
        setError("Failed to fetch tasks. Please try again later.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };

        Object.keys(updatedTasks).forEach((key) => {
          updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
        });

        const updatedTask = response.data;
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

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/tasks`,
        {
          title: newTask.title,
          priority: newTask.priority,
          status: "todo",
          projectId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, response.data],
      }));

      setNewTask({ title: "", priority: "Low" });
    } catch (err) {
      setError("Failed to create task. Please try again later.");
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="kanban-container">
      <h2 className="mb-4">Task Board for Project</h2>
      {loading && <div>Loading tasks...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="task-creation-form">
        <h4>Create a New Task</h4>
        <form onSubmit={createTask}>
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="taskTitle"
              className="form-control"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskPriority" className="form-label">
              Priority
            </label>
            <select
              id="taskPriority"
              className="form-select"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </form>
      </div>

      <div className="row">
        {Object.keys(tasks).map((column, index) => (
          <div key={index} className="col-md-3">
            <div className="kanban-column">
              <div className="kanban-header">
                {column === "todo"
                  ? "To Do"
                  : column === "inProgress"
                  ? "In Progress"
                  : column === "codeReview"
                  ? "Code Review"
                  : "Done"}
              </div>
              <div className="kanban-body">
                {tasks[column].map((task) => (
                  <div key={task.id} className="kanban-card">
                    <div className="kanban-card-title">{task.title}</div>
                    <div className="kanban-card-description">
                      {task.description}
                    </div>
                    <div className="kanban-card-description">
                      <strong>Priority:</strong> {task.priority}
                    </div>
                    <div className="kanban-card-status">
                      <span className="badge bg-info">
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="kanban-card-actions">
                      <label htmlFor={`status-select-${task.id}`}>
                        Change Status:
                      </label>
                      <select
                        id={`status-select-${task.id}`}
                        className="form-select"
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(task.id, e.target.value)
                        }
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
